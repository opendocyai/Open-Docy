<script setup lang="ts">
import { SplineViewer, HomeLogo } from "@/components";
import { useRoute, useRouter } from "vue-router";
import { useMainStore, useSpaceStore } from "@/stores";
import { useTemplateRef, ref, reactive, nextTick, onMounted } from "vue";

import { useHttp } from "@/client";
import { useApiAuth } from "@/api";
import to from "await-to-js";

import { debounce, cloneDeep } from "lodash";

import {
  capitalLetter,
  lowercaseLetter,
  figure,
  email,
  decrypt,
  encrypt,
  base64DAes,
} from "@/utils";

import { Form, FormItem, Input, InputPassword, Button, Switch } from "ant-design-vue";

definePage({
  meta: {
    layout: "custom",
    title: "Login",
    auth: false,
  },
});

const { request } = useHttp();

const route = useRoute();
const router = useRouter();
const mainStore = useMainStore();
const spaceStore = useSpaceStore();

const redirect = ref<any>(route.query?.redirect);

const ruleFormRef = useTemplateRef<HTMLFormElement>("ruleFormRef");

const isAccountExists = ref<boolean>(false);
const key = ref<string>("");

const loading = ref<boolean>(false);

const form = ref<any>({
  email: undefined,
  password: undefined,
  rememberMe: false,
});

const cachedPassword = ref<string>("");

const validateName = async (_rule: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("The email is required"));
  } else if (!email(value)) {
    return Promise.reject(new Error("Please enter a valid email address."));
  } else {
    return Promise.resolve();
  }
};

const validatePass = async (_rule: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("The password is required"));
  } else if (value.length < 8) {
    return Promise.reject(new Error("Password must be at least 8 characters in length"));
  } else if (!(capitalLetter(value) || lowercaseLetter(value))) {
    return Promise.reject(new Error("Password must include both letters and numbers."));
  } else if (!figure(value)) {
    return Promise.reject(new Error("Password must include both letters and numbers."));
  } else {
    return Promise.resolve();
  }
};

const rules = reactive<any>({
  email: [{ required: true, validator: validateName, trigger: "blur" }],
  password: [{ required: true, validator: validatePass, trigger: "blur" }],
});

const refreshKeyData = async () => {
  const [err, res] = await to<any>(
    request(useApiAuth("secret_key"), {
      config: {
        isAuth: false,
      },
    })
  );

  if (err) return;
  console.log("🚀 ~ refreshKeyData ~ res: ", res);
  if (res) {
    const keyCode = decrypt(res?.content, base64DAes(res?.key));
    key.value = base64DAes(keyCode);
    console.log("🚀 ~  ~ key.value: ", key.value);
  }
};


const onSubmit = debounce(async () => {
  try {
    await ruleFormRef.value?.validate();
    await verifyEmail();
  } catch (error) {
    console.log("🚀 ~  ~ error: ", error);
  }
}, 500);

const verifyEmail = async () => {
  loading.value = true;
  const [err, res] = await to<any>(
    request(useApiAuth("email_exist"), {
      data: {
        email: form.value.email,
      },
      config: {
        isAuth: false,
      },
    })
  );
  loading.value = false;
  if (err) return;
  console.log("🚀 ~ verifyEmail ~ res: ", res);
  if (res?.code == 200) {
    if (res.data.exist) {
      if (form.value.password) {
        await getLogin();
      } else if (cachedPassword.value) {
        isAccountExists.value = true;
        if (!key.value) await refreshKeyData();
        form.value.password = decrypt(cachedPassword.value, key.value);
      } else {
        isAccountExists.value = true;
        form.value.password = undefined;
      }
    } else {
      router.replace(`/sign-up?email=${form.value.email}`);
    }
  }
};

const getLogin = async () => {
  if (!key.value) await refreshKeyData();
  loading.value = true;
  const password = encrypt(form.value.password, key.value);
  const [err, res] = await _setLogin<{ data: any; code: number }>({
    password: password,
    username: form.value.email,
  });
  loading.value = false;
  if (err) return;
  if (res?.code == 200) {
    await loginOk(res?.data, { ...cloneDeep(form.value) });
  }
};

