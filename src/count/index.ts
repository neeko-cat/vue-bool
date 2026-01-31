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

import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function count(
	...sources: MaybeRefOrGetter<boolean>[]
): Readonly<Ref<number>> {
	return computed(() => {
		let value = 0
		for (const source of sources) if (toValue(source)) value++
		return value
	})
}
