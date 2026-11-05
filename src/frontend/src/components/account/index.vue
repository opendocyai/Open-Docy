<script setup lang="ts">
import { CODE_OK } from "@/shared/utils";

defineOptions({
  name: "Account",
});

import {
  Modal,
  message,
  Form,
  FormItem,
  Input,
  Button,
  InputPassword,
} from "ant-design-vue";

import { NuxtIcon, UploadAvatar } from "@/components";

import { computed, reactive, ref, watch, onMounted } from "vue";

import { useMainStore, useSpaceStore } from "@/stores";

import { useHttp } from "@/client";

import { useApiAuth } from "@/api";

import to from "await-to-js";
import { base64DAes, capitalLetter, decrypt, encrypt, figure, lowercaseLetter } from "@/utils";
import { useRouter } from "vue-router";

const { request } = useHttp();

const router = useRouter();

const mainStore = useMainStore();
const spaceStore: any = useSpaceStore();
const userInfo: any = computed(() => mainStore.userInfo);
const accountModal = defineModel<boolean>("accountModal", { required: false });
const resetLoading = ref<boolean>(false);
const editLoading = ref<boolean>(false);
const openEditModal = ref<boolean>(false);
const openResetModal = ref<boolean>(false);
const isHasPassword = ref<boolean>(false);
const userNameHasChange = ref<boolean>(false);
const oldName = ref<string>("");
const ruleFormRefUserName = ref<any>(null);

const key = ref<string>("");

const ruleFormRefReset = ref<any>(null);

const resetPasswordForm = ref<any>({
  password: undefined,
  password_confirm: undefined,
});

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

const validateConfirmPassword = async (_rule: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("Please confirm your password"));
  }

  try {
    await validatePass(_rule, resetPasswordForm.value.password);
  } catch (error: any) {
    return Promise.reject(error);
  }

  if (value !== resetPasswordForm.value.password) {
    return Promise.reject(new Error("The two passwords do not match"));
  }

  return Promise.resolve();
};

const rulesResetPassword = reactive<any>({
  password: [{ required: true, validator: validatePass, trigger: "blur" }],
  password_confirm: [
    { required: true, validator: validateConfirmPassword, trigger: "blur" },
  ],
});

const userNameForm = reactive<any>({
  firstName: "",
  lastName: "",
});

const rules = reactive<any>({
  firstName: [{ required: true, message: "The firstName is required", trigger: "blur" }],
  lastName: [{ required: true, message: "The lastName is required", trigger: "blur" }],
});

function toResetPassword() {
  openResetModal.value = true;
}

const toOpenEdit = (userInfo: { display: any; first_name: any; last_name: any }) => {
  openEditModal.value = true;
  oldName.value = userInfo.display;
  userNameForm.firstName = userInfo.first_name;
  userNameForm.lastName = userInfo.last_name;
  const newName = `${userNameForm.firstName} ${userNameForm.lastName}`;
  userNameHasChange.value = !!(newName && newName !== oldName.value);
};

const editUserName = () => {
  ruleFormRefUserName.value
    .validate()
    .then(() => {
      toEditUserName("edtiUserName", "");
    })
    .catch((error: any) => {
      console.log("error submit!", error);
    });
};

async function toEditUserName(type: string, key: string) {
  let params = {};
  if (type === "edtiUserName") {
    params = {
      first_name: userNameForm.firstName,
      last_name: userNameForm.lastName,
    };
  } else {
    params = {
      avatar: key,
    };
  }
  const [_, res] = await to<{
    data: any;
    code: number;
  }>(
    request(useApiAuth("update_info"), {
      data: params,
    })
  );
  editLoading.value = false;
  openEditModal.value = false;

  if (res?.code === CODE_OK) {
    const tips =
      type === "edtiUserName"
        ? "Username updated successfully"
        : "Profile picture updated successfully";
    await message.success(tips);
    const { spaceInfoCurrent, spaceInfoList } = spaceStore;
    if (spaceInfoCurrent.id == spaceInfoList?.personal_workspace?.[0]?.id) {
      spaceStore.SET_USER_SPACE_CURRENT(undefined);
    }
    spaceStore.SET_USER_SPACE_LIST(undefined);
    mainStore.SET_USER_INFO(res?.data);
    mainStore.SET_USER_ID(res?.data?.id);
  }
}

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

refreshKeyData()

const resetPassword = async () => {
  if (!key.value) await refreshKeyData();

  const password = encrypt(resetPasswordForm.value.password, key.value);
  const password_confirm = encrypt(resetPasswordForm.value.password_confirm, key.value);

  resetLoading.value = true;
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiAuth("reset_password"), {
      data: {
		email: userInfo.value.email,
        password,
        password_confirm,
      },
    })
  );
  resetLoading.value = false;
  if (error) return;
  if (res.code == CODE_OK) {
    openResetModal.value = false;
    await message.success("Password reset successfully");
    mainStore.SET_SIGN_OUT();
    router.replace({ path: "/login" });
  }

};

