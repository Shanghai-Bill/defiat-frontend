import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import constants from 'constants'
import DeFiat_Farming from 'contracts/DeFiat_Farming_v12.json'

export const Operator = ({
  web3,
  accounts
}) => {
  const contractId = useParams();


  const [isLoading, setLoading] = useState(true);
  const [farmingContract, setFarmingContract] = useState({});
  const [operatorState, setOperatorState] = useState({
    operatorAddresss: ""
  })

  useEffect(() => {
    const contract = new web3.eth.Contract(DeFiat_Farming.abi, contractId)

    setLoading(false);
  }, [])

  return (
    <>
      {constants.isLocalhost || (!isLoading && accounts[0] === operatorState.operatorAddresss) ? (
        <>
    {/* Show the pool */}
        </>
      ) : (
        <>
        {/* Dont show the pool */}
        </>
      )}
    </>
  )
}
