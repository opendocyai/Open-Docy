<script setup lang="ts">
defineOptions({
	name: 'LogoAside',
})

import { useRouter } from 'vue-router'

import { useMainStore, useAsideStore } from '@/stores';

const mainStore = useMainStore()
const asideStore = useAsideStore();

const router = useRouter();

function toWhere() {
	if (mainStore.isLogin) {
		router.push('/dashboard');
	} else {
		router.push('/login');
	}
}

</script>

<template>
	<div class="aside-logo" @click="toWhere">
		<img src="@/assets/images/logo-icon.svg" alt="" class="logo-text" v-if="asideStore.collapsed" />
		<img src="@/assets/images/logo.svg" alt="" class="logo-icon" v-else />
	</div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
