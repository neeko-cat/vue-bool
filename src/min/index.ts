import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function min(
	min: MaybeRefOrGetter<number>,
	...values: MaybeRefOrGetter<boolean>[]
): Readonly<Ref<boolean>> {
	return computed(() => {
		let needed = toValue(min)
		if (needed === 0) return true
		for (const value of values)
			if (toValue(value)) if (--needed <= 0) return true
		return false
	})
}
