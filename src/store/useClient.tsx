import axios from 'config/axios'
import React, { createContext, useState, useContext } from 'react'
import { IClient, IClientContext } from 'types'

const ClientContext = createContext<IClientContext>({} as IClientContext)

const ClientProvider: React.FC = ({ children }) => {
  const [client, setClient] = useState<IClient>({} as IClient)

  const customerInAttendance = async (cpf: number) => {
    const client = await axios.get<IClient[]>('client').then((res) => res.data)

    let data: IClient = {} as IClient
    client.forEach((cli) => {
      if (cli.cpf === cpf) {
        data = { ...cli }
      }
    })

    if (Object.values(data).length === 0) {
      return 'Usuário não Cadastrado'
    } else {
      setClient(data)
      return data
    }
  }

  return (
    <ClientContext.Provider value={{ client, customerInAttendance }}>
      {children}
    </ClientContext.Provider>
  )
}

const useClient = (): IClientContext => {
  const context = useContext(ClientContext)

  return context
}

export { ClientProvider, useClient }
