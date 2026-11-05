import type {
  PdfManager,
  PdfStateImpl,
  PdfComputed,
  PdfMethods,
  PdfHandlers,
} from "@/shared";

export type PdfManagerType = InstanceType<typeof PdfManager>;
export type PdfStateType = InstanceType<typeof PdfStateImpl>;
export type PdfComputedType = InstanceType<typeof PdfComputed>;
export type PdfMethodsType = InstanceType<typeof PdfMethods>;
export type PdfHandlersType = InstanceType<typeof PdfHandlers>;
