import { BASE_URL } from '../config/api'

/**
 * Normalizes an image path from the backend into a valid full URL.
 * Handles:
 * - Empty/null paths (returns a placeholder)
 * - Absolute URLs (returns as-is)
 * - Windows backslashes (converts to forward slashes)
 * - Leading slashes
 */
export const getImageUrl = (path) => {
  if (!path) return 'https://placehold.co/400x300/144f36/ffffff?text=No+Image'
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  // Convert Windows backslashes to forward slashes
  let cleanPath = path.replace(/\\/g, '/')

  // Remove leading slash if present
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1)
  }

  // Remove leading 'src/' if present (since backends usually serve 'src/uploads' at just '/uploads')
  if (cleanPath.startsWith('src/')) {
    cleanPath = cleanPath.substring(4)
  }

  // Handle BASE_URL that might have a trailing slash, and remove /api if present just in case
  let baseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL
  baseUrl = baseUrl.replace(/\/api$/, '')

  return `${baseUrl}/${cleanPath}`
}
