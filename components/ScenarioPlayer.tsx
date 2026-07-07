'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { Scenario } from '@/data/scenarios'
import type { RubricBreakdown } from '@/lib/scoring'
import { getMockAssessment } from '@/lib/mockResponses'
import DoctorPatientScene from './DoctorPatientScene'
import ChatPanel from './ChatPanel'
import PhysicalExamPanel from './PhysicalExamPanel'
import TestsPanel from './TestsPanel'
import DiagnosisPanel from './DiagnosisPanel'
import SummaryPanel from './SummaryPanel'
import CaseInfoPanel from './CaseInfoPanel'
import CaseVocabPanel from './CaseVocabPanel'
import ClinicalDataPanel from './ClinicalDataPanel'
import MedacademyCaseHeader from './MedacademyCaseHeader'
import MedacademyInterviewPanel from './MedacademyInterviewPanel'
import SectionNav, {
  ClinicalSection,
  clinicalSectionToStep,
  getMedacademyNextSection,
  getSectionStepCount,
  type SectionCompletion,
} from './SectionNav'
import HistoryHelperPanel from './HistoryHelperPanel'
import { getScenarioSectionGuidanceLine } from './ux/ScenarioSectionHeader'
import NextStepGuidance from './ux/NextStepGuidance'
import LeaveExamConfirmDialog from './LeaveExamConfirmDialog'
import InstructionModal from './InstructionModal'
import HelpButton from './HelpButton'
import { useInstructionModal } from '@/hooks/useInstructionModal'
import { INSTRUCTION_COPY, type InstructionPageKey } from '@/lib/instructionCopy'
import { isMedacademyCase, shouldShowVocabTab } from '@/lib/scenarioVocab'
import { isGuestAccessible } from '@/lib/caseAccess'
import { recordGuestScenarioCompletion } from '@/lib/guestScenarioProgress'
import type { ClinicalFeedbackReport, ClinicalRubric200 } from '@/types/debrief'

type Message = {
  role: 'doctor' | 'patient'
  content: string
}

type AssessmentResult = {
  overallRating: string
  summary: string
  strengths: string[]
  areasForImprovement: string[]
  diagnosisFeedback: string
  missedKeyHistoryPoints: string[]
  testSelectionFeedback: string
  sectionRatings?: {
    history?: string
    exam?: string
    tests?: string
    diagnosis?: string
    communication?: string
  }
  totalScore?: number
  totalScorePercentage?: number
  maxScore?: number
  scoreBreakdown?: {
    history?: number
    exam?: number
    tests?: number
    diagnosis?: number
    communication?: number
  }
  debriefStructured?: {
    summary: string
    strengths: string[]
    missedOpportunities: string[]
    correctApproach?: string[]
    improvementTip?: string
    diagnosticReasoning: string[]
    nextStepAdvice: string[]
    clinicalPearls: string[]
    vocabToReview: string[]
  }
  rubric200?: ClinicalRubric200
  clinicalFeedback?: ClinicalFeedbackReport
  source?: string
}

type Props = {
  scenario: Scenario
}

type ScenarioScoreState = {
  score: number
  level: string
  feedback: string
  rubric: RubricBreakdown
}

type OrderedTestData = {
  testId: string
  result: string
}

type DifferentialItem = {
  dxId: string
  rank: number
  confidence: 'High' | 'Medium' | 'Low'
  note?: string
}

type PersistedState = {
  viewedExamSections: string[]
  viewedClinicalDataSections?: string[]
  orderedTests: [string, OrderedTestData][]
  differential: DifferentialItem[]
  finalDiagnosisId: string | null
  activeSection: ClinicalSection
  /** 1–5, highest step the learner may open (linear unlock). */
  maxUnlockedStep?: number
}

