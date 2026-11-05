import type { ApiMap } from '@/shared'
import {useApiProxy} from '@/utils';

const prefix: string = '/v1/agent'
export const useApiAgent = (name?: string) => {
  const api: ApiMap = {
    pre_add_agent: () => ({ method: "post", url: `${prefix}/pre/add` }),
    pre_update_agent: () => ({ method: "post", url: `${prefix}/pre/update` }),
    code_id_template: (id: string) => ({ method: "get", url: `${prefix}/code/${id}/template` }),
    pre_run_agent: () => ({ method: "post", url: `${prefix}/pre/run` }),
    pre_state_agent: () => ({ method: "get", url: `${prefix}/pre/run/state` }),



    add_or_update_agent: () => ({ method: "post", url: `${prefix}/add-or-update` }),
    get_agent_list: () => ({ method: "get", url: `${prefix}/list` }),
    get_agent_detail: (id: string) => ({ method: "get", url: `${prefix}/${id}/detail` }),
    update_agent: (id: string) => ({ method: "put", url: `${prefix}/${id}` }),
    delete_agent: (id: string) => ({ method: "delete", url: `${prefix}/${id}/delete` }),
    delete_agent_multiple: () => ({ method: "delete", url: `${prefix}/bulk-delete` }),
    get_marketplace_list: () => ({ method: "get", url: `${prefix}/marketplace/templates` }),
    marketplace_publish: () => ({ method: "post", url: `${prefix}/marketplace/publish` }),
    marketplace_un_published: (id: string) => ({ method: "delete", url: `${prefix}/${id}/un-published` }),
    marketplace_share_link: (id: string) => ({ method: "get", url: `${prefix}/marketplace/template/${id}/share_link` }),



    pre_data_extractor_control: () => ({ method: "post", url: `${prefix}/pre/data-extractor/control` }),

    pre_code_data_extractor_addition: (id: string) => ({ method: "get", url: `${prefix}/pre/code/${id}/data-extractor/addition` }),
    pre_data_extractor_manual_input_set: () => ({ method: "post", url: `${prefix}/pre/data-extractor/manual-input/set` }),



    pre_code_id_delete_data_extractor: (id: string) => ({ method: "delete", url: `${prefix}/pre/code/${id}/delete-data-extractor` }),


    find_neighboring_node: () => ({ method: "get", url: `${prefix}/find/neighboring/node` }),
    marketplace_template_detail: (id: string) => ({ method: "get", url: `${prefix}/marketplace/template/${id}/detail` }),
    marketplace_template_copy: () => ({ method: "post", url: `${prefix}/marketplace/template/copy` }),


    task_run_cancel: () => ({ method: "post", url: `${prefix}/task/run/cancel` }),

    marketplace_before_published: () => ({ method: "post", url: `${prefix}/marketplace/before/published` }),


    set_agent_id_restore: (id: string) => ({ method: "post", url: `${prefix}/${id}/restore` }),

    draft_save: () => ({ method: "post", url: `${prefix}/draft/save` }),

  };

  return useApiProxy(api, name)
};


