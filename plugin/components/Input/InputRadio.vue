<template>
    <div :class="['gamon-radio']" @click="clicked()" >
        <input v-model="radioState" class="gamon-radio__input" ref="radioInputEl" type="radio" :name="name" :value="value">
        <div :class="['gamon-radio__checkmark', checkmarkClass, radioState && 'gamon-radio__checkmark--checked']" :style="checkmarkStyleObject"></div>
        <div :class="['gamon-radio__title', titleClass]" :style="titleStyleObject"> {{title}} </div>
    </div>
</template>




<script setup lang="ts">
    import {ref, onMounted, watch} from 'vue'
    import '@/style/inputRadio.css'
    import { convertCssStringToStyleObject } from '@/utils'
  
    const props = defineProps<{
        modelValue : string|number,

        title : string|number,
        value : string|number,
        name? : string,

        checkmarkStyle ?: string | { [index: string]: string },
        titleStyle ?: string | { [index: string]: string },

        titleClass ?: string,
        checkmarkClass ?: string,
    }>()

    const radioState = ref(false)
    const radioInputEl = ref<HTMLInputElement>()
    const checkmarkStyleObject = ref(convertCssStringToStyleObject(props.checkmarkStyle) || {})
    const titleStyleObject = ref(convertCssStringToStyleObject(props.titleStyle) || {})


    const clicked = ()=>{
        radioInputEl.value!.click()
        updateModelValue()
    }

  
    const emit = defineEmits(['update:modelValue'])
    const updateModelValue = ()=>{
        emit('update:modelValue', props.value || '' )
    }


    onMounted(()=>{
        syncModelValueAndUI()
    })
    

    watch(()=> props.modelValue, ()=>{
        syncModelValueAndUI()
    })

    const syncModelValueAndUI = ()=>{
        if(props.modelValue == props.value) radioInputEl.value!.checked = true
        else radioInputEl.value!.checked = false
    }

</script>
