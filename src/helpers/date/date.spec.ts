import { describe, expect, it } from 'vitest'
import { MESSAGE_DATE_INVALID, creationDateFormatter } from './date.helper'

describe('Date Helper', () => {
  const currentDate = new Date().toJSON()

  it('should validate the date format emdd/mm/yyyy, HH:mm', () => {
    const date = creationDateFormatter(currentDate)
    const formatIsValid = /(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2})$/.test(date)

    expect(formatIsValid).toBe(true)
  })

  it('should return an error message when the date is invalid ', () => {
    const date = creationDateFormatter('')
    const date2 = creationDateFormatter('-')
    const date3 = creationDateFormatter('[]')

    expect(date).toBe(MESSAGE_DATE_INVALID)
    expect(date2).toBe(MESSAGE_DATE_INVALID)
    expect(date3).toBe(MESSAGE_DATE_INVALID)
  })
})
