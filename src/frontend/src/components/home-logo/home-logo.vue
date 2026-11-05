<script lang="ts" setup>
defineOptions({
  name: "HomeLogo",
});

import { useRouter } from 'vue-router'

import { useMainStore } from '@/stores'

const mainStore = useMainStore()

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
  <div class="home-logo" @click="toWhere">
    <img src="@/assets/images/logo.svg" alt="" class="logo-icon" />
  </div>
</template>

<style src="./home-logo.scss" scoped lang="scss"></style>
