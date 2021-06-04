export const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export const formatCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export const formatCard = (card: string) => {
  return card.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
}

export const formatPhone = (phone: string) => {
  let phoneFormatter = phone
  if (phoneFormatter.length > 10) {
    phoneFormatter = phoneFormatter.replace(
      /^(\d\d)(\d{1})(\d{4})(\d{4}).*/,
      '$1 $2 $3-$4'
    )
  } else {
    phoneFormatter = phoneFormatter.replace(
      /^(\d\d)(\d{4})(\d{0,4}).*/,
      '$1 $2-$3'
    )
  }
  return phoneFormatter
}

export const formatNumberCard = (card: string) => {
  return formatCard(card).split(' ').slice(-1)
}
export const formatDate = (date: string) => {
  return date.split('-').reverse().join('/')
}

export const formatFullDate = (date: Date) => {
  return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }/${date.getFullYear()}`
}
