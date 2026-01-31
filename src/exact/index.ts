import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function exact(
	target: MaybeRefOrGetter<number>,
	...sources: MaybeRefOrGetter<boolean>[]
): Readonly<Ref<boolean>> {
	return computed(() => {
		let value = toValue(target)

		for (const source of sources)
			if (toValue(source)) if (--value < 0) return false

		return value === 0
	})
}
