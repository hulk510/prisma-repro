'use client'

import { useEffect, useState } from 'react'

export function MSWTest() {
  const [data, setData] = useState<{ message: string } | null>(null)
  useEffect(() => {
    fetch('/')
      .then((response) => response.json())
      .then(setData)
  })

  return <div>{data ? data.message : 'Loading...'}</div>
}
