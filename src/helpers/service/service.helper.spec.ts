import { describe, expect, it } from 'vitest'
import { errorCallback } from './service.helper'

describe('Service Helper', () => {
  it('should return promise with error', () => {
    const error = {
      message: 'error'
    }

    expect(errorCallback(error)).rejects.toEqual(error)
  })
})
