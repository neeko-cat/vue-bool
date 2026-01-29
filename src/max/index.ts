import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function max(
	max: MaybeRefOrGetter<number>,
	...sources: MaybeRefOrGetter<boolean>[]
): Readonly<Ref<boolean>> {
	return computed(() => {
		const target = toValue(max)
		let current = 0
		for (const source of sources)
			if (toValue(source)) if (++current > target) return false
		return true
	})
}
