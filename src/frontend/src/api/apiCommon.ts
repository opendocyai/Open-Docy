import type { ApiMap } from '@/shared/types'
import {useApiProxy} from '@/utils';

const prefix: string = '/v1/common'
export const useApiCommon = (name?: string) => {

  const api: ApiMap = {
    sse_stream: () => ({ method: "get", url: `${prefix}/sse/stream` }),
    sse_push: () => ({ method: "post", url: `${prefix}/sse/push` }),
    email_sample: () => ({ method: "get", url: `${prefix}/activity/email/sample` }),
    get_common_key: () => ({ method: "get", url: `${prefix}/common-key` }),
    get_signature: () => ({ method: "get", url: `${prefix}/signature` }),
    get_marketplace_class: () => ({ method: "get", url: `${prefix}/marketplace/template/classes` }),
    get_settings: () => ({ method: "get", url: `${prefix}/settings` }),
    get_nodes_suported: () => ({method: "get", url: `${prefix}/nodes/suported`})
  }


  return useApiProxy(api, name)
}
