import React, { createContext, useState, useContext } from 'react'
import { IFeels, IRateTable, IRateTableContext } from 'types'

const RateTableContext = createContext<IRateTableContext>(
  {} as IRateTableContext
)

const RateTableProvider: React.FC = ({ children }) => {
  const [rateTable, setRateTable] = useState<IRateTable[]>([])
  const [tableSelected, setTableSelected] = useState<IRateTable>(
    {} as IRateTable
  )

  const getAllTables = (rateTableActual: IRateTable[]) => {
    setRateTable(rateTableActual)

    return rateTable
  }

  const getTableActual = (
    rateTableActual: IFeels[],
    id: number,
    index: number,
    name: string
  ) => {
    const table: IRateTable = {
      id,
      name
    } as IRateTable

    rateTableActual.forEach((tab) => {
      if (tab.installments === index) {
        table.feels = { ...tab }
      }
    })

    setTableSelected(table)
    return tableSelected
  }

  const getGenerateTableOptions = (desiredValue: number) => {
    if (rateTable.length > 0) {
      const table = rateTable.filter((tab) => tab)
      const limitOne = table[0].feels.installments
      const limitTwo = table[1].feels.installments

      const tableFirst: IFeels[] = []
      const tableSecond: IFeels[] = []

      for (let i = 1; i <= limitOne; i++) {
        const data: IFeels = {
          id: table[0].id,
          installments: i,
          interest: parseInt(
            (table[0].feels.percentageInterestIncrease * i).toFixed(0)
          ),
          percentageInterestIncrease: table[0].feels.percentageInterestIncrease,
          comission: parseFloat(
            ((table[0].feels.comission * desiredValue) / 100).toFixed(2)
          ),
          portionAmount:
            (desiredValue *
              (1 +
                (table[0].feels.percentageInterestIncrease *
                  table[0].feels.installments) /
                  100)) /
            i,
          amount:
            desiredValue *
            (1 +
              (table[0].feels.percentageInterestIncrease *
                table[0].feels.installments) /
                100)
        }

        tableFirst.push(data)
      }

      for (let i = 1; i <= limitTwo; i++) {
        const data: IFeels = {
          id: table[1].id,
          installments: i,
          interest: parseInt(
            (table[1].feels.percentageInterestIncrease * i).toFixed(0)
          ),
          percentageInterestIncrease: table[1].feels.percentageInterestIncrease,
          comission: parseFloat(
            ((table[1].feels.comission * desiredValue) / 100).toFixed(2)
          ),
          portionAmount:
            (desiredValue *
              (1 +
                (table[1].feels.percentageInterestIncrease *
                  table[1].feels.installments) /
                  100)) /
            i,
          amount:
            desiredValue *
            (1 +
              (table[1].feels.percentageInterestIncrease *
                table[1].feels.installments) /
                100)
        }

        tableSecond.push(data)
      }

      return {
        tableIdOne: table[0].id,
        tableIdTwo: table[1].id,
        tableNameOne: table[0].name,
        tableNameTwo: table[1].name,
        tableOne: tableFirst,
        tableTwo: tableSecond
      }
    } else {
      return null
    }
  }

  return (
    <RateTableContext.Provider
      value={{
        tableSelected,
        getAllTables,
        getTableActual,
        getGenerateTableOptions
      }}
    >
      {children}
    </RateTableContext.Provider>
  )
}

const useRateTable = (): IRateTableContext => {
  const context = useContext(RateTableContext)

  return context
}

export { RateTableProvider, useRateTable }
