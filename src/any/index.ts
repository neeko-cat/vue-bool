import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function any(
	...sources: MaybeRefOrGetter<boolean>[]
): Readonly<Ref<boolean>> {
	return computed(() => {
		for (const source of sources) if (toValue(source)) return true
		return false
	})
}
