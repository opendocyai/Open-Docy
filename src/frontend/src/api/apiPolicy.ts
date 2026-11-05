import type { ApiMap } from "@/shared/types";
import { useApiProxy } from "@/utils";

const prefix: string = "/v1/policy";
export function useApiPolicy(name?: string) {
  const api: ApiMap = {
    list: () => ({ method: "get", url: `${prefix}/list` }),
    option_list: () => ({ method: "get", url: `${prefix}/option/list` }),
    versions: (id: any) => ({ method: "get", url: `${prefix}/${id}/versions` }),
    create: () => ({ method: "post", url: `${prefix}/create` }),
    edit: (id: any) => ({ method: "put", url: `${prefix}/${id}` }),
    detail: (id: any) => ({ method: "get", url: `${prefix}/${id}` }),
    delete: (id: any) => ({ method: "delete", url: `${prefix}/${id}` }),
    bulk_delete: () => ({ method: "post", url: `${prefix}/bulk-delete` }),
    files_list: () => ({ method: "get", url: `${prefix}/files/list` }),
    files_option_list: () => ({
      method: "get",
      url: `${prefix}/files/option/list`,
    }),
    files_upload: () => ({ method: "post", url: `${prefix}/files/upload` }),
    files_edit: (id: any) => ({ method: "put", url: `${prefix}/files/${id}` }),
    files_delete: (id: any) => ({
      method: "delete",
      url: `${prefix}/files/${id}`,
    }),
    files_batch_delete: () => ({
      method: "post",
      url: `${prefix}/files/batch/delete`,
    }),
    rules_list: (id: any) => ({
      method: "get",
      url: `${prefix}/versions/${id}/rules/list`,
    }),
    rules_extract: (id: any) => ({
      method: "post",
      url: `${prefix}/versions/${id}/rules/extract`,
    }),
    rules_confirm: (id: any) => ({
      method: "post",
      url: `${prefix}/versions/${id}/rules/confirm`,
    }),
    rules_manual: (id: any) => ({
      method: "post",
      url: `${prefix}/versions/${id}/rules/manual`,
    }),
    extract_log_cancel: (id: any) => ({
      method: "post",
      url: `${prefix}/extract-log/${id}/cancel`,
    }),
    versions_submit: (id: any) => ({
      method: "post",
      url: `${prefix}/versions/${id}/submit`,
    }),
    versions_detail: (id: any) => ({
      method: "get",
      url: `${prefix}/versions/${id}`,
    }),
    versions_delete: (id: any) => ({
      method: "delete",
      url: `${prefix}/versions/${id}`,
    }),
    versions_copy: (id: any) => ({
      method: "post",
      url: `${prefix}/versions/${id}/copy`,
    }),
    versions_rules_edit: (id: any, rule_id: any) => ({
      method: "put",
      url: `${prefix}/versions/${id}/rules/${rule_id}`,
    }),
    versions_rules_delete: (id: any, rule_id: any) => ({
      method: "delete",
      url: `${prefix}/versions/${id}/rules/${rule_id}`,
    }),
    versions_rules_batch_delete: (version_id: any) => ({
      method: "post",
      url: `${prefix}/versions/${version_id}/rules/batch/delete`,
    }),
    files_batch_download: () => ({
      method: "post",
      url: `${prefix}/files/batch/download`,
    }),
  };

  return useApiProxy(api, name);
}
