<template>
    <div :class="['gamon-input-toggle', rectangle && 'gamon-input-toggle--rectangle']">
        <div :class="['gamon-input-toggle__default-value', defaultValueClass]" :style="defaultValueStyleObject"> {{defaultValue[1]}} </div>
        <div :class="['gamon-input-toggle__toggler', togglerClass]" @click="toggle()" :style="togglerStyleObject">
            <div class="gamon-input-toggle__toggler__pointer-container">
                <div :class="['gamon-input-toggle__toggler__pointer-container__pointer', pointerClass, active && 'gamon-input-toggle__toggler__pointer-container__pointer--active' ]" ref="togglePointerEl" :style="pointerStyleObject"></div>
            </div>
        </div>
        <div :class="['gamon-input-toggle__active-value', activeValueClass]" :style="activeValueStyleObject"> {{activeValue[1]}} </div>
    </div>
</template>




<script setup lang="ts">
    import {ref, onMounted, watch} from 'vue'
    import '@/style/inputToggle.css'
    import { convertCssStringToStyleObject } from '@/utils'

    
    const props = defineProps<{
        modelValue ?: string|number,
        defaultValue : (string|number)[],
        activeValue : (string|number)[],
        rectangle ?: boolean,
        
        togglerStyle ?: string | { [index: string]: string },
        pointerStyle ?: string | { [index: string]: string },
        activeValueStyle ?: string | { [index: string]: string },
        defaultValueStyle ?: string | { [index: string]: string },

        defaultValueClass ?: string,
        activeValueClass ?: string,
        pointerClass ?: string,
        togglerClass ?: string,
    }>()
    

    const togglePointerEl = ref<HTMLElement>()
    const active = ref(false)
    const togglerStyleObject = ref(convertCssStringToStyleObject(props.togglerStyle) || {})
    const pointerStyleObject = ref(convertCssStringToStyleObject(props.pointerStyle) || {})
    const defaultValueStyleObject = ref(convertCssStringToStyleObject(props.defaultValueStyle) || {})
    const activeValueStyleObject = ref(convertCssStringToStyleObject(props.activeValueStyle) || {})



    const emit = defineEmits(['update:modelValue'])
    const updateModelValue = ()=>{
        emit('update:modelValue', active.value? props.activeValue[0] : props.defaultValue[0])
    }


    const toggle = ()=>{
        active.value = ! active.value
        updateModelValue()
    }



    const syncStateAndModelValue = ()=>{
        if(props.modelValue == props.activeValue[0])
            active.value = true
        else 
            active.value = false
    }



    watch(()=>props.modelValue, ()=>{
        syncStateAndModelValue()
    })



    onMounted(()=>{
        syncStateAndModelValue()
        updateModelValue()
    })
    

</script>