const _setLogin = <T>(data: any) => {
  const searchParams = new URLSearchParams();
  searchParams.append("username", data.username);
  searchParams.append("password", data.password);
  return to<T>(
    request(useApiAuth("login"), {
      data: searchParams,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      config: {
        isAuth: false,
      },
    })
  );
};

const loginOk = async (data: any, loginForm: any) => {
  mainStore.SET_LOGIN_STATUS(true);
  mainStore.SET_TOKEN(data.access_token);
  mainStore.SET_REFRESH(data.refresh_token);
  mainStore.SET_TOKEN_TYPE(data.token_type);
  mainStore.SET_FIRST_LOGIN(data.first_login);

  if (!loginForm.isGoogle) {
    if (loginForm.rememberMe) {
      const encryptedEmail = encrypt(loginForm.email, key.value);
      const encryptedPassword = encrypt(loginForm.password, key.value);
      mainStore.SET_LOGIN_FORM({
        email: encryptedEmail,
        password: encryptedPassword,
      });
    } else {
      mainStore.SET_LOGIN_FORM();
    }
  }

  await spaceStore.GET_SPACE_LIST();
  await mainStore.GET_USER_INFO();

  await nextTick();
  form.value.email = undefined;
  form.value.password = undefined;

  router.replace(redirect.value ? decodeURIComponent(redirect.value) : "/");
};

const handelRememberMe = async () => {
  if (!key.value) await refreshKeyData();
  if (route.query.email) {
    form.value.email = route.query.email;
  } else if (!form.value.email && key.value) {
    const loginForm: any = mainStore.loginForm;
    if (!loginForm?.email || !loginForm?.password) return;

    const { email, password } = loginForm;

    form.value.email = decrypt(email, key.value);
    form.value.password = decrypt(password, key.value);
    form.value.rememberMe = true;
    isAccountExists.value = true;
  }
};

onMounted(() => {
  handelRememberMe();
});
</script>

<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="relative flex flex-col items-center justify-center login-main-wrap">
      <div class="login-top">
        <home-logo />
      </div>
      <div class="login-form">
        <Form ref="ruleFormRef" :model="form" :rules="rules" layout="vertical">
          <div class="login-form-info">
            <div class="login-form-info-title">
              Your ideas,<br />
              amplified
            </div>
            <div class="login-form-info-desc">
              Privacy-first AI that helps you create in confidence.
            </div>
          </div>

          <form-item label="Email" name="email">
            <Input
              v-model:value="form.email"
              placeholder="Your email"
              :maxlength="254"
              autocomplete="new-email"
            />
          </form-item>
          <form-item label="" name="password" v-if="isAccountExists">
            <input-password
              v-model:value="form.password"
              type="password"
              show-password
              placeholder="Please enter the password"
              :maxlength="128"
              autocomplete="new-password"
            />
          </form-item>
          <div
            v-if="isAccountExists"
            class="flex justify-between items-center flex-1 font-[Inter] fw-400 mb-[12px]"
          >
            <div class="flex items-center gap-[5px] text-[14px] c-[#2D3748]">
              <Switch
                v-model:checked="form.rememberMe"
                size="small"
                class="w-[36px] h-[18px]"
              />
              Remember me
            </div>
            <div class="forgot-password">Forgot Password</div>
          </div>
          <form-item>
            <Button class="login-btn" type="primary" :loading="loading" @click="onSubmit">
              Continue
            </Button>
          </form-item>
        </Form>
        <div class="privacy-policy">
          By continuing, you agree to Docy AI's
          <a href="https://docyai.com/terms-conditions/" target="_blank"
            >Terms & Conditions</a
          >
          and acknowledge the
          <a href="https://docyai.com/privacy-policy/" target="_blank">Privacy Policy</a>.
        </div>
      </div>
    </div>
    <div class="w-full h-full overflow-hidden spline-viewer-wrap">
      <spline-viewer />
    </div>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
