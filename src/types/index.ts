export interface IClientContext {
  client: IClient
  customerInAttendance(c: number): Promise<IClient | string>
}

export interface IClient {
  id: number
  name: string
  phone: number
  cpf: number
  bank: {
    label: string
    accountTypeLabel: string
    accountNumber: number
    agency: number
  }
}

export interface IRateTableContext {
  getAllTables(c: IRateTable[]): IRateTable[]
  getTableActual(
    c: IFeels[],
    id: number,
    index: number,
    name: string
  ): IRateTable
  getGenerateTableOptions(desiredValue: number): IGenerateTable | null
  tableSelected: IRateTable
}

export interface IRateTable {
  id: number
  name: string
  feels: IFeels
}
export interface IFeels {
  id: number
  installments: number
  interest: number
  percentageInterestIncrease: number
  comission: number
  portionAmount: number
  amount: number
}
export interface IGenerateTable {
  tableIdOne: number
  tableIdTwo: number
  tableNameOne: string
  tableNameTwo: string
  tableOne: IFeels[]
  tableTwo: IFeels[]
}

export interface ISolicitationContext {
  getDataSolicitation(
    contract: 'automatico' | 'manual'
  ): Promise<boolean | null>
  setLoanAmount(n: number): void
  getDataCard(c: ICard): Promise<boolean>
  desiredValue: number
  solicitation: ISolicitation
  setDateExpiredCard(s: string, n: number): void
  dataSpecificCard: IDetailsCard
}

export interface IDetailsCard {
  expire: string
  cvc: number
}

export interface ISolicitation {
  id: number
  clientId: number
  installmentInterestValue: number
  comissionValue: number
  installmentValue: number
  cardNumber: number
  desiredValue: number
  totalPayment: number
  rateTableId: number
  numberOfInstallments: number
  contract: 'automatico' | 'manual'
}

export interface ICard {
  id: number
  cardNumber: number
  expirationDate: string
  nameCard: string
  cvc: number
  frontPhoto?: string
  backPhoto?: string
  selfiePhot?: string
  idClient: number
}
