import { guidesQuery } from '@/queries/guides.query'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useGuide(guideId: number) {
  const guides = useSuspenseQuery(guidesQuery)

  const guide = guides.data.guides.find((guide) => guide.id === guideId)

  if (!guide) {
    throw new Error(`Guide with id ${guideId} not found`)
  }

  return guide
}
