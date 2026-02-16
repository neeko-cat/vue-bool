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

import {
	type WatchHandle,
	type WatchSource,
	type WatchCallback,
	watch,
	WatchOptions,
	nextTick,
} from 'vue'

export interface WheneverOptions extends WatchOptions<boolean> {
	once?: boolean
}

export type WheneverCallback = (onCleanup: Parameters<WatchCallback>[2]) => any

export function whenever(
	source: WatchSource<boolean>,
	cb: WheneverCallback,
	options: WheneverOptions = {},
): WatchHandle {
	const once = options?.once ?? false
	const stop = watch(
		source,
		(value, _old, onCleanup) => {
			if (value) {
				if (once) nextTick(() => stop())
				cb(onCleanup)
			}
		},
		{ ...options, once: false },
	)
	return stop
}
