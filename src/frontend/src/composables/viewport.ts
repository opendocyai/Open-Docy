import { useBreakpoints } from "@vueuse/core";

import { computed } from "vue";

const breakpoints: any = useBreakpoints({
  mobile: 0,
  mobileWide: 576,
  tablet: 768,
  desktop: 1024,
  desktopWide: 1280,
});

export function useViewport() {
  const breakpoint = computed(() => breakpoints.active().value);

  return {
    breakpoint,

    isGreaterThan(name: keyof typeof breakpoints.breakpoints.value) {
      return breakpoints.greater(name);
    },

    isLessThan(name: keyof typeof breakpoints.breakpoints.value) {
      return breakpoints.smaller(name);
    },

    isGreaterOrEqual(name: keyof typeof breakpoints.breakpoints.value) {
      return breakpoints.greaterOrEqual(name);
    },

    isLessOrEqual(name: keyof typeof breakpoints.breakpoints.value) {
      return breakpoints.smallerOrEqual(name);
    },
  };
}
