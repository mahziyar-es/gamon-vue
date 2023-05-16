<template>
    <InputLayout :title="title" :icon="icon">
        <input :class="['gamon-input__input', inputClass]" :value="modelValue" :type="inputType" @input="updateModelValue(($event.target as HTMLInputElement)!.value)" 
            :placeholder="placeholder" :required="props.required" :readonly="props.readonly" :autofocus="props.autofocus" ref="inputEl">
        <img v-if="passwordVisibilityToggler" @click="passwordVisibilityTogglerHandler()" class="gamon-input-basic__passowrd-visibility-toggler"  src="@/assets/icon_eye.png">
    </InputLayout>
</template>




<script setup lang="ts">
    import {ref, computed, onMounted, watch} from 'vue'
    import InputLayout from '@/components/Input/InputLayout.vue'
    import '@/style/inputBasic.css'

    

    const props = defineProps<{
        modelValue?:string|number,
        title ?: string,
        placeholder ?: string,
        required ?: boolean,
        readonly ?: boolean,
        autofocus ?: boolean, // used for autofocus html input attribute
        focus ?: boolean, // used to control focus on input via javascript
        delay ?: number|boolean,
        type ?: "text" | "number" | "tel" | "email" | "password",
        icon ?: string,
        passwordVisibilityToggler ?: boolean,
        inputClass ?: string,
    }>()

    const inputEl = ref<HTMLInputElement>()
    const inputType = ref(props.type || 'text')
    const modelValueUpdateDelayInstance = ref<ReturnType<typeof setTimeout>>()



    onMounted(()=>{
    })


    watch(()=>props.focus, ()=>{
        props.focus ? inputEl.value?.focus() : inputEl.value?.blur()
    })


    const modelValueUpdateDelayDuration = computed(()=>{
        if(props.delay){
            if(props.delay == true){
                return 500
            } else {
                return props.delay
            }
        } else {
            return 0
        }
    })


    const passwordVisibilityTogglerHandler = ()=>{
        if(inputType.value == 'password' ) inputType.value = 'text'
        else inputType.value = 'password'
    }   



    const emit = defineEmits(['update:modelValue'])
    const updateModelValue = (val:string|number)=>{

        if(props.type == 'number') val = Number(val)

        if(modelValueUpdateDelayDuration.value > 0){
            if (modelValueUpdateDelayInstance.value) {
                clearTimeout(modelValueUpdateDelayInstance.value);
                modelValueUpdateDelayInstance.value = undefined;
            }
            modelValueUpdateDelayInstance.value = setTimeout(() => {
                emit('update:modelValue', val)
            }, modelValueUpdateDelayDuration.value);
        } else {
            emit('update:modelValue', val)
        }
    }

</script>

