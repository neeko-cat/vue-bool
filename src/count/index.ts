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
