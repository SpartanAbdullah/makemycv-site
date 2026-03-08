import { posts } from '@/.velite'

export type Post = (typeof posts)[0]

export function getAllPosts(): Post[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured).slice(0, 3)
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slugPath === slug && post.published)
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getRelatedPosts(current: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((post) => post.slugPath !== current.slugPath)
    .filter(
      (post) =>
        post.category === current.category ||
        post.tags.some((tag) => current.tags.includes(tag))
    )
    .slice(0, limit)
}

export const categories = [
  'CV Tips',
  'UAE Job Market',
  'ATS Guide',
  'Career Advice',
  'Interview Tips',
  'Industry Guide',
] as const

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
