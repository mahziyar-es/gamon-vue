<template>
    <div :class="['gamon-checkbox']" @click="clicked()" >
        <input v-model="checkboxState" class="gamon-checkbox__input" ref="checkboxInputEl" type="checkbox" :name="name" :value="value">
        <div :class="['gamon-checkbox__checkmark', checkmarkClass, checkboxState ? 'gamon-checkbox__checkmark--checked' : '' ]"  :style="checkmarkStyleObject"></div>
        <div :class="['gamon-checkbox__title', titleClass]" :style="titleStyleObject"> {{title}} </div>
    </div>
</template>




<script setup lang="ts">
    import {ref, onMounted, watch} from 'vue'
    import '@/style/inputCheckbox.css'
    import { convertCssStringToStyleObject } from '@/utils'
  
    const props = defineProps<{
        modelValue : string|number|boolean,

        title : string|number,
        value ?: string|number,
        name ?: string,
        binary ?: boolean,

        checkmarkStyle ?: string | { [index: string]: string },
        titleStyle ?: string | { [index: string]: string },

        titleClass ?: string,
        checkmarkClass ?: string,
    }>()

    
    const checkboxState = ref(false)
    const checkboxInputEl = ref<HTMLInputElement>()
    const checkmarkStyleObject = ref( convertCssStringToStyleObject(props.checkmarkStyle) || {})
    const titleStyleObject = ref(convertCssStringToStyleObject(props.titleStyle) || {})


    const clicked = ()=>{
        checkboxInputEl.value!.click()
        updateModelValue()
    }



    onMounted(()=>{
        if(!props.modelValue)
            updateModelValue()

        syncModelValueAndUI()
    })
    

    watch(()=> props.modelValue, ()=>{
        syncModelValueAndUI()
    })



    const emit = defineEmits(['update:modelValue'])
    const updateModelValue = ()=>{
        let valueToReturn;

        if(props.binary){
            valueToReturn = checkboxState.value ? 1 : 0
        } else {
            if(props.value){
                valueToReturn = checkboxState.value ? props.value : ''
            } else {
                valueToReturn = checkboxState.value
            }
        }
        
        emit('update:modelValue', valueToReturn )
    }



    const syncModelValueAndUI = ()=>{
        if(props.binary){
            checkboxState.value = props.modelValue == 1
        } else {
            if(props.value){
                checkboxState.value = props.modelValue == props.value
            } else {
                checkboxState.value = props.modelValue as boolean
            }
        }
    }

</script>