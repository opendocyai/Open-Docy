import {defineComponent, ref} from 'vue'

import { useScroll } from '@/composables'

interface ScrollProps {
	click?: boolean
	scrollX?: boolean
	scrollY?: boolean
	probeType?: number
	preventDefault?: boolean
	disableMouse?: boolean
	disableTouch?: boolean
}

export default defineComponent({
	name: "BaseScroll",
	props: {
		click: { type: Boolean, default: true },
		scrollX: { type: Boolean, default: false },
		scrollY: { type: Boolean, default: true },
		probeType: { type: Number, default: 0 },
		preventDefault: { type: Boolean, default: true },
		disableMouse: { type: Boolean, default: false },
		disableTouch: { type: Boolean, default: false },
	},
	emits: ['scroll'],
	setup(props: Readonly<ScrollProps>, { emit, slots, expose } ) {
		const rootRef = ref<HTMLDivElement | null>(null)

		const scroll = useScroll(rootRef, props, emit)

		expose({ rootRef, scroll })

		return () => (
			<div ref={rootRef} class="overflow-hidden h-full relative">
				{slots.default?.()}
			</div>
		)
	}
})
