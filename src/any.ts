import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function any(...values: MaybeRefOrGetter<boolean>[]): Readonly<Ref<boolean>> {
	return computed(() => {
		for (const value of values)
			if(toValue(value)) return true
		return false
	})
}
