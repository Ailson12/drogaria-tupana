import { generateUUID } from './uuid.helper'
import { describe, expect, it } from 'vitest'

describe('UUID Helper', () => {
  it('function should return something', () => {
    expect(generateUUID()).toBeDefined()
  })

  it('should return letters and numbers', () => {
    const value = generateUUID()
    expect(value).toMatch(/(\D)(\d)/)
  })

  it('should return 36 characters', () => {
    const value = generateUUID()
    expect(value).toHaveLength(36)
  })
})
