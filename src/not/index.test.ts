/*
 * Copyright © 2026 Aurora <aurora@4d2.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
