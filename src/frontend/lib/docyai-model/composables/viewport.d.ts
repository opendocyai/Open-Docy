declare const breakpoints: any;
export declare function useViewport(): {
    breakpoint: import('vue').ComputedRef<any>;
    isGreaterThan(name: keyof typeof breakpoints.breakpoints.value): any;
    isLessThan(name: keyof typeof breakpoints.breakpoints.value): any;
    isGreaterOrEqual(name: keyof typeof breakpoints.breakpoints.value): any;
    isLessOrEqual(name: keyof typeof breakpoints.breakpoints.value): any;
};
export {};
