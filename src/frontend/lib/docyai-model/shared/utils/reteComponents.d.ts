declare class ReteComponents {
    sortByIndex(entries: any): any;
    nodeStyles(data: any): {
        width: string;
        height: string;
    };
    inputs(data: any): any;
    controls(data: any): any;
    outputs(data: any): any;
}
export declare const reteComponents: ReteComponents;
export declare const sortByIndex: (entries: any) => any;
export declare const nodeStyles: (data: any) => {
    width: string;
    height: string;
};
export declare const inputs: (data: any) => any;
export declare const controls: (data: any) => any;
export declare const outputs: (data: any) => any;
export default reteComponents;
