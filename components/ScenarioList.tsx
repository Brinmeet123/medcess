'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Scenario, ScenarioDifficulty } from '@/data/scenarios'
import { SPECIALTY_FILTER_ALL, type SpecialtyFilterValue } from '@/data/specialties'
import { orderWithFreeCasesFirst } from '@/lib/caseAccess'
import {
  readGuestScenarioProgress,
  guestProgressToScenarioMap,
} from '@/lib/guestScenarioProgress'
import ScenarioCard from './ScenarioCard'
import SpecialtyFilter from './SpecialtyFilter'
import SimulatorHelpButton from './simulator/SimulatorHelpButton'
import { APP_NAME } from '@/lib/branding'

export type ScenarioProgressInfo = {
  status: string
  bestScore: number | null
  lastAttemptScore: number | null
}

type Props = {
  scenarios: Scenario[]
  progressByScenario?: Record<string, ScenarioProgressInfo>
}

function matchesSearch(scenario: Scenario, q: string): boolean {
  if (!q.trim()) return true
  const n = q.trim().toLowerCase()
  return (
    scenario.title.toLowerCase().includes(n) ||
    scenario.description.toLowerCase().includes(n) ||
    scenario.specialty.toLowerCase().includes(n) ||
    (scenario.cardTeaser?.toLowerCase().includes(n) ?? false)
  )
}

export default function ScenarioList({ scenarios, progressByScenario = {} }: Props) {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const sessionReady = status !== 'loading'

  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyFilterValue>(SPECIALTY_FILTER_ALL)
  const [selectedDifficulty, setSelectedDifficulty] = useState<ScenarioDifficulty | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [guestProgressMap, setGuestProgressMap] = useState<Record<string, ScenarioProgressInfo>>({})

  useEffect(() => {
    const sync = () => {
      setGuestProgressMap(guestProgressToScenarioMap(readGuestScenarioProgress()))
    }
    sync()
    window.addEventListener('storage', sync)
    window.addEventListener('guest-scenario-progress', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('guest-scenario-progress', sync)
    }
  }, [])

  const mergedProgress = useMemo(() => {
    if (isAuthenticated) return progressByScenario
    return { ...guestProgressMap, ...progressByScenario }
  }, [isAuthenticated, progressByScenario, guestProgressMap])

  const filteredScenarios = useMemo(() => {
    return scenarios.filter((scenario) => {
      const specialtyMatch =
        selectedSpecialty === SPECIALTY_FILTER_ALL || scenario.specialty === selectedSpecialty
      const difficultyMatch = selectedDifficulty === 'all' || scenario.difficulty === selectedDifficulty
      const searchMatch = matchesSearch(scenario, searchQuery)
      return specialtyMatch && difficultyMatch && searchMatch
    })
  }, [scenarios, selectedSpecialty, selectedDifficulty, searchQuery])

  const { free: freeOrdered, locked: lockedOrdered } = useMemo(
    () => orderWithFreeCasesFirst(filteredScenarios),
    [filteredScenarios]
  )

  const showUnlockMessage =
    !isAuthenticated && freeOrdered.length > 0 && lockedOrdered.length > 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SimulatorHelpButton libraryPage />

      <div className="mb-8">
        <p className="text-sm font-semibold text-primary-700 mb-2">{APP_NAME} case library</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose a patient case</h1>
        <p className="text-lg text-slate-700 mb-2 max-w-2xl">Pick a scenario to practice clinical reasoning.</p>
        <p className="text-sm text-slate-600 mb-8 max-w-2xl">
          You&apos;ll ask questions, gather clues, order tests, and make the call — then see how you did.
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label htmlFor="case-search" className="block text-sm font-medium text-gray-700 mb-2">
              Search cases
            </label>
            <input
              id="case-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Title, specialty, keywords…"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SpecialtyFilter value={selectedSpecialty} onChange={setSelectedSpecialty} />
            </div>

            <div className="flex-1">
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as ScenarioDifficulty | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All difficulties</option>
                <option value="Beginner">Easy (Beginner)</option>
                <option value="Intermediate">Medium (Intermediate)</option>
                <option value="Advanced">Hard (Advanced)</option>
              </select>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Showing {filteredScenarios.length} of {scenarios.length} scenarios
        </p>
      </div>

      {filteredScenarios.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No cases match these filters on {APP_NAME}. Try widening specialty, difficulty, or search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeOrdered.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              progress={mergedProgress[scenario.id]}
              sessionReady={sessionReady}
              sessionStatus={status}
              isAuthenticated={isAuthenticated}
            />
          ))}

          {showUnlockMessage ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 my-2">
              <div className="rounded-xl border border-primary-200/80 bg-primary-50/90 px-4 py-4 sm:px-6 sm:py-5 text-center">
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed max-w-3xl mx-auto">
                  Complete the free cases and create an account to unlock more specialties and advanced patient
                  scenarios.
                </p>
              </div>
            </div>
          ) : null}

          {lockedOrdered.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              progress={mergedProgress[scenario.id]}
              sessionReady={sessionReady}
              sessionStatus={status}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  )
}
