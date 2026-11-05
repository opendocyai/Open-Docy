import { ClassicPreset } from 'rete';
export declare abstract class BaseSocket extends ClassicPreset.Socket {
    abstract isCompatibleWith(socket: ClassicPreset.Socket): boolean;
}
export declare class FileSocket extends BaseSocket {
    constructor();
    isCompatibleWith(socket: ClassicPreset.Socket): boolean;
}
export declare class FieldSocket extends BaseSocket {
    constructor();
    isCompatibleWith(socket: ClassicPreset.Socket): boolean;
}
export declare class FieldFileSocket extends BaseSocket {
    constructor();
    isCompatibleWith(socket: ClassicPreset.Socket): boolean;
}
export declare class BooleanSocket extends BaseSocket {
    constructor();
    isCompatibleWith(socket: ClassicPreset.Socket): boolean;
}
export declare class LoopSocket extends BaseSocket {
    constructor();
    isCompatibleWith(socket: ClassicPreset.Socket): boolean;
}
export declare class DefaultSocket extends BaseSocket {
    constructor();
    isCompatibleWith(): boolean;
}
export declare class GroupFileSocket extends BaseSocket {
    constructor();
    isCompatibleWith(socket: ClassicPreset.Socket): boolean;
}
export declare const SocketTypeValue: Record<string, string>;
