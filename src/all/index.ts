import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function all(...values: MaybeRefOrGetter<boolean>[]): Readonly<Ref<boolean>> {
	return computed(() => {
		for (const value of values)
			if(!toValue(value)) return false
		return true
	})
}
