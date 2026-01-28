import { computed, MaybeRefOrGetter, Ref } from 'vue'
import { min } from '@/min'
import { max } from '@/max'

export function one(
	...values: MaybeRefOrGetter<boolean>[]
): Readonly<Ref<boolean>> {
	const mn = min(1, ...values),
		mx = max(1, ...values)
	return computed(() => mx.value && mn.value)
}
