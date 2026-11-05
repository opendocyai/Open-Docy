<script setup lang="ts">
import { useApiAuth } from '@/api';
import { useHttp } from '@/client';
import { base64DAes, capitalLetter, decrypt, encrypt, figure, lowercaseLetter } from '@/utils';
import { message } from 'ant-design-vue';
import { debounce } from 'lodash';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { LeftOutlined } from '@ant-design/icons-vue'

import { Form, FormItem, Input, InputPassword, Button } from 'ant-design-vue'

import { HomeLogo, SplineViewer } from '@/components'
import to from 'await-to-js';

definePage({
  meta: {
    layout: 'custom',
    title: 'Sign Up',
    auth: false
  }
})


const router = useRouter();
const route = useRoute();

const { request } = useHttp();

const ruleFormRef = ref<any>(null);

const loading = ref<boolean>(false);

const key = ref<string>("");

const form = reactive<any>({
  firstName: "",
  lastName: "",
  password: "",
});

const validatePass = async (_rule: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("The password is required"));
  } else if (value.length < 8) {
    return Promise.reject(
      new Error("Password must be at least 8 characters in length")
    );
  } else if (!(capitalLetter(value) || lowercaseLetter(value))) {
    return Promise.reject(
      new Error("Password must include both letters and numbers.")
    );
  } else if (!figure(value)) {
    return Promise.reject(
      new Error("Password must include both letters and numbers.")
    );
  } else {
    return Promise.resolve();
  }
};

const rules = reactive<any>({
  firstName: [
    { required: true, message: "The firstName is required", trigger: "blur" },
  ],
  lastName: [
    { required: true, message: "The lastName is required", trigger: "blur" },
  ],
  password: [{ required: true, validator: validatePass, trigger: "blur" }],
});

const backPage = () => {
  router.back();
};

const getKeyData = async () => {
  const [err, res] = await to<{ content: any; key: string }>(
    request(useApiAuth("secret_key"),
      { config: { isAuth: false } })
  );
  if (err) return
  if (res) {
    const keyCode = decrypt(
      res?.content,
      base64DAes(res?.key)
    );
    key.value = base64DAes(keyCode);
  }
};

const onSubmit = debounce(() => {
  ruleFormRef.value
    .validate()
    .then(() => {
      loading.value = true;
      signUp();
    })
    .catch((error: any) => {
      console.log("error submit!", error);
    });
}, 500);

const signUp = async () => {
  if (!key.value) await getKeyData();

  loading.value = true;
  const password = encrypt(form.password, key.value);
  const email = route.query.email;
  const [error, res] = await to<{
    data: any;
    code: number;
    msg: string;
    status: string;
  }>(
    request(useApiAuth("sign_up"),
      {
        data: {
          email,
          password,
          first_name: form.firstName,
          last_name: form.lastName,
        },
        config: { isAuth: false }
      },
    )
  );

  if (error) return (loading.value = false);
  if (res?.code === 200) {
    if (res?.status == 'success') {
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
    loading.value = false;
    setTimeout(() => {
      router.push(`/login?email=${email}`);
    }, 1000)
  }
};
</script>

<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="w-[50%] relative flex flex-col items-center justify-center login-main-wrap">
      <div class="login-top">

        <home-logo />

        <div class="back" @click="backPage">
          <LeftOutlined style="margin-right: 8px" />
          You are signing in as {{ route.query.email }}
        </div>
      </div>
      <div class="login-form">
        <div class="login-form-info">
          <div class="login-form-info-title">Create a profile</div>
          <div class="login-form-info-desc">
            We will need some basic information to set up your account. You will
            be able to change this later.
          </div>
        </div>
        <Form ref="ruleFormRef" :model="form" :rules="rules" layout="vertical">
          <form-item label="First name" name="firstName">
            <Input v-model:value="form.firstName" placeholder="Enter first name" :maxlength="50"
              autocomplete="firstName" />
          </form-item>
          <form-item label="Last name" name="lastName">
            <Input v-model:value="form.lastName" placeholder="Enter last name" :maxlength="50"
              autocomplete="lastName" />
          </form-item>

          <form-item label="Password" name="password">
            <input-password v-model:value="form.password" type="password" show-password
              placeholder="Please enter the password" autocomplete="new-password" :maxlength="128" />
          </form-item>
          <form-item>
            <Button class="login-btn" type="primary" @click="onSubmit" :loading="loading">
              Continue
            </Button>
          </form-item>
        </Form>
        <div class="agree">
          By continuing, you agree to Docy AI's
          <a href="https://docyai.com/terms-conditions/" target="_blank">Terms & Conditions</a>
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
