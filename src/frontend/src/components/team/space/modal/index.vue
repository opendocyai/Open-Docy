<script setup lang="ts">
defineOptions({
	name: 'TeamSpaceModal',
});

import {useTemplateRef, reactive} from 'vue';

import {Form, FormItem, Input, Textarea} from 'ant-design-vue';

import {useApiSpace} from '@/api'

import {useHttp} from '@/client'

import to from 'await-to-js';

const {request} = useHttp();

const ruleFormRef = useTemplateRef<any>('ruleFormRef');

const teamWorkspaceForm = reactive<any>({
	name: "",
	description: "",
});

const rules = reactive<any>({
	name: [
		{required: true, message: "The team name is required", trigger: "blur"},
	],
});

function toCreateTeamWorkspace() {
	let params = {
		name: teamWorkspaceForm.name,
		description: teamWorkspaceForm.description,
	};
	
	return to<{
		data: any;
		code: number;
	}>(request(useApiSpace("add_space"), {
		data: params,
	}));
}

defineExpose({
	ruleFormRef,
	toCreateTeamWorkspace,
});
</script>

<template>
	<div class="modal-wrap">
		<Form
			ref="ruleFormRef"
			:model="teamWorkspaceForm"
			:rules="rules"
			layout="vertical"
			style="width: 100%; margin-top: 20px"
		>
			<form-item label="Team Name" name="name">
				<Input
					v-model:value="teamWorkspaceForm.name"
					:maxlength="64"
					placeholder="Name your team space"
				/>
			</form-item>
			<form-item label="Team Description" name="description">
				<Textarea
					v-model:value="teamWorkspaceForm.description"
					placeholder="Add a short description"
					:maxlength="500"
					show-count
					:autoSize="{ minRows: 3, maxRows: 10 }"
					style="height: max-content; resize: none"
				/>
			</form-item>
		</Form>
	</div>
</template>

<style src="./index.scss" lang="scss" scoped></style>
