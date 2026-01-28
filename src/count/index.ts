import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function count(...values: MaybeRefOrGetter<boolean>[]): Readonly<Ref<number>> {
	return computed(() => {
		let total = 0
		for (const value of values)
			if(toValue(value)) total++
		return total
	})
}
