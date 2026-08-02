import Link from 'next/link'
import { FREE_CASE_IDS } from '@/lib/caseAccess'
import { scenarios } from '@/data/scenarios'
import { APP_NAME, TAGLINE, TAGLINE_SHORT } from '@/lib/branding'
import MedcessLogo from '@/components/MedcessLogo'
import MedcessDivider from '@/components/brand/MedcessDivider'
import TestimonialsSection from '@/components/TestimonialsSection'
import { listVisibleTestimonials } from '@/lib/testimonials'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const starterCases = FREE_CASE_IDS.map((id) => scenarios.find((s) => s.id === id)).filter(
    (s): s is (typeof scenarios)[number] => Boolean(s)
  )
  const testimonials = await listVisibleTestimonials()
  return (
    <div className="min-h-screen bg-white dark:bg-[#020817]">
      <section className="relative overflow-hidden bg-medcess-hero dark:bg-medcess-hero-dark py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
          <div className="flex justify-center mb-8">
            <MedcessLogo size="xl" variant="full" href="/" glow />
          </div>
          <p className="medcess-section-label mb-4">Clinical reasoning simulations</p>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-[#CBD5E1] mb-3 max-w-2xl mx-auto leading-relaxed">
            {TAGLINE}
          </p>
          <p className="text-sm text-slate-600 dark:text-[#CBD5E1]/90 mb-10 max-w-xl mx-auto">{TAGLINE_SHORT}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link href="/scenarios" className="medcess-btn-primary text-lg !px-8 !py-3.5">
              Start First Case →
            </Link>
            <Link href="/dashboard" className="medcess-btn-secondary text-lg !px-8 !py-3.5">
              View Progress
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#020817]">
        <div className="max-w-6xl mx-auto">
          <MedcessDivider className="mb-10" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <p className="medcess-section-label mb-1">Featured — play free</p>
              <h2 className="text-2xl font-bold text-medcess-navy dark:text-[#F8FAFC]">Five starter cases</h2>
              <p className="text-sm text-slate-600 dark:text-[#CBD5E1] mt-1 max-w-xl">
                No sign-in required. Full cases, scoring, and debrief — jump in from any device.
              </p>
            </div>
            <Link
              href="/scenarios"
              className="btn-press shrink-0 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View all cases →
            </Link>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {starterCases.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/scenarios/${s.id}`}
                  className="medcess-card block p-4 hover:border-primary-200 h-full group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-semibold text-medcess-navy group-hover:text-primary-600 transition-colors">
                      {s.title}
                    </span>
                    <span className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-2 py-0.5 text-[11px] font-semibold leading-none text-primary-800">
                      Guest
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{s.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-medcess-surface dark:bg-[#020817]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-medcess-navy dark:text-[#F8FAFC] mb-10">
            Why <span className="text-gradient-medcess">{APP_NAME}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Realistic Virtual Patients',
                desc: 'Work through presentations that feel like the clinic — history, exam, data, then your call.',
              },
              {
                title: 'Instant Feedback & Scoring',
                desc: 'Get a debrief tied to what you asked, ordered, and concluded — not a generic quiz score.',
              },
              {
                title: 'Track Your Progress',
                desc: 'See completed runs and scores on your dashboard so you know where to drill next.',
              },
            ].map((item) => (
              <div key={item.title} className="medcess-card p-6 text-center">
                <div className="mx-auto mb-4 flex justify-center">
                  <span className="h-1 w-12 rounded-full bg-gradient-medcess" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-medcess-navy dark:text-[#F8FAFC] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#020817]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-medcess-navy dark:text-[#F8FAFC] mb-10">How a case flows</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: '1', title: 'Interview', desc: 'Ask about symptoms and context.' },
              { step: '2', title: 'Exam', desc: 'Open each system and read findings.' },
              { step: '3', title: 'Tests', desc: 'Order what you need to narrow the list.' },
              { step: '4', title: 'Diagnosis', desc: 'Build a differential and pick one.' },
              { step: '5', title: 'Debrief', desc: 'See strengths, gaps, and teaching points.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-gradient-medcess text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-medcess">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-medcess-navy dark:text-[#F8FAFC] mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-[#CBD5E1] text-sm leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-medcess-surface dark:bg-[#020817]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-medcess-navy dark:text-[#F8FAFC] mb-4">Who it&apos;s for</h2>
          <p className="text-lg text-slate-700 dark:text-[#CBD5E1] mb-8">
            Built for <strong>high school</strong> and <strong>pre-med</strong> learners exploring medicine through
            immersive simulations — and anyone curious how workups are sequenced.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="medcess-card p-6">
              <h3 className="text-lg font-semibold text-medcess-navy dark:text-[#F8FAFC] mb-2">Orientation</h3>
              <p className="text-slate-600 dark:text-[#CBD5E1] text-sm leading-relaxed">
                See how an encounter is structured before you shadow or rotate.
              </p>
            </div>
            <div className="medcess-card p-6">
              <h3 className="text-lg font-semibold text-medcess-navy dark:text-[#F8FAFC] mb-2">Reps</h3>
              <p className="text-slate-600 dark:text-[#CBD5E1] text-sm leading-relaxed">
                Drill questions, data interpretation, and committing to a diagnosis under a little time pressure.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href="/about"
              className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              Learn more about {APP_NAME} →
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />
    </div>
  )
}
