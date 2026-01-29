import { describe, test, expect } from 'vitest'
import { ref } from 'vue'
import { not } from '.'

describe('not', () => {
	const cases = [
		{ input: true, expected: false },
		{ input: false, expected: true },
	]

	describe('with a boolean primitive source', () => {
		test.for(cases)(
			'negates the value ($input → $expected)',
			({ input, expected }) => {
				const result = not(input)
				expect(result.value).toBe(expected)
			},
		)
	})

	describe('with a getter source', () => {
		test.for(cases)(
			'negates the value ($input → $expected)',
			({ input, expected }) => {
				const source = () => input
				const result = not(source)
				expect(result.value).toBe(expected)
			},
		)
	})

	describe('with a ref source', () => {
		test.for(cases)(
			'negates the value ($input → $expected)',
			({ input, expected }) => {
				const source = ref(input)
				const result = not(source)
				expect(result.value).toBe(expected)
			},
		)
	})

	test('is reactive', () => {
		const source = ref(false)
		const result = not(source)

		expect(result.value).toBe(true)

		source.value = true
		expect(result.value).toBe(false)

		source.value = false
		expect(result.value).toBe(true)
	})

	test('does not mutate the source', () => {
		const source = ref(true)
		not(source)
		expect(source.value).toBe(true)
	})
})