const onResetPassword = () => {
  ruleFormRefReset.value
    .validate()
    .then(() => {
      resetPassword();
    })
    .catch((error: any) => {
      console.log("error submit!", error);
    });
};

const checkHasPassword = async () => {
  const [_, res] = await to<{
    data: any;
    code: number;
  }>(request(useApiAuth("has_password")));
  if (res?.code === CODE_OK) {
    isHasPassword.value = res.data.has_password;
  }
};

const handleUpload = (item: any) => {
  toEditUserName("editAvatar", item.key);
};

watch(
  () => [userNameForm.firstName, userNameForm.lastName],
  (newVal: any[]) => {
    const newName = `${newVal[0]} ${newVal[1]}`;
    userNameHasChange.value = newVal && newName !== oldName.value;
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  checkHasPassword();
});
</script>

<template>
  <Modal
    v-model:open="accountModal"
    title="Account Settings"
    width="686px"
    :maskClosable="false"
    :footer="null"
    centered
  >
    <div class="account-wrap">
      <div class="account-top">
        <div class="account-avatar">
          <div class="upload-img">
            <img src="@/assets/icons/avatar-edit.svg" alt="Edit Avatar" />
          </div>
          <upload-avatar
            :userInfo="userInfo"
            v-model:avatar="userInfo.avatar"
            @upload="handleUpload"
          />
        </div>
        <div class="account-desc">
          The image must be larger than 96*96 pixels.<br />JPEG, PNG and SVG formats are
          supported
        </div>
      </div>
      <div class="account-bottom">
        <div class="form-list">
          <div class="form-left">
            <span class="label">User name</span>
            <span class="value"> {{ userInfo.first_name }} {{ userInfo.last_name }}</span>
          </div>
          <div class="form-right">
            <Button @click="toOpenEdit(userInfo)">
              <span class="edit-btn">
                <NuxtIcon name="edit-single" class="icon" /> Edit
              </span>
            </Button>
          </div>
        </div>

        <div class="form-list">
          <div class="form-left">
            <span class="label">Email</span>
            <span class="value">{{ userInfo.email }}</span>
          </div>
        </div>

        <div class="form-list">
          <div class="form-left">
            <span class="label">Password</span>
            <span class="value password-value" v-if="!isHasPassword">
              Not set
              <NuxtIcon name="exclamation" class="c-[#FFA504] icon" />
            </span>
            <span class="value password-value" v-else>
              Set
              <NuxtIcon name="check-success" class="c-[#09BB07] icon" />
            </span>
          </div>
          <div class="form-right">
            <Button @click="toResetPassword" v-if="!isHasPassword"> Set password </Button>
            <Button @click="toResetPassword" v-else>Reset password</Button>
          </div>
        </div>
      </div>
    </div>
  </Modal>

  <Modal
    v-model:open="openEditModal"
    title="Edit user name"
    width="480px"
    :maskClosable="false"
    :footer="null"
    centered
  >
    <div class="modal-wrap">
      <Form
        ref="ruleFormRefUserName"
        :model="userNameForm"
        :rules="rules"
        layout="vertical"
        style="width: 100%; margin-top: 20px"
      >
        <form-item label="First name" name="firstName">
          <Input
            v-model:value="userNameForm.firstName"
            :maxlength="50"
            placeholder="Enter first name"
          />
        </form-item>
        <form-item label="Last name" name="lastName">
          <Input
            v-model:value="userNameForm.lastName"
            :maxlength="50"
            placeholder="Enter last name"
          />
        </form-item>
      </Form>
      <div class="footer-wrap">
        <Button @click="openEditModal = false">Cancel</Button>
        <Button
          type="primary"
          :loading="editLoading"
          :disabled="!userNameHasChange"
          @click="editUserName"
        >
          Confirm
        </Button>
      </div>
    </div>
  </Modal>

  <Modal
    v-model:open="openResetModal"
    title="Reset password"
    width="480px"
    :maskClosable="false"
    :footer="null"
    centered
  >
    <div class="modal-wrap">
      <Form
        ref="ruleFormRefReset"
        :model="resetPasswordForm"
        :rules="rulesResetPassword"
        layout="vertical"
        class="w-full"
      >
        <form-item label="Password" name="password">
          <InputPassword
            v-model:value="resetPasswordForm.password"
            :maxlength="50"
            placeholder="Enter password"
          />
        </form-item>
        <form-item label="Password confirm" name="password_confirm">
          <InputPassword
            v-model:value="resetPasswordForm.password_confirm"
            :maxlength="50"
            placeholder="Enter password confirm"
          />
        </form-item>
      </Form>
      <Button
        class="reset-btn"
        type="primary"
        :loading="resetLoading"
        @click="onResetPassword"
      >
        Reset password
      </Button>
      <p class="tips">
        Click ‘Reset Password’ and we’ll send you a link to reset your password.
      </p>
    </div>
  </Modal>
</template>

<style src="./index.scss" scoped lang="scss"></style>
