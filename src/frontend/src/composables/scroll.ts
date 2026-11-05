import {ref, onMounted, onUnmounted, onActivated, onDeactivated} from 'vue'

let BScrollClass: any = null
let installed = false

async function getBScroll() {
  if (BScrollClass) {
    return BScrollClass
  }
  const BScrollModule = await import('@better-scroll/core')
  const ObserveDOMModule = await import('@better-scroll/observe-dom')
  const MouseWheelModule = await import('@better-scroll/mouse-wheel')
  const ObserveImageModule = await import('@better-scroll/observe-image')
  const ScrollBarModule = await import('@better-scroll/scroll-bar')
  const SlideModule = await import('@better-scroll/slide')

  const BScroll =
    (BScrollModule as any).default ||
    (BScrollModule as any).BScroll ||
    BScrollModule

  const ObserveDOM =
    (ObserveDOMModule as any).default || ObserveDOMModule

  const MouseWheel =
    (MouseWheelModule as any).default || MouseWheelModule

  const ObserveImage =
    (ObserveImageModule as any).default || ObserveImageModule

  const ScrollBar =
    (ScrollBarModule as any).default || ScrollBarModule

  const Slide =
    (SlideModule as any).default || SlideModule

  if (!installed) {
    BScroll.use(ObserveDOM)
    BScroll.use(MouseWheel)
    BScroll.use(ObserveImage)
    BScroll.use(ScrollBar)
    BScroll.use(Slide)

    installed = true
  }

  BScrollClass = BScroll

  return BScroll
}

export function useScroll(wrapperRef: any, options: any = {}, emit?: any) {
  const scroll: any = ref(null);

  onMounted(async () => {
    if (!wrapperRef.value) return

    const BScroll = await getBScroll()

    scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      mouseWheel: true,
      observeImage: true,
      scrollbar: false,
      ...options,
    })


    if (options.probeType > 0 && emit) {
      scroll.value.on("scroll", (pos: any) => {
        emit("scroll", pos);
      });
    }

    scroll.value.scrollToBottom = () => {
      scroll.value.refresh();
      scroll.value.scrollTo(0, scroll.value.maxScrollY, 500);
    };
  })

  onUnmounted(() => {
    scroll.value?.destroy();
  });

  onActivated(() => {
    scroll.value?.enable();
    scroll.value?.refresh();
  });

  onDeactivated(() => {
    scroll.value?.disable();
  });

  return scroll
}
