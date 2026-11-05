<script setup lang="ts">
defineOptions({
    name: 'Flowchart'
})
import { useApiActivity } from '@/api';
import { useHttp } from '@/client';
import { ReteEditor, useRete, importEditor, processNodeConnections } from '@docyai/rete';
import { useEventSourceStore } from '@/stores';
import to from 'await-to-js';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const { request } = useHttp();

const { editor, readonly, setEnabled } = useRete();

const eventSourceStore = useEventSourceStore();


setEnabled(true);

const reteEditorRef = ref<any | null>(null);
const info = ref<any>(null);

const get_activity_detail = async () => {
    const dataApi = useApiActivity("get_activity_detail")(
        route.query.task_id
    );
    const [error, res] = await to<{ data: any; code: number }>(
        request(dataApi)
    );

    if (error) return;
    if (res?.code == 200) {
        info.value = res?.data
        console.log(res?.data, 'data.value');
        const json = processNodeConnections(res?.data?.json_temple);
        await importEditor(editor.value, json);
        readonly.value.enable();
    }
}

get_activity_detail()


watch(
    () => eventSourceStore.sse_data,
    async (newValue) => {
        console.log(newValue, "newValue---newValue");

        if (newValue?.page == "activities") {
            console.log("eventSourceStore.sse_data", newValue);
            console.log("eventSourceStore.sse_data.payload", newValue?.payload);
            console.log(info.value?.run_info, "info.value");

            if (
                info.value?.run_info?.run_id == newValue?.payload?.run_id &&
                newValue?.payload?.task_id == info.value?.run_info?.task_id
            ) {
                if (newValue?.event_type == "task_run_start") { }
            }

            if (
                newValue.event_type == "node_finished" ||
                newValue.event_type == "node_changed"
            ) {
                if (newValue?.payload?.run_id == info.value?.run_info?.run_id) {
                    if (newValue.event_type == "node_changed") {
                        const nodeId = newValue?.payload?.current_run_node;
                        const node = editor.value?.getNode(nodeId);
                        console.log(node, "Current node info");
                    }
                    if (newValue.event_type == "node_finished") {
                        if (!newValue?.payload?.error) {
                            console.log(newValue?.payload?.json?.nodes, "Node info");
                        }
                    }
                }
            }
        }
        if (newValue?.event_type == "task_status_changed") {
            if (newValue?.payload?.task_id == info.value?.run_info?.task_id) {
                console.log(
                    newValue?.payload?.changed_status == "In Progress",
                    "In progress"
                );
                console.log(
                    newValue?.payload?.changed_status == "Completed",
                    "Execution completed -- end"
                );
                console.log(
                    newValue?.payload?.changed_status == "Not Started",
                    "Not started yet"
                );
                console.log(newValue?.payload?.changed_status == "Queued", "Queued");
                console.log(
                    newValue?.payload?.changed_status == "Action Required",
                    "Action required!"
                );
                console.log(
                    newValue?.payload?.changed_status == "Error",
                    "Execution error -- end"
                );


                if (
                    ["Completed", "Error", "Action Required"].includes(
                        newValue?.payload?.changed_status
                    )
                ) { }
            }
        }
    },
    { immediate: true, deep: true }
);


</script>

<template>
    <div class="flowchart-content">
        <rete-editor ref="reteEditorRef" :isEnabled="true" />
    </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
