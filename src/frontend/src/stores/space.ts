import { defineStore, acceptHMRUpdate } from "pinia";
import {useHttp} from '@/client'
import {useApiSpace} from '@/api'
import to from 'await-to-js'

export const useSpaceStore = defineStore("space", {
  state: () => ({
    spaceInfoList: undefined as any,
    spaceInfoCurrent: undefined as any,
    ownedTeamSpaceCount: 0,
  }),
  actions: {
    SET_USER_SPACE_LIST(info: any = undefined) {
      this.spaceInfoList = info;
    },
    SET_USER_SPACE_CURRENT(info: any = undefined) {
      this.spaceInfoCurrent = info;
    },
    SET_USER_OWNED_SPACE_COUNT(num: number = 0) {
      this.ownedTeamSpaceCount = num;
    },
    async GET_SPACE_LIST() {
      const {request} = useHttp()
      const [err, res] = await to<any>(
      	request(useApiSpace('get_space_list'))
      )
      if (!err && res?.code == 200) {
      	const spaceData = res.data;
      	this.SET_USER_SPACE_LIST(spaceData)
      	const { personal_workspace = [], team_workspace = [] } = spaceData;
      	const allSpaces = [...personal_workspace, ...team_workspace];
      	const currentSpace = this.spaceInfoCurrent;
      	const nextSpace =
      		currentSpace?.id && allSpaces.some(item => item.id === currentSpace.id)
      			? currentSpace
      			: allSpaces[0];
      	this.SET_USER_SPACE_CURRENT(nextSpace);
      }
      return [err, res]
    },
    SET_CLEAN_USER_SPACE() {
      this.SET_USER_SPACE_LIST();
      this.SET_USER_SPACE_CURRENT();
      this.SET_USER_OWNED_SPACE_COUNT();
    },
  },
  persist: {
    key: "docy-ai-node_space",
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpaceStore, import.meta.hot));
}
