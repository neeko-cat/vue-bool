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

import { describe, test, expect, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { whenever } from '.'

describe('whenever', () => {
	test('does not call callback when value is false', async () => {
		const source = ref(false)
		const cb = vi.fn()

		whenever(source, cb)

		await nextTick()
		expect(cb).not.toHaveBeenCalled()
	})

	test('calls callback when value becomes true', async () => {
		const source = ref(false)
		const cb = vi.fn()

		whenever(source, cb)

		source.value = true
		await nextTick()

		expect(cb).toHaveBeenCalledTimes(1)
	})

	test('calls callback every time value becomes true', async () => {
		const source = ref(false)
		const cb = vi.fn()

		whenever(source, cb)

		source.value = true
		await nextTick()

		source.value = false
		await nextTick()

		source.value = true
		await nextTick()

		expect(cb).toHaveBeenCalledTimes(2)
	})

	test('works with getter sources', async () => {
		const source = ref(0)
		const cb = vi.fn()

		whenever(() => source.value > 1, cb)

		source.value = 2
		await nextTick()

		expect(cb).toHaveBeenCalledTimes(1)
	})

	test('triggers only once with `once: true`', async () => {
		const source = ref(false)
		const cb = vi.fn()

		whenever(source, cb, { once: true })

		source.value = true
		await nextTick()

		source.value = false
		await nextTick()

		source.value = true
		await nextTick()

		expect(cb).toHaveBeenCalledTimes(1)
	})

	test('triggers only once with `once: true` after intermediate false updates', async () => {
		const source = ref(true)
		const cb = vi.fn()

		whenever(source, cb, { once: true })

		source.value = false
		await nextTick()

		source.value = true
		await nextTick()

		source.value = false
		await nextTick()

		source.value = true
		await nextTick()

		expect(cb).toHaveBeenCalledTimes(1)
	})

	test('respects immediate option', async () => {
		const source = ref(true)
		const cb = vi.fn()

		whenever(source, cb, { immediate: true })

		await nextTick()

		expect(cb).toHaveBeenCalledTimes(1)
	})

	test('can be stopped manually', async () => {
		const source = ref(false)
		const cb = vi.fn()

		const stop = whenever(source, cb)

		source.value = true
		await nextTick()

		expect(cb).toHaveBeenCalledTimes(1)

		stop()

		source.value = false
		await nextTick()

		source.value = true
		await nextTick()

		expect(cb).toHaveBeenCalledTimes(1)
	})

	test('immediate + once only fires once', async () => {
		const source = ref(true)
		const cb = vi.fn()

		whenever(source, cb, { immediate: true, once: true })

		source.value = false
		source.value = true
		await nextTick()

		expect(cb).toHaveBeenCalledTimes(1)
	})

	test('once prevents multiple calls in same tick', async () => {
		const source = ref(false)
		const cb = vi.fn()

		whenever(source, cb, { once: true })

		source.value = true
		source.value = false
		source.value = true

		await nextTick()

		expect(cb).toHaveBeenCalledTimes(1)
	})

	test('passes onCleanup to callback', async () => {
		const source = ref(false)
		const cleanup = vi.fn()
		const cb = vi.fn(onCleanup => {
			onCleanup(cleanup)
		})

		whenever(source, cb)

		source.value = true
		await nextTick()

		source.value = false
		await nextTick()

		expect(cleanup).toHaveBeenCalledTimes(1)
	})

	test('cleanup runs when stopped', async () => {
		const source = ref(false)
		const cleanup = vi.fn()

		const stop = whenever(source, onCleanup => {
			onCleanup(cleanup)
		})

		source.value = true
		await nextTick()

		stop()

		expect(cleanup).toHaveBeenCalledTimes(1)
	})

	test('does not call callback on repeated false updates', async () => {
		const source = ref(false)
		const cb = vi.fn()

		whenever(source, cb)

		source.value = false
		await nextTick()

		source.value = false
		await nextTick()

		expect(cb).not.toHaveBeenCalled()

		source.value = true
		await nextTick()
		expect(cb).toHaveBeenCalledTimes(1)
	})
})
