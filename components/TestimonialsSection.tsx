'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { formatTestimonialRole, type PublicTestimonial } from '@/lib/testimonials'

type Props = {
  testimonials: PublicTestimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-600'
          }`}
          aria-hidden
        />
      ))}
    </div>
  )
}

function TestimonialCard({ item }: { item: PublicTestimonial }) {
  const roleLine = formatTestimonialRole(item.level, item.organization, item.specialty)
  const initials = item.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <article className="medcess-card h-full flex flex-col p-6 sm:p-7 animate-fade-in">
      <Quote className="h-7 w-7 text-primary-400/70 mb-3 shrink-0" aria-hidden />
      {item.rating != null && item.rating > 0 ? (
        <div className="mb-3">
          <StarRating rating={item.rating} />
        </div>
      ) : null}
      <blockquote className="flex-1 text-slate-700 dark:text-[#CBD5E1] text-[15px] leading-relaxed whitespace-pre-wrap">
        &ldquo;{item.text}&rdquo;
      </blockquote>
      <footer className="mt-6 pt-5 border-t border-slate-100 dark:border-medcess-dark-border flex items-center gap-3">
        {item.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.photoUrl}
            alt=""
            className="h-12 w-12 rounded-full object-cover border border-slate-200 dark:border-medcess-dark-border shrink-0"
          />
        ) : (
          <div
            className="h-12 w-12 rounded-full bg-gradient-medcess text-white flex items-center justify-center text-sm font-semibold shrink-0"
            aria-hidden
          >
            {initials || '?'}
          </div>
        )}
        <div className="min-w-0 text-left">
          <p className="font-semibold text-medcess-navy dark:text-[#F8FAFC] truncate">{item.name}</p>
          <p className="text-sm italic text-slate-600 dark:text-[#94a3b8] leading-snug mt-0.5">{roleLine}</p>
        </div>
      </footer>
    </article>
  )
}

export default function TestimonialsSection({ testimonials }: Props) {
  const [index, setIndex] = useState(0)
  const [perPage, setPerPage] = useState(3)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerPage(1)
      else if (window.innerWidth < 1024) setPerPage(2)
      else setPerPage(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const pageCount = Math.max(1, Math.ceil(testimonials.length / perPage))
  const safeIndex = Math.min(index, pageCount - 1)

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, pageCount - 1)))
  }, [pageCount])

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + pageCount) % pageCount)
    },
    [pageCount]
  )

  if (testimonials.length === 0) return null

  const start = safeIndex * perPage
  const visible = testimonials.slice(start, start + perPage)
  const useCarousel = testimonials.length > perPage

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#020817]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <p className="medcess-section-label mb-2">Testimonials</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-medcess-navy dark:text-[#F8FAFC] text-balance">
            What Students and Healthcare Professionals Are Saying
          </h2>
        </div>

        <div
          className="relative"
          onTouchStart={(e) => {
            touchStartX.current = e.changedTouches[0]?.clientX ?? null
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null || !useCarousel) return
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            touchStartX.current = null
          }}
        >
          <ul
            className={`grid gap-5 ${
              perPage === 1 ? 'grid-cols-1' : perPage === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {visible.map((item) => (
              <li key={item.id} className="min-h-[16rem]">
                <TestimonialCard item={item} />
              </li>
            ))}
          </ul>

          {useCarousel ? (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => go(-1)}
                className="btn-press inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-medcess-navy hover:border-primary-300 hover:text-primary-600 dark:bg-medcess-dark-card dark:border-medcess-dark-border dark:text-[#F8FAFC]"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonial pages">
                {Array.from({ length: pageCount }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === safeIndex}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === safeIndex
                        ? 'w-6 bg-gradient-medcess'
                        : 'w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                className="btn-press inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-medcess-navy hover:border-primary-300 hover:text-primary-600 dark:bg-medcess-dark-card dark:border-medcess-dark-border dark:text-[#F8FAFC]"
                aria-label="Next testimonials"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
