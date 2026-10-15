import { describe, it, expect } from 'vitest'
import { parsePagination, isValidShortCode } from './links.validation.js'

describe('parsePagination', () => {
  it('defaults to page=1 and limit=10 when no query values are given', () => {
    const { value, errors } = parsePagination({})
    expect(errors).toBeUndefined()
    expect(value).toEqual({ page: 1, limit: 10 })
  })

  it('parses valid page and limit values', () => {
    const { value, errors } = parsePagination({ page: '2', limit: '5' })
    expect(errors).toBeUndefined()
    expect(value).toEqual({ page: 2, limit: 5 })
  })

  it('rejects page zero', () => {
    const { value, errors } = parsePagination({ page: '0' })
    expect(value).toBeUndefined()
    expect(errors.page).toBeDefined()
  })

  it('rejects a negative page', () => {
    const { value, errors } = parsePagination({ page: '-1' })
    expect(value).toBeUndefined()
    expect(errors.page).toBeDefined()
  })

  it('rejects a non-numeric page', () => {
    const { value, errors } = parsePagination({ page: 'abc' })
    expect(value).toBeUndefined()
    expect(errors.page).toBeDefined()
  })

  it('rejects limit zero', () => {
    const { value, errors } = parsePagination({ limit: '0' })
    expect(value).toBeUndefined()
    expect(errors.limit).toBeDefined()
  })

  it('rejects a non-numeric limit', () => {
    const { value, errors } = parsePagination({ limit: 'abc' })
    expect(value).toBeUndefined()
    expect(errors.limit).toBeDefined()
  })

  it('clamps a limit greater than 100 to 100', () => {
    const { value, errors } = parsePagination({ limit: '150' })
    expect(errors).toBeUndefined()
    expect(value).toEqual({ page: 1, limit: 100 })
  })
})

describe('isValidShortCode', () => {
  it('rejects a 2-character shortCode', () => {
    expect(isValidShortCode('ab')).toBe(false)
  })

  it('accepts a 3-character shortCode', () => {
    expect(isValidShortCode('abc')).toBe(true)
  })

  it('accepts a 40-character shortCode', () => {
    expect(isValidShortCode('a'.repeat(40))).toBe(true)
  })

  it('rejects a 41-character shortCode', () => {
    expect(isValidShortCode('a'.repeat(41))).toBe(false)
  })
})