function inferMaxUnlockedStepFromLegacy(state: {
  activeSection?: ClinicalSection
  viewedExamSections?: string[]
  orderedTests?: [string, OrderedTestData][]
  finalDiagnosisId?: string | null
}): number {
  const active = state.activeSection ?? 'history'
  let m = clinicalSectionToStep(active)
  const viewed = state.viewedExamSections?.length ?? 0
  const tests = state.orderedTests?.length ?? 0
  if (viewed > 0) m = Math.max(m, 2)
  if (tests > 0) m = Math.max(m, 3)
  if (viewed > 0 && tests > 0) m = Math.max(m, 4)
  if (state.finalDiagnosisId != null || active === 'debrief') m = Math.max(m, 6)
  return Math.min(6, Math.max(1, m))
}

function sectionToInstructionPageKey(
  section: ClinicalSection,
  isMedacademyLayout: boolean
): InstructionPageKey | null {
  switch (section) {
    case 'case-info':
      return 'case-info'
    case 'history':
      return isMedacademyLayout ? 'medacademy-interview' : 'chat'
    case 'exam':
      return 'exam'
    case 'tests':
      return 'tests'
    case 'clinical-data':
      return 'clinical-data'
    case 'vocab':
      return 'vocab'
    case 'diagnosis':
      return 'diagnosis'
    case 'debrief':
      return 'debrief'
    default:
      return null
  }
}

