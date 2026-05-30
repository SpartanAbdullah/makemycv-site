import { templates } from '@/.velite'

export type Template = (typeof templates)[0]

export function getAllTemplates(): Template[] {
  return templates
    .filter((t) => t.published)
    .sort((a, b) => a.order - b.order)
}

export function getFeaturedTemplates(limit = 5): Template[] {
  return getAllTemplates().slice(0, limit)
}
