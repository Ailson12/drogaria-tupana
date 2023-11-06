import { describe, expect, it } from 'vitest'
import { formatMoney, clearMoneyFormatting, MESSAGE_MONEY_INVALID } from './money.helper'

describe('Money Helper', () => {
  it('should format for Brazilian currency', () => {
    const value = formatMoney(250.55)
    expect(value).toContain('250,55')
  })

  it('should contain real R$ prefix', () => {
    const value = formatMoney(250)
    expect(value).toContain('R$')
  })

  it('should return empty value if no value is provided', () => {
    const value = formatMoney()
    const cleanValue = clearMoneyFormatting(value)
    expect(cleanValue).toBe(0)
  })

  it('should return a message if the value is invalid', () => {
    const valueNan = formatMoney('invalid value')
    const valueInfinity = formatMoney(Number.POSITIVE_INFINITY)

    expect(valueNan).toBe(MESSAGE_MONEY_INVALID)
    expect(valueInfinity).toBe(MESSAGE_MONEY_INVALID)
  })
})
