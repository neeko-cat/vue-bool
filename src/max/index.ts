import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function max(
	max: MaybeRefOrGetter<number>,
	...values: MaybeRefOrGetter<boolean>[]
): Readonly<Ref<boolean>> {
	return computed(() => {
		const target = toValue(max)
		let current = 0
		for (const value of values)
			if(toValue(value))
				if(++current > target)
					return false
		return true
	})
}
