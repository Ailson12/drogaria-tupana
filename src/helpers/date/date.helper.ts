export const MESSAGE_DATE_INVALID = 'Data inválida'

const dateIsInValid = (date: Date) => Number.isNaN(date.getTime())

export const creationDateFormatter = (date: string) => {
  const dateParsed = new Date(date)

  if (dateIsInValid(dateParsed)) {
    return MESSAGE_DATE_INVALID
  }

  const instanceFormat = Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })

  return instanceFormat.format(dateParsed)
}
