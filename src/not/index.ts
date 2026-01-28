import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function not(value: MaybeRefOrGetter<boolean>): Readonly<Ref<boolean>> {
	return computed(() => !toValue(value))
}
