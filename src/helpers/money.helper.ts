export const formatMoney = (value: number | string = 0) => {
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value))
}
