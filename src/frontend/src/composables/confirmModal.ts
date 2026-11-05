import { Modal } from "ant-design-vue";
import { h, type VNode } from "vue";

import alertIcon from "@/assets/icons/warning.svg";

export interface ConfirmModalOptions {
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  closable?: boolean;
  onOk?: () => Promise<void> | void;
  onCancel?: () => void;
}

function renderConfirmContent(title: string, content: string): VNode {
  return h("div", { class: "confirm-modal-content-wrapper" }, [
    h("img", {
      src: alertIcon,
      style: {
        width: "40px",
        height: "40px",
        marginBottom: "16px",
      },
    }),
    h("div", { class: "confirm-modal-title" }, title),
    h("div", { class: "confirm-modal-content" }, [
      h("span", content),
      h("br"),
      h("span", "This action cannot be undone."),
    ]),
  ]);
}

export function useConfirmModal() {
  function showConfirmModal(options: ConfirmModalOptions): Promise<boolean> {
    const { promise, resolve } = Promise.withResolvers<boolean>();
    const {
      title = "",
      content = "",
      okText = "Delete",
      cancelText = "Cancel",
      closable = false,
      onOk,
      onCancel,
    } = options;

    Modal.confirm({
      icon: null,
      content: renderConfirmContent(title, content),
      closable,
      class: "confirm-confirm-modal",
      centered: true,
      okText,
      cancelText,
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        await onOk?.();
        resolve(true);
      },
      onCancel: () => {
        onCancel?.();
        resolve(false);
      },
    });

    return promise;
  }

  return {
    showConfirm: showConfirmModal,
  };
}
