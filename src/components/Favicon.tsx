import { useEffect, useState } from 'react'

const Favicon = ({ link }: { link: string }) => {
  const [src, setSrc] = useState('')
  useEffect(() => {
    if (link.includes('github.com'))
      setSrc('https://github.githubassets.com/favicons/favicon.svg')
    else setSrc(`https://www.google.com/s2/favicons?domain=${link}`)
  }, [])
  return <img src={src} alt="Favicon" height="16" width="16" />
}

export default Favicon
