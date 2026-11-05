import {useRoleStore} from "@/stores";

class AppUtilsClass {

	formatDateTime = (
		input: string | number,
		withTime: boolean = true
	): string => {
		if (input === null || input === undefined || input === "") return "";

		let date: Date;

		if (typeof input === "number" || /^\d+$/.test(String(input))) {
			const ts = Number(input);
			date = new Date(ts < 1e12 ? ts * 1000 : ts);
		} else {
			date = new Date(input);
		}

		if (isNaN(date.getTime())) return "";

		const pad = (n: number) => String(n).padStart(2, "0");

		const YY = String(date.getFullYear()).slice(-2);
		const MM = pad(date.getMonth() + 1);
		const DD = pad(date.getDate());
		const HH = pad(date.getHours());
		const mm = pad(date.getMinutes());
		const ss = pad(date.getSeconds());

		return withTime ? `${DD}/${MM}/${YY} ${HH}:${mm}:${ss}` : `${DD}/${MM}/${YY}`;
	};


	hasRolePerm = (key: any) => {
		const roleStore: any = useRoleStore();
		return roleStore.role_perms_list.includes(key);
	}


	formatReadCount(num: number) {
		if (num < 1000) return String(num);

		if (num < 10000) {
			const k = (num / 1000).toFixed(1);
			return k.endsWith('.0') ? k.slice(0, -2) + 'k' : k + 'k';
		}

		const w = (num / 10000).toFixed(1);
		return w.endsWith('.0') ? w.slice(0, -2) + 'w' : w + 'w';
	}


}

const appUtils = new AppUtilsClass();

export const formatDateTime = appUtils.formatDateTime.bind(appUtils);
export const hasRolePerm = appUtils.hasRolePerm.bind(appUtils);
export const formatReadCount = appUtils.formatReadCount.bind(appUtils);

export default appUtils;
