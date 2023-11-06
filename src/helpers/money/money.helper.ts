export const MESSAGE_MONEY_INVALID = 'valor inválido'

const moneyIsInvalid = (value: number) => [Number.POSITIVE_INFINITY, Number.NaN].includes(value)

export const formatMoney = (value: number | string = 0) => {
  const parsed = Number(value)
  if (moneyIsInvalid(parsed)) {
    return MESSAGE_MONEY_INVALID
  }

  const instanceFormat = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })

  return instanceFormat.format(parsed)
}

export const clearMoneyFormatting = (value: string): number => {
  return +value.replace('R$', '').replace(/\./g, '').replace(',', '.')
}
