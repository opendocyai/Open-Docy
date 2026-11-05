import type { DbSchema } from "@/shared";

export const dbSchema: DbSchema = {
  user: "key,username",
  auth_user: "++id,username,token,email",
  agent: "++id,display_type",
  limits: "id,active_key",
  usage: "id,active_key",
  policy: "id,policy_id,is_player",
};
