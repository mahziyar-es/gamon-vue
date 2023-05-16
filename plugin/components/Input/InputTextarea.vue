<template>
    <InputLayout :title="title" :icon="icon" >
        <textarea class="gamon-input__input gamon-input-textarea" :cols="cols || 10" :rows="rows || 5" :value="modelValue"  @input="updateModelValue($event)" 
            :placeholder="placeholder" :required="props.required" :readonly="props.readonly" :autofocus="props.autofocus" ref="inputEl">
        </textarea>
    </InputLayout>
</template>




<script setup lang="ts">
    import {ref, computed, onUpdated, watch} from 'vue'
    import InputLayout from '@/components/Input/InputLayout.vue'
    import '@/style/inputTextarea.css'

    const props = defineProps<{
        modelValue?:string|number,
        title ?: string,
        placeholder ?: string,
        cols ?: number,
        rows ?: number,
        required ?: boolean,
        readonly ?: boolean,
        autofocus ?: boolean, // used for autofocus html input attribute
        focus ?: boolean, // used to control focus on input via javascript
        icon ?: string,
    }>()

    const inputEl = ref<HTMLTextAreaElement>()

    watch(()=>props.focus, ()=>{
        props.focus ? inputEl.value?.focus() : inputEl.value?.blur()
    })


    const emit = defineEmits(['update:modelValue'])
    const updateModelValue = (e: Event) => {
        const val = (e.target as HTMLInputElement)!.value
        emit('update:modelValue', val)
    }
</script>