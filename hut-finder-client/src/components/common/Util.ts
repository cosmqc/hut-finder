import DOMPurify from 'dompurify'

export const sanitiseHtml = (dirty: string) => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'class'],
    ALLOW_DATA_ATTR: false,
    USE_PROFILES: { html: true },
  })
}

export const pluraliseWord = (
  count: number,
  word: string,
  returnWordOnly: boolean = false
): string => {
  const str = `${word}${count > 1 ? 's' : ''}`
  if (returnWordOnly) {
    return str
  }
  return `${count} ${str}`
}
