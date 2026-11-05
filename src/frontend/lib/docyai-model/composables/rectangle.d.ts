export declare const useRectangle: () => {
    calculateBoundary: (els: HTMLElement[]) => Promise<{
        x: number;
        y: number;
        width: number;
        height: number;
        maxX: number;
        maxY: number;
        tx: number;
        ty: number;
    }>;
    transformValues: (el: HTMLElement) => Promise<{
        x: any;
        y: any;
        scale: any;
    }>;
};
