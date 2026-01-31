import { describe, test, expect } from 'vitest'
import { ref } from 'vue'
import { exact } from '.'

describe('exact', () => {
	const cases = [
		{ target: 0, inputs: [], expected: true },
		{ target: 0, inputs: [false], expected: true },
		{ target: 1, inputs: [true], expected: true },
		{ target: 1, inputs: [false], expected: false },
		{ target: 1, inputs: [true, true], expected: false },
		{ target: 2, inputs: [true, true], expected: true },
		{ target: 2, inputs: [true, false], expected: false },
		{ target: 2, inputs: [true, false, true], expected: true },
		{ target: 2, inputs: [true, true, true], expected: false },
		{
			target: 5,
			inputs: [true, true, false, true, true, true],
			expected: true,
		},
		{ target: 11, inputs: [true, false], expected: false },
		{ target: 26, inputs: [true, false, true], expected: false },
	]

	describe('with boolean primitive sources', () => {
		test.for(cases)(
			'target=$target, inputs=$inputs → $expected',
			({ target, inputs, expected }) => {
				const result = exact(target, ...inputs)
				expect(result.value).toBe(expected)
			},
		)
	})

	describe('with getter sources', () => {
		test.for(cases)(
			'target=$target, inputs=$inputs → $expected',
			({ target, inputs, expected }) => {
				const targetGetter = () => target
				const getters = inputs.map(v => () => v)

				const result = exact(targetGetter, ...getters)
				expect(result.value).toBe(expected)
			},
		)
	})

	describe('with ref sources', () => {
		test.for(cases)(
			'target=$target, inputs=$inputs → $expected',
			({ target, inputs, expected }) => {
				const targetRef = ref(target)
				const refs = inputs.map(v => ref(v))

				const result = exact(targetRef, ...refs)
				expect(result.value).toBe(expected)
			},
		)
	})

	test('with mixed source types', () => {
		const target = ref(2)
		const a = ref(true)
		const b = () => false
		const c = true

		const result = exact(target, a, b, c)
		expect(result.value).toBe(true)

		a.value = false
		expect(result.value).toBe(false)

		target.value = 1
		expect(result.value).toBe(true)
	})

	test('is reactive', () => {
		const target = ref(2)
		const a = ref(false)
		const b = ref(false)

		const result = exact(target, a, b)
		expect(result.value).toBe(false)

		a.value = true
		expect(result.value).toBe(false)

		b.value = true
		expect(result.value).toBe(true)

		target.value = 1
		expect(result.value).toBe(false)
	})
})