export default function ScenarioPlayer({ scenario }: Props) {
  const isMedacademyLayout = isMedacademyCase(scenario)
  const vocabTabEnabled = shouldShowVocabTab(scenario)
  const sectionNavOpts = { sectionLayout: scenario.sectionLayout, showVocabTab: vocabTabEnabled }
  const sectionStepCount = getSectionStepCount(sectionNavOpts)
  const { data: session, status: sessionStatus } = useSession()
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [scenarioScore, setScenarioScore] = useState<ScenarioScoreState | null>(null)
  const [activeSection, setActiveSection] = useState<ClinicalSection>(
    isMedacademyLayout ? 'case-info' : 'history'
  )
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(4)
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [viewedExamSections, setViewedExamSections] = useState<string[]>([])
  const [viewedClinicalDataSections, setViewedClinicalDataSections] = useState<string[]>([])
  const [orderedTests, setOrderedTests] = useState<Map<string, OrderedTestData>>(new Map())
  const [differential, setDifferential] = useState<DifferentialItem[]>([])
  const [finalDiagnosisId, setFinalDiagnosisId] = useState<string | null>(null)
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null)
  const [isLoadingAssessment, setIsLoadingAssessment] = useState(false)
  const [clickedTerms, setClickedTerms] = useState<string[]>([])
  const [savedTerms, setSavedTerms] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [mobileTab, setMobileTab] = useState<'helper' | 'chat'>('chat')
  const [hasConfirmedExamLeave, setHasConfirmedExamLeave] = useState(false)
  const [showExamLeaveDialog, setShowExamLeaveDialog] = useState(false)
  const [pendingSection, setPendingSection] = useState<ClinicalSection | null>(null)
  const [clinicalDataScrollTarget, setClinicalDataScrollTarget] = useState<string | null>(null)

  // Match media avoids resize/scrollbar thrash flipping layout at ~768px (flash between tabs).
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Start or resume tracked attempt (signed-in users)
  useEffect(() => {
    if (sessionStatus !== 'authenticated' || !session?.user?.id) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/scenario/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scenarioId: scenario.id }),
        })
        if (!res.ok || cancelled) return
        const data = (await res.json()) as {
          attemptId: string
          resume: boolean
          messages: Message[] | null
          state: PersistedState | null
        }
        if (cancelled) return
        setAttemptId(data.attemptId)
        if (data.resume && data.messages && data.messages.length > 0) {
          setChatMessages(data.messages)
          if (data.state && typeof data.state === 'object') {
            const st = data.state
            if (Array.isArray(st.viewedExamSections)) setViewedExamSections(st.viewedExamSections)
            if (Array.isArray(st.viewedClinicalDataSections))
              setViewedClinicalDataSections(st.viewedClinicalDataSections)
            if (Array.isArray(st.orderedTests)) setOrderedTests(new Map(st.orderedTests))
            if (Array.isArray(st.differential)) setDifferential(st.differential)
            if (st.finalDiagnosisId !== undefined) setFinalDiagnosisId(st.finalDiagnosisId)
            if (st.activeSection) setActiveSection(st.activeSection)
            if (
              typeof st.maxUnlockedStep === 'number' &&
              st.maxUnlockedStep >= 1 &&
              st.maxUnlockedStep <= sectionStepCount
            ) {
              setMaxUnlockedStep(Math.max(st.maxUnlockedStep, isMedacademyLayout ? sectionStepCount : 4))
            } else {
              setMaxUnlockedStep(Math.max(inferMaxUnlockedStepFromLegacy(st), 4))
            }
          }
        }
      } catch (e) {
        console.error('scenario start', e)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [sessionStatus, session?.user?.id, scenario.id])

  const canAccessDebrief = finalDiagnosisId !== null

  useEffect(() => {
    if (canAccessDebrief) {
      setMaxUnlockedStep(sectionStepCount)
    }
  }, [canAccessDebrief])

  // Persist messages + UI state for resume
  useEffect(() => {
    if (sessionStatus !== 'authenticated' || !attemptId) return
    const t = setTimeout(() => {
      const state: PersistedState = {
        viewedExamSections,
        viewedClinicalDataSections,
        orderedTests: Array.from(orderedTests.entries()),
        differential,
        finalDiagnosisId,
        activeSection,
        maxUnlockedStep,
      }
      void fetch('/api/scenario/attempt', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId,
          scenarioId: scenario.id,
          messages: chatMessages,
          state,
        }),
      })
    }, 1500)
    return () => clearTimeout(t)
  }, [
    chatMessages,
    viewedExamSections,
    viewedClinicalDataSections,
    orderedTests,
    differential,
    finalDiagnosisId,
    activeSection,
    maxUnlockedStep,
    attemptId,
    scenario.id,
    sessionStatus,
  ])


  const handleChatUpdate = useCallback((messages: Message[]) => {
    setChatMessages(messages)
  }, [])

  const handleTermClick = (term: string) => {
    if (!clickedTerms.includes(term)) {
      setClickedTerms([...clickedTerms, term])
    }
  }

  const handleTermSave = (term: string) => {
    if (!savedTerms.includes(term)) {
      setSavedTerms([...savedTerms, term])
    }
  }

  const handleInsertQuestion = (question: string) => {
    const event = new CustomEvent('send-preset-question', { detail: { question } })
    window.dispatchEvent(event)
  }

  const handleExamSectionsViewed = (sectionIds: string[]) => {
    setViewedExamSections(sectionIds)
  }

  const handleClinicalDataSectionViewed = useCallback((sectionId: string) => {
    setViewedClinicalDataSections((prev) =>
      prev.includes(sectionId) ? prev : [...prev, sectionId]
    )
  }, [])

  const handleTestsOrdered = (tests: Map<string, OrderedTestData>) => {
    setOrderedTests(tests)
  }

  const handleDifferentialUpdate = (differential: DifferentialItem[]) => {
    setDifferential(differential)
  }

  const handleFinalDxUpdate = (finalDxId: string | null) => {
    setFinalDiagnosisId(finalDxId)
  }

  const handleDiagnosisSubmit = async (data: {
    differentialDetailed: Array<{ dxId: string; rank: number; confidence: string; note?: string }>
    finalDxId: string | null
    missingMustNotMiss: string[]
  }) => {
    // State is already updated via onDifferentialUpdate and onFinalDxUpdate
    setIsLoadingAssessment(true)
    setMaxUnlockedStep((m) => Math.max(m, sectionStepCount))
    setActiveSection('debrief')

    const completeScoring = async (aid: string | null) => {
      if (sessionStatus !== 'authenticated' || !aid) return
      try {
        const cr = await fetch('/api/scenario/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scenarioId: scenario.id,
            attemptId: aid,
            messages: chatMessages,
            finalDxId: finalDiagnosisId,
            viewedExamSections,
            orderedTests: Array.from(orderedTests.keys()),
            differential,
          }),
        })
        if (cr.ok) {
          const scoreJson = (await cr.json()) as {
            error?: string
            score: number
            level: string
            feedback: string
            rubric: RubricBreakdown
          }
          if (!scoreJson.error) {
            setScenarioScore({
              score: scoreJson.score,
              level: scoreJson.level,
              feedback: scoreJson.feedback,
              rubric: scoreJson.rubric,
            })
          }
        }
      } catch (e) {
        console.error('scenario complete scoring', e)
      }
    }

    let effectiveAttemptId = attemptId
    if (sessionStatus === 'authenticated' && !effectiveAttemptId) {
      try {
        const sr = await fetch('/api/scenario/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scenarioId: scenario.id }),
        })
        if (sr.ok) {
          const d = (await sr.json()) as { attemptId: string }
          effectiveAttemptId = d.attemptId
          setAttemptId(d.attemptId)
        }
      } catch (e) {
        console.error('scenario start before complete', e)
      }
    }

    const applyAssessment = (next: AssessmentResult) => {
      setAssessment(next)
      if (
        sessionStatus !== 'authenticated' &&
        isGuestAccessible(scenario.id) &&
        typeof next.totalScore === 'number' &&
        Number.isFinite(next.totalScore)
      ) {
        recordGuestScenarioCompletion(scenario.id, Math.round(next.totalScore))
      }
    }

    try {
      const response = await fetch('/api/assess', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: scenario.id,
          chat: chatMessages,
          viewedExamSections,
          orderedTests: Array.from(orderedTests.keys()),
          viewedClinicalDataSections,
          differentialDetailed: differential,
          finalDxId: finalDiagnosisId,
          missingMustNotMiss: data.missingMustNotMiss,
          // Legacy fields for backward compatibility
          selectedDifferentialIds: differential.map(d => d.dxId),
          finalDiagnosisId: finalDiagnosisId,
        }),
      })

      if (!response.ok) {
        applyAssessment(getMockAssessment() as AssessmentResult)
        await completeScoring(effectiveAttemptId)
        return
      }

      const result = await response.json()
      
      // Check if result has error
      if (result.error) {
        throw new Error(result.error)
      }
      
      applyAssessment(result)
      await completeScoring(effectiveAttemptId)
    } catch (error: any) {
      console.error('Error:', error)
      const errorMessage = error?.message || 'Unknown error occurred'
      const isNetworkError = errorMessage.includes('Failed to fetch') || errorMessage.includes('Load failed')
      if (isNetworkError) {
        applyAssessment(getMockAssessment() as AssessmentResult)
        await completeScoring(effectiveAttemptId)
        return
      }

      setAssessment({
        overallRating: 'Error',
        summary:
          'Assessment failed to load. For local dev: run Ollama or set DEMO_MODE=true.',
        strengths: [],
        areasForImprovement: [errorMessage],
        diagnosisFeedback: '',
        missedKeyHistoryPoints: [],
        testSelectionFeedback: '',
      })
      await completeScoring(effectiveAttemptId)
    } finally {
      setIsLoadingAssessment(false)
    }
  }

  const scrollToChat = () => {
    const chatElement = document.getElementById('chat-panel')
    chatElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const doctorTurns = chatMessages.filter((m) => m.role === 'doctor').length

  const sectionCompletion = useMemo<SectionCompletion>(
    () => ({
      'case-info': isMedacademyLayout,
      history: doctorTurns >= 1,
      exam: viewedExamSections.length > 0,
      tests: orderedTests.size > 0,
      'clinical-data': viewedClinicalDataSections.length >= 3,
      diagnosis: finalDiagnosisId !== null,
      vocab: vocabTabEnabled,
      debrief: assessment !== null,
    }),
    [
      doctorTurns,
      viewedExamSections.length,
      viewedClinicalDataSections.length,
      orderedTests.size,
      finalDiagnosisId,
      assessment,
      isMedacademyLayout,
      vocabTabEnabled,
    ]
  )

  const medacademyNextSection = useCallback(
    (current: ClinicalSection) =>
      getMedacademyNextSection(current, { showVocabTab: vocabTabEnabled }),
    [vocabTabEnabled]
  )

  const navigateToSection = useCallback((section: ClinicalSection) => {
    if (section === 'debrief' && !canAccessDebrief) return
    setActiveSection(section)
  }, [canAccessDebrief])

  const handleViewFigureInClinicalData = useCallback(() => {
    setClinicalDataScrollTarget('imaging')
    if (activeSection === 'clinical-data') {
      handleClinicalDataSectionViewed('imaging')
      window.setTimeout(() => {
        document.getElementById('imaging')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
      return
    }
    navigateToSection('clinical-data')
  }, [activeSection, handleClinicalDataSectionViewed, navigateToSection])

  const handleSectionChange = useCallback(
    (section: ClinicalSection) => {
      if (section === activeSection) return
      if (section === 'debrief' && !canAccessDebrief) return

      if (activeSection === 'exam' && section !== 'exam' && !hasConfirmedExamLeave && !isMedacademyLayout) {
        setPendingSection(section)
        setShowExamLeaveDialog(true)
        return
      }

      navigateToSection(section)
    },
    [activeSection, canAccessDebrief, hasConfirmedExamLeave, navigateToSection, isMedacademyLayout]
  )

  const handleExamLeaveContinue = () => {
    setHasConfirmedExamLeave(true)
    setShowExamLeaveDialog(false)
    if (pendingSection) {
      navigateToSection(pendingSection)
      setPendingSection(null)
    }
  }

  const handleExamLeaveStay = () => {
    setShowExamLeaveDialog(false)
    setPendingSection(null)
  }

  const instructionPageKey = sectionToInstructionPageKey(activeSection, isMedacademyLayout)
  const instructionModal = useInstructionModal(instructionPageKey)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!(isMedacademyLayout && activeSection === 'case-info') ? (
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-[#94a3b8] mb-2">
            Active case
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-3">{scenario.title}</h1>
          <p className="text-base text-slate-600 dark:text-[#CBD5E1] leading-relaxed line-clamp-3">
            {isMedacademyLayout ? scenario.cardTeaser : scenario.description}
          </p>
          {scenario.attributionNote && scenario.showAttribution !== false ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 italic">{scenario.attributionNote}</p>
          ) : null}
          {scenario.cardCategory ? (
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">{scenario.cardCategory}</p>
          ) : null}
        </div>
      ) : null}

      {!scenario.hideVitals && scenario.patientPersona.vitals ? (
      <div className="case-vitals-banner">
        <h3>Vital Signs</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
          <div>
            <span className="vitals-label">HR:</span>{' '}
            <span className="vitals-value">{scenario.patientPersona.vitals.heartRate} bpm</span>
          </div>
          <div>
            <span className="vitals-label">BP:</span>{' '}
            <span className="vitals-value">{scenario.patientPersona.vitals.bloodPressure}</span>
          </div>
          <div>
            <span className="vitals-label">RR:</span>{' '}
            <span className="vitals-value">{scenario.patientPersona.vitals.respiratoryRate} /min</span>
          </div>
          <div>
            <span className="vitals-label">SpO₂:</span>{' '}
            <span className="vitals-value">{scenario.patientPersona.vitals.oxygenSat}</span>
          </div>
          <div>
            <span className="vitals-label">T:</span>{' '}
            <span className="vitals-value">{scenario.patientPersona.vitals.temperature}</span>
          </div>
        </div>
      </div>
      ) : null}

      {(scenario.patientPersona.medicationList?.length ||
        scenario.patientPersona.baselineFunctionalStatus ||
        scenario.patientPersona.cognitiveBaseline) && (
        <div className="mb-6 bg-slate-50 dark:bg-[#071A33] border border-slate-200 dark:border-[#14345C] rounded-lg p-4 text-sm text-slate-800 dark:text-[#CBD5E1]">
          <h3 className="font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2">Patient context</h3>
          <ul className="space-y-2 list-none">
            {scenario.patientPersona.medicationList &&
              scenario.patientPersona.medicationList.length > 0 && (
                <li>
                  <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">Medications: </span>
                  {scenario.patientPersona.medicationList.join('; ')}
                </li>
              )}
            {scenario.patientPersona.baselineFunctionalStatus && (
              <li>
                <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">Baseline function: </span>
                {scenario.patientPersona.baselineFunctionalStatus}
              </li>
            )}
            {scenario.patientPersona.cognitiveBaseline && (
              <li>
                <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">Cognitive baseline: </span>
                {scenario.patientPersona.cognitiveBaseline}
              </li>
            )}
          </ul>
        </div>
      )}

      {activeSection === 'history' && !isMedacademyLayout ? (
        <DoctorPatientScene patientName={scenario.patientPersona.name} onPatientClick={scrollToChat} />
      ) : null}

      {isMedacademyLayout && activeSection === 'case-info' ? (
        <MedacademyCaseHeader
          title={scenario.title}
          subtitle={scenario.cardCategory}
          difficulty={scenario.difficulty}
        />
      ) : null}

      {/* Section Navigation */}
      <SectionNav
        active={activeSection}
        onChange={handleSectionChange}
        canAccessDebrief={canAccessDebrief}
        sectionCompletion={sectionCompletion}
        sectionLayout={scenario.sectionLayout}
        showVocabTab={vocabTabEnabled}
        unlockAllTabs={isMedacademyLayout}
      />

      <LeaveExamConfirmDialog
        open={showExamLeaveDialog}
        onContinue={handleExamLeaveContinue}
        onStay={handleExamLeaveStay}
      />

      {/* Render only the active section */}
      {activeSection === 'case-info' && scenario.caseInfoContent ? (
        <CaseInfoPanel
          content={scenario.caseInfoContent}
          title={scenario.title}
          subtitle={scenario.cardCategory}
          difficulty={scenario.difficulty}
          vocab={scenario.caseVocab ?? []}
          showVocabButton={vocabTabEnabled}
          hideHeader
          onStartInterview={() => handleSectionChange('history')}
          onReviewClinicalData={() => handleSectionChange('clinical-data')}
          onViewFigure={handleViewFigureInClinicalData}
          onReviewVocab={vocabTabEnabled ? () => handleSectionChange('vocab') : undefined}
        />
      ) : null}

      {activeSection === 'history' && (
        <>
          {isMedacademyLayout ? (
            <MedacademyInterviewPanel
              scenario={scenario}
              messages={chatMessages}
              onChatUpdate={handleChatUpdate}
              onTermClick={handleTermClick}
              onTermSave={handleTermSave}
            />
          ) : isMobile ? (
            <div className="mb-6">
              {/* Tab Buttons */}
              <div className="flex border-b border-gray-200 dark:border-[#14345C] mb-4">
                <button
                  onClick={() => setMobileTab('helper')}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition ${
                    mobileTab === 'helper'
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'text-gray-600 dark:text-[#CBD5E1] hover:text-gray-900 dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  Quick prompts
                </button>
                <button
                  onClick={() => setMobileTab('chat')}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition ${
                    mobileTab === 'chat'
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'text-gray-600 dark:text-[#CBD5E1] hover:text-gray-900 dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  Chat
                </button>
              </div>

              {/* Tab Content */}
              {mobileTab === 'helper' ? (
                <div className="min-h-[400px]">
                  <HistoryHelperPanel
                    onInsertQuestion={handleInsertQuestion}
                    messages={chatMessages}
                  />
                </div>
              ) : (
                <div id="chat-panel">
                  <ChatPanel
                    scenario={scenario}
                    messages={chatMessages}
                    doctorMessageCount={doctorTurns}
                    onChatUpdate={handleChatUpdate}
                    onTermClick={handleTermClick}
                    onTermSave={handleTermSave}
                  />
                </div>
              )}
            </div>
          ) : (
            /* Desktop: Split View */
            <div className="mb-6" style={{ height: '600px' }}>
              <div className="h-full flex gap-4">
                {/* Left Panel: Helper */}
                <div className="w-2/5 bg-gray-50 dark:bg-[#071A33] dark:border dark:border-[#14345C] rounded-lg overflow-hidden p-4">
                  <HistoryHelperPanel
                    onInsertQuestion={handleInsertQuestion}
                    messages={chatMessages}
                  />
                </div>

                {/* Right Panel: Chat */}
                <div className="flex-1 bg-white dark:bg-[#071A33] dark:border dark:border-[#14345C] rounded-lg overflow-hidden p-4 flex flex-col">
                  <div id="chat-panel" className="flex-1 min-h-0">
                    <ChatPanel
                      scenario={scenario}
                      messages={chatMessages}
                      doctorMessageCount={doctorTurns}
                      onChatUpdate={handleChatUpdate}
                      onTermClick={handleTermClick}
                      onTermSave={handleTermSave}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 mx-auto flex w-full max-w-xl justify-center px-2">
            <NextStepGuidance
              compact
              showHeading={false}
              centered
              action={
                <button
                  type="button"
                  onClick={() => {
                    const next = isMedacademyLayout
                      ? medacademyNextSection('history')
                      : 'exam'
                    if (next) handleSectionChange(next)
                  }}
                  className="btn-press w-full medcess-btn-primary text-center text-sm !py-3"
                >
                  Next step
                </button>
              }
            >
              {getScenarioSectionGuidanceLine('history')}
            </NextStepGuidance>
          </div>
        </>
      )}

      {activeSection === 'vocab' && vocabTabEnabled && scenario.caseVocab ? (
        <>
          <CaseVocabPanel terms={scenario.caseVocab} caseTitle={scenario.title} />
          {isMedacademyLayout ? (
            <div className="mt-10 mx-auto flex w-full max-w-xl justify-center px-2">
              <NextStepGuidance
                compact
                showHeading={false}
                centered
                action={
                  <button
                    type="button"
                    onClick={() => {
                      const next = medacademyNextSection('vocab')
                      if (next) handleSectionChange(next)
                    }}
                    className="btn-press w-full medcess-btn-primary text-center text-sm !py-3"
                  >
                    Next step
                  </button>
                }
              >
                {getScenarioSectionGuidanceLine('vocab')}
              </NextStepGuidance>
            </div>
          ) : null}
        </>
      ) : null}

      {activeSection === 'exam' && !isMedacademyLayout && (
        <>
          <PhysicalExamPanel
            sections={scenario.physicalExam}
            mentalStatusExam={scenario.mentalStatusExam}
            scenarioId={scenario.id}
            viewedSections={viewedExamSections}
            onSectionsViewed={handleExamSectionsViewed}
            onTermClick={handleTermClick}
            onTermSave={handleTermSave}
          />
          <div className="mt-10 mx-auto flex w-full max-w-xl justify-center px-2">
            <NextStepGuidance
              compact
              showHeading={false}
              centered
              action={
                <button
                  type="button"
                  onClick={() => handleSectionChange('tests')}
                  className="btn-press w-full medcess-btn-primary text-center text-sm !py-3"
                >
                  Next step
                </button>
              }
            >
              {getScenarioSectionGuidanceLine('exam')}
            </NextStepGuidance>
          </div>
        </>
      )}

      {activeSection === 'clinical-data' && isMedacademyLayout && scenario.caseInfoContent ? (
        <>
          <ClinicalDataPanel
            content={scenario.caseInfoContent}
            vocab={scenario.caseVocab ?? []}
            caseTitle={scenario.title}
            viewedSections={viewedClinicalDataSections}
            onSectionViewed={handleClinicalDataSectionViewed}
            scrollToSection={clinicalDataScrollTarget}
            onScrollComplete={() => setClinicalDataScrollTarget(null)}
          />
          <div className="mt-10 mx-auto flex w-full max-w-xl justify-center px-2">
            <NextStepGuidance
              compact
              showHeading={false}
              centered
              action={
                <button
                  type="button"
                  onClick={() => {
                    const next = medacademyNextSection('clinical-data')
                    if (next) handleSectionChange(next)
                  }}
                  className="btn-press w-full rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
                >
                  Next step
                </button>
              }
            >
              {getScenarioSectionGuidanceLine('clinical-data')}
            </NextStepGuidance>
          </div>
        </>
      ) : null}

      {activeSection === 'tests' && !isMedacademyLayout && (
        <>
          <TestsPanel
            scenario={scenario}
            orderedTests={orderedTests}
            onTestsOrdered={handleTestsOrdered}
            onTermClick={handleTermClick}
            onTermSave={handleTermSave}
          />
          <div className="mt-10 mx-auto flex w-full max-w-xl justify-center px-2">
            <NextStepGuidance
              compact
              showHeading={false}
              centered
              action={
                <button
                  type="button"
                  onClick={() => handleSectionChange('diagnosis')}
                  className="btn-press w-full rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
                >
                  Next step
                </button>
              }
            >
              {getScenarioSectionGuidanceLine('tests')}
            </NextStepGuidance>
          </div>
        </>
      )}

      {activeSection === 'diagnosis' && (
        <>
          <DiagnosisPanel
            scenario={scenario}
            differential={differential}
            finalDxId={finalDiagnosisId}
            onDifferentialUpdate={handleDifferentialUpdate}
            onFinalDxUpdate={handleFinalDxUpdate}
            onSubmit={handleDiagnosisSubmit}
            onTermClick={handleTermClick}
            onTermSave={handleTermSave}
            doctorMessageCount={doctorTurns}
            orderedTestCount={orderedTests.size}
            clinicalDataSectionsReviewed={viewedClinicalDataSections.length}
            isMedacademyCase={isMedacademyLayout}
          />
        </>
      )}

      {activeSection === 'debrief' && (
        <>
          {isLoadingAssessment ? (
            <div className="case-panel p-12 text-center">
              <p className="text-gray-600 dark:text-[#CBD5E1] animate-pulse-soft">Medcess is building your report — scoring feedback and teaching points…</p>
            </div>
          ) : assessment ? (
            <SummaryPanel 
              scenario={scenario} 
              assessment={assessment}
              clickedTerms={clickedTerms}
              savedTerms={savedTerms}
              onTermClick={handleTermClick}
              onTermSave={handleTermSave}
              scenarioScore={scenarioScore ?? undefined}
            />
          ) : (
            <div className="case-panel p-12 text-center">
              <p className="text-gray-600 dark:text-[#CBD5E1]">No assessment yet.</p>
            </div>
          )}
        </>
      )}

      {instructionPageKey && (
        <>
          <InstructionModal
            open={instructionModal.open}
            title={INSTRUCTION_COPY[instructionPageKey].title}
            description={INSTRUCTION_COPY[instructionPageKey].lines}
            dontShowAgain={instructionModal.dontShowAgain}
            onDontShowAgainChange={instructionModal.setDontShowAgain}
            onGotIt={instructionModal.handleGotIt}
            onBackdropClose={() => instructionModal.handleGotIt(false)}
          />
          <HelpButton onClick={instructionModal.openHelp} />
        </>
      )}
    </div>
  )
}
