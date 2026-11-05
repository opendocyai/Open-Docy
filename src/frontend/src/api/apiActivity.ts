import {useApiProxy} from "@/utils";
import type {ApiMap} from "@/shared";

const prefix: string = '/v1/activity'

export const useApiActivity = (name?: string) => {
  const api: ApiMap = {
    create_activity: () => ({ method: "post", url: `${prefix}/add` }),
    get_input_nodes: (id: string) => ({ method: "get", url: `${prefix}/${id}/input/nodes` }),
    get_input_nodes_by_agent: () => ({ method: "get", url: `${prefix}/agent-input/nodes` }),
    get_manual_nodes: (id: string) => ({ method: "get", url: `${prefix}/${id}/manual/node` }),
    get_node_before_manual: (id: string) => ({ method: "get", url: `${prefix}/${id}/node/before/manual` }),
    save_input_nodes: (id: string) => ({ method: "post", url: `${prefix}/${id}/input/save` }),
    save_manual_input_nodes: (id: string) => ({ method: "post", url: `${prefix}/${id}/manual-input/save` }),

    get_activity_list: () => ({ method: "get", url: `${prefix}/list` }),
    get_activity_state: () => ({ method: "get", url: `${prefix}/state` }),
    share_link: () => ({ method: "post", url: `${prefix}/share/upload-file/link` }),
    share_link_parse: () => ({ method: "get", url: `${prefix}/share/link/parse` }),
    send_email: () => ({ method: "post", url: `${prefix}/share/link/send-by-email` }),
    change_agent: (id: string) => ({ method: "post", url: `${prefix}/${id}/change/agent` }),

    get_activity_detail: (id: string) => ({ method: "get", url: `${prefix}/${id}/detail` }),
    update_activity: (id: string) => ({ method: "post", url: `${prefix}/${id}/update` }),
    delete_activity: (id: string) => ({ method: "delete", url: `${prefix}/${id}/delete` }),
    delete_activity_multiple: () => ({ method: "delete", url: `${prefix}/bulk-delete` }),

    run_activity: (id: string) => ({ method: "post", url: `${prefix}/${id}/run` }),
    cancel_activity: () => ({ method: "post", url: `${prefix}/run/cancel` }),
    update_status: (id: string) => ({ method: "post", url: `${prefix}/${id}/update-status` }),
    run_activity_after_action: (id: string) => ({ method: "post", url: `${prefix}/${id}/run/after-action` }),
    view_log: () => ({ method: "get", url: `${prefix}/log/view` }),

    get_results_audit: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/audit` }),
    get_results_show_map_audit: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/show-map/audit` }),
    get_results_extract: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/extract` }),
    get_results_show_map_extract: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/show-map/extract` }),
    get_results_files_generate: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/files/generate` }),
    get_results_files_map: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/files/map` }),
    generated_download_all: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/files-generated/download` }),


    get_results_extract_groups: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/extract-groups` }),

    get_results_extract_by_group: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/extract-by-group` }),

    get_results_extract_map_group_extract: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/show-map-group/extract` }),


	  get_results_extract_download_all: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/extract-table/download` }),
    get_results_generated_download_all: (id: string) => ({ method: "get", url: `${prefix}/${id}/results/files-generated/download` }),

  };


  return useApiProxy(api, name)
};

