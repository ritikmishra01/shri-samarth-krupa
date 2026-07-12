import { useEffect } from 'react'

/**
 * SEOMeta — Dynamically sets document title and meta description.
 * For full SSR-level SEO, use react-helmet-async instead.
 */
export default function SEOMeta({ title, description, keywords, canonical }) {
  useEffect(() => {
    const base = 'Shree Samarth Krupa Diagnostic Centre'
    document.title = title ? `${title} | ${base}` : base

    const setMeta = (name, content) => {
      if (!content) return
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('keywords',    keywords)

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }

    return () => {
      document.title = base
    }
  }, [title, description, keywords, canonical])

  return null
}
