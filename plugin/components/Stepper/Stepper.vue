<template>
    <div :class="['gamon-stepper', vertical && 'gamon-stepper--vertical', props.class ]" :style="stepperStyleObject">
        <div @click="op(1)" :class="['gamon-stepper__step gamon-stepper__step--inc', incClass]" :style="incStyleObject">
            <img v-if="chevron" class="gamon-stepper__step__operation-image"  src="@/assets/icon_chevron_up.png">
            <img v-else  class="gamon-stepper__step__operation-image" src="@/assets/icon_plus.png">
        </div>
        <div :class="['gamon-stepper__number-container', numberClass]" :style="numberStyleObject">
            <input v-if="editable" v-model="number"  @blur="inputFocusHoutHandler()"  type="number" class="gamon-stepper__number-container__editable-input" dir="ltr" ref="inputEl" />
            <span v-else> {{number}} </span>
        </div>
        <div @click="op(-1)" :class="['gamon-stepper__step gamon-stepper__step--dec', decClass]" :style="decStyleObject">
            <img v-if="chevron" class="gamon-stepper__step__operation-image"  src="@/assets/icon_chevron_down.png">
            <img v-else class="gamon-stepper__step__operation-image"  src="@/assets/icon_minus.png">
        </div>
    </div>
</template>



<script lang="ts" setup>
    import { ref, onMounted, watch } from 'vue'
    import { prepareValueForStyleObject, convertCssStringToStyleObject } from '@/utils'
    import '@/style/stepper.css'


    const props = defineProps<{
        modelValue ?: string | number,
        min ?: number,
        max ?: number,
        editable ?: boolean,
        vertical ?: boolean,
        chevron ?: boolean,
        width ?: number|string,
        height ?: number|string,

        style ?: string | { [index: string]: string },
        incStyle ?: string | { [index: string]: string },
        decStyle ?: string | { [index: string]: string },
        numberStyle ?: string | { [index: string]: string },

        class ?: string,
        incClass ?: string,
        decClass ?: string,
        numberClass ?: string,
    }>()


    const number = ref<number>(Number(props.modelValue) || 0)
    const stepperStyleObject = ref(convertCssStringToStyleObject(props.style) || {})
    const incStyleObject = ref(convertCssStringToStyleObject(props.incStyle) || {})
    const decStyleObject = ref(convertCssStringToStyleObject(props.decStyle) || {})
    const numberStyleObject = ref(convertCssStringToStyleObject(props.numberStyle) || {})
    const inputEl = ref<HTMLInputElement>()


    onMounted(()=>{
        if(props.min && props.min > number.value)
            number.value = props.min
        if(props.width)
            stepperStyleObject.value.width = prepareValueForStyleObject(props.width)
        if(props.height)
            stepperStyleObject.value.height = prepareValueForStyleObject(props.height)
    })



    const op = (step:number)=>{
        let nextNumber = number.value

        if(nextNumber == null || nextNumber == undefined)
            nextNumber = 0

        nextNumber += step

        if(props.min !== undefined && nextNumber < props.min)
            return 
        if (props.max !== undefined && nextNumber > props.max)
            return 

        number.value = nextNumber
    }


    const inputFocusHoutHandler = ()=>{
        if(props.min !== undefined && number.value < props.min)
            number.value =  props.min
        if (props.max !== undefined && number.value > props.max)
            number.value =  props.max 
    }


    watch(number, ()=>{
        updateModelValue()
    })




    const emit = defineEmits(['update:modelValue'])
    const updateModelValue = ()=>{
        emit('update:modelValue', Number(number.value))
    }

</script>