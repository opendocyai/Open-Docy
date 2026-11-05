<script setup lang="ts">
defineOptions({ name: 'MonacoEditor' })

import { onBeforeUnmount, onMounted, ref, watch } from "vue"

import {
    foldGutter,
    foldKeymap
} from "@codemirror/language"

import { defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language"

import {
    highlightActiveLine,
    highlightActiveLineGutter,
    lineNumbers
} from "@codemirror/view"

import {
    bracketMatching
} from "@codemirror/language"

import {
    indentOnInput,
    indentUnit,
} from "@codemirror/language"

import {
    defaultKeymap,
    history
} from "@codemirror/commands"

import { keymap } from "@codemirror/view"

import {
    closeBrackets,
    closeBracketsKeymap
} from "@codemirror/autocomplete"

import {
    autocompletion,
    completionKeymap
} from "@codemirror/autocomplete"

import { EditorView, type KeyBinding } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { oneDark } from '@codemirror/theme-one-dark'

import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { json } from '@codemirror/lang-json'
import { html } from '@codemirror/lang-html'


const props = withDefaults(defineProps<{
    lang?: string
    disabled?: boolean
}>(), {
    lang: 'javascript',
    disabled: false
})


const modelValue = defineModel<any>()

const editorEl = ref<HTMLElement | null>(null)
let view: EditorView | null = null


const langExtension = () => {
    switch (props.lang) {
        case 'python':
        case 'py':
            return python()
        case 'json':
            return json()
        case 'html':
            return html()
        case 'ts':
        case 'typescript':
            return javascript({ typescript: true })
        default:
            return javascript()
    }
}

const myKeymap: KeyBinding[] | any[] = [
    ...defaultKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...closeBracketsKeymap,
    {
        key: "Tab",
        run: view => {
            view.dispatch(view.state.replaceSelection("    "))
            return true
        }
    }
]

const fullExtensions = [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightActiveLine(),
    bracketMatching(),
    indentOnInput(),
    indentUnit.of("    "),
    history(),

    closeBrackets(),
    autocompletion(),

    foldGutter({
        markerDOM: (open) => {
            const el = document.createElement("span")
            el.textContent = open ? "▼" : "▶"
            el.style.cursor = "pointer"
            el.style.fontSize = "12px"
            el.style.color = "#888"
            return el
        }
    }),

    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),

    keymap.of(myKeymap)
]

const initEditor = () => {
    if (!editorEl.value) return
    view = new EditorView({
        state: EditorState.create({
            doc: modelValue.value,
            extensions: [
                basicSetup,
                langExtension(),
                oneDark,
                fullExtensions,
                EditorView.updateListener.of(update => {
                    if (update.docChanged) {
                        modelValue.value = update.state.doc.toString()
                    }
                }),
                EditorState.readOnly.of(props.disabled),
                EditorView.editable.of(!props.disabled)
            ]
        }),
        parent: editorEl.value,
    })

}


onMounted(() => {
    initEditor()

    watch(
        () => modelValue.value,
        (newValue) => {
            if (!view) return
            const current = view.state.doc.toString()
            if (newValue !== current) {
                view.dispatch({
                    changes: {
                        from: 0,
                        to: current.length,
                        insert: newValue
                    }
                })
            }
        }
    )

})

onBeforeUnmount(() => {
    view?.destroy()
})
</script>

<template>
    <div ref="editorEl" class="w-full h-full min-h-full"></div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
