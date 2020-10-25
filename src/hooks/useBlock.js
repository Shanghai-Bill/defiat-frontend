import { useEffect, useState } from 'react'

export const useBlock = (web3) => {
  const [block, setBlock] = useState()
  
  useEffect(() => {
    const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
      if (!error) {
        setBlock(result)
        return
      }
      console.error(error)
    })

    return () => subscription.unsubscribe()
  }, [])

  return block
}
