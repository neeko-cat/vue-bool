import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function min(
	min: MaybeRefOrGetter<number>,
	...sources: MaybeRefOrGetter<boolean>[]
): Readonly<Ref<boolean>> {
	return computed(() => {
		let needed = toValue(min)
		if (needed === 0) return true
		for (const source of sources)
			if (toValue(source)) if (--needed <= 0) return true
		return false
	})
}
