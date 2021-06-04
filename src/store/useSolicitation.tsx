import axios from 'config/axios'
import React, { createContext, useState, useContext } from 'react'
import { ICard, IDetailsCard, ISolicitation, ISolicitationContext } from 'types'
import { useClient } from './useClient'
import { useRateTable } from './useRateTable'

const SolicitationContext = createContext<ISolicitationContext>(
  {} as ISolicitationContext
)

const SolicitationProvider: React.FC = ({ children }) => {
  const [solicitation, setSolicitation] = useState<ISolicitation>(
    {} as ISolicitation
  )

  const [desiredValue, setDesiredValue] = useState(0)
  const [dataSpecificCard, setDataSpecificCard] = useState<IDetailsCard>(
    {} as IDetailsCard
  )
  const [card, setCard] = useState<ICard>({} as ICard)

  const { client } = useClient()
  const { tableSelected } = useRateTable()

  const setLoanAmount = (n: number) => {
    setDesiredValue(n)
  }
  const setDateExpiredCard = (s: string, n: number) => {
    setDataSpecificCard({ expire: s, cvc: n })
  }
  const getDataCard = async (data: ICard) => {
    setCard(data)
    try {
      await postCard(data)
      return false
    } catch (error) {
      return true
    }
  }

  const getDataSolicitation = async (contract: 'automatico' | 'manual') => {
    if (Object.keys(client).length === 0) return null
    if (Object.keys(tableSelected).length === 0) return null
    if (Object.keys(card).length === 0) return null

    const data = {
      id: Math.floor(Math.random() * 9999) + 1,
      clientId: client.id,
      installmentInterestValue: tableSelected.feels.amount - desiredValue,
      comissionValue: parseFloat(
        ((tableSelected.feels.comission * desiredValue) / 100).toFixed(2)
      ),
      installmentValue: tableSelected.feels.portionAmount,
      cardNumber: card.cardNumber,
      desiredValue: desiredValue,
      totalPayment: tableSelected.feels.amount,
      rateTableId: tableSelected.id,
      numberOfInstallments: tableSelected.feels.installments,
      contract
    }

    setSolicitation(data)
    const result = await postSolicitation(data)
    if (result.status === 200 || result.status === 201) {
      return false
    } else {
      return true
    }
  }

  const postCard = async (data: ICard) => {
    return await axios.post<ICard>('cards', { ...data })
  }
  const postSolicitation = async (data: ISolicitation) => {
    return await axios.post<ICard>('solicitation', { ...data })
  }

  return (
    <SolicitationContext.Provider
      value={{
        getDataSolicitation,
        setLoanAmount,
        getDataCard,
        desiredValue,
        solicitation,
        dataSpecificCard,
        setDateExpiredCard
      }}
    >
      {children}
    </SolicitationContext.Provider>
  )
}

const useSolicitation = (): ISolicitationContext => {
  const context = useContext(SolicitationContext)

  return context
}

export { SolicitationProvider, useSolicitation }
