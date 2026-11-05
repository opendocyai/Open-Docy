<script setup lang="ts">
definePage({
  meta: {
    name: "team-inviter",
    layout: "custom",
    auth: false,
  }
});

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HomeLogo } from '@/components'
import { Button } from 'ant-design-vue'

import { useHttp } from '@/client'
import { useApiSpace } from '@/api'
import to from 'await-to-js'

const acceptLoading = ref<boolean>(false);
const ignoreLoading = ref<boolean>(false);
const targetParams = ref<any>()

const route = useRoute();
const router = useRouter()

const { request } = useHttp();

function checkOwnedTeamCount() {
  router.push(`/dashboard`);
}

async function onHandleInvite(handle_type: any) {
  if (handle_type === "accept") {
    acceptLoading.value = true;
  } else {
    ignoreLoading.value = true;
  }
  const params = {
    action: handle_type,
    invite_code: route.query?.invite_code,
    invite_id: route.query?.invite_id || undefined
  };

  const [error, res] = await to<{
    data: any;
    code: number;
  }>(
    request(useApiSpace("team_invite"),
      {
        data: params,
        config: { isAuth: false, isParams: true }
      })
  );
  acceptLoading.value = false;
  ignoreLoading.value = false;
  if (error) return
  if (res?.code == 200) {
    checkOwnedTeamCount();
  }
}

function parseQueryString(str: string) {
  return Object.fromEntries(new URLSearchParams(str))
}

onMounted(() => {
  const targetCode = route.query.target_code as string
  if (targetCode) {
    const decodedTargetCode = decodeURIComponent(targetCode)
    const base64Decoded = atob(decodedTargetCode)
    targetParams.value = parseQueryString(base64Decoded)
  }
})

</script>

<template>
  <div class="w-full h-full flex flex-wrap forget-password">
    <div class="w-full relative flex flex-col items-center justify-center">
      <div class="top-logo">
        <home-logo />
      </div>
      <div class="login__form">
        <div class="login__form--info">
          <img src="@/assets/images/team-inviter.svg" alt="" class="my-[60px]" />
          <div class="login__form--info--title">
            {{ targetParams?.inviter_name }} has invited you to join the
          </div>
          <div class="login__form--info--desc">
            {{ targetParams?.teamspace_name }}
          </div>
          <div class="login__form--info--title">
            Teamspace on
            <a href="https://docyai.com/" target="_blank" rel="noopener noreferrer"
              style="color: #000000; text-decoration: underline">Docy AI.</a>
          </div>
        </div>
        <div class="btn-wrap">
          <Button class="login-btn accept-btn" type="primary" :disabled="ignoreLoading" :loading="acceptLoading"
            @click="onHandleInvite('accept')">Accept Invitation</Button>
          <Button class="login-btn ignore-btn" type="text" :disabled="acceptLoading" :loading="ignoreLoading"
            @click="onHandleInvite('ignore')">Ignore Invitation</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
