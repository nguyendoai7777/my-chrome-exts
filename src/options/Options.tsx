import { useState, useEffect } from 'react'

import './Options.css'
import storage from '../common/storage'
import message from '../common/messenger'

export const Options = () => {
  const [countSync, setCountSync] = useState(0)
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  useEffect(() => {
    storage.get<{ count: number }>(['count'], (result) => {
      setCountSync(result.count || 0)
    })

    message.listener<{ type: string; count: number }>(({ count, type }) => {
      if (type === 'COUNT') {
        setCountSync(count || 0)
      }
    })
  }, [])

  return (
    <main>
      <h3>Options Page</h3>
      <h4>Count from Popup: {countSync}</h4>
      <a href={link} target="_blank">
        generated by create-chrome-ext
      </a>
    </main>
  )
}

export default Options