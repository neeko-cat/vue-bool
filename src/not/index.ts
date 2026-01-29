import { computed, MaybeRefOrGetter, Ref, toValue } from 'vue'

export function not(source: MaybeRefOrGetter<boolean>): Readonly<Ref<boolean>> {
	return computed(() => !toValue(source))
}
