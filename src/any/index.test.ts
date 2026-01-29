import { describe, test, expect } from 'vitest'
import { ref } from 'vue'
import { any } from '.'

describe('any', () => {
	const cases = {
		basic: [
			{ inputs: [false, false], expected: false },
			{ inputs: [true, false], expected: true },
			{ inputs: [false, true], expected: true },
			{ inputs: [true, true], expected: true },
		],
		misc: [
			{ inputs: [], expected: false },
			{ inputs: [true], expected: true },
			{ inputs: [false], expected: false },
			{ inputs: [false, false, true, false], expected: true },
			{
				inputs: [false, false, false, false, false, false, false],
				expected: false,
			},
			{
				inputs: [true, true, true, true, true, true, true, true],
				expected: true,
			},
		],
	}

	describe('with boolean primitive sources', () => {
		test.for(cases.basic)(
			'basic: $inputs → $expected',
			({ inputs, expected }) => {
				const result = any(...inputs)
				expect(result.value).toBe(expected)
			},
		)

		test.for(cases.misc)(
			'misc: $inputs → $expected',
			({ inputs, expected }) => {
				const result = any(...inputs)
				expect(result.value).toBe(expected)
			},
		)
	})

	describe('with getter sources', () => {
		test.for(cases.basic)(
			'basic: $inputs → $expected',
			({ inputs, expected }) => {
				const getters = inputs.map(v => () => v)
				const result = any(...getters)
				expect(result.value).toBe(expected)
			},
		)

		test.for(cases.misc)(
			'misc: $inputs → $expected',
			({ inputs, expected }) => {
				const getters = inputs.map(v => () => v)
				const result = any(...getters)
				expect(result.value).toBe(expected)
			},
		)
	})

	describe('with ref sources', () => {
		test.for(cases.basic)(
			'basic: $inputs → $expected',
			({ inputs, expected }) => {
				const refs = inputs.map(v => ref(v))
				const result = any(...refs)
				expect(result.value).toBe(expected)
			},
		)

		test.for(cases.misc)(
			'misc: $inputs → $expected',
			({ inputs, expected }) => {
				const refs = inputs.map(v => ref(v))
				const result = any(...refs)
				expect(result.value).toBe(expected)
			},
		)
	})

	test('with mixed source types', () => {
		const a = ref(false)
		const b = () => false
		const c = true

		const result = any(a, b, c)
		expect(result.value).toBe(true)

		a.value = false
		expect(result.value).toBe(true)

		const allFalse = any(ref(false), () => false, false)
		expect(allFalse.value).toBe(false)
	})

	test('is reactive', () => {
		const a = ref(false)
		const b = ref(false)
		const result = any(a, b)

		expect(result.value).toBe(false)

		a.value = true
		expect(result.value).toBe(true)

		a.value = false
		expect(result.value).toBe(false)

		b.value = true
		expect(result.value).toBe(true)
	})
})
