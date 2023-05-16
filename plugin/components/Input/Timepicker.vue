<template>
    <div class="gamon-timepicker" ref="timepickerEl">
        <div v-if="timepickerParts.h" class="gamon-timepicker__slot">
            <Stepper v-model="timepicker.hour" :min="0" :max="24"  :key="steppersKey" editable vertical chevron />
        </div>
        <span v-if="timepickerParts.h && (timepickerParts.m || timepickerParts.s)"> : </span>
        <div v-if="timepickerParts.m" class="gamon-timepicker__slot">
            <Stepper v-model="timepicker.minute" :min="0" :max="60" :key="steppersKey"  editable vertical chevron />
        </div>
        <span v-if="timepickerParts.m && timepickerParts.s"> : </span>
        <div v-if="timepickerParts.s" class="gamon-timepicker__slot">
            <Stepper v-model="timepicker.second" :min="0" :max="60" :key="steppersKey"  editable vertical chevron />
        </div>
    </div>

    <div v-if="timepickerHourType == '12' " class="gamon-timepicker__daytime-toggler">
        <InputToggle v-model="dayTime" :default-value="['AM','AM']" :active-value="['PM','PM']" />
    </div>


</template>

<script lang="ts" setup>
    import { ref, onMounted, computed, watch } from 'vue'
    import {fixedDigits, getTimeStamp} from '@/utils'
    import InputToggle from '@/components/Input/InputToggle.vue'
    import Stepper from '@/components/Stepper/Stepper.vue'
    import '@/style/timepicker.css'


    const props = defineProps<{
        modelValue ?: string,
        format ?: string,
        hourType ?: string,
    }>()


    const finalFormat = ref(props.format || 'hh:mm:ss')
    const timepickerHourType = ref(props.hourType || '24')
    const timepickerParts = ref({
        h : false,
        m : false,
        s : false,
    })
    const timepicker = ref({
        hour:0,
        minute:0,
        second:0,
    })
    const finalOutput = ref()
    const timepickerEl = ref()
    const dayTime = ref('AM')
    const steppersKey = ref(getTimeStamp()) 



    onMounted(()=>{
        let formatRegex = /^(h{1,2}|m{1,2}|s{1,2})?(:(h{1,2}|m{1,2}|s{1,2}))?(:(h{1,2}|m{1,2}|s{1,2}))?$/gm

        if(finalFormat.value.match(formatRegex) ){
            if(finalFormat.value.includes('h'))
                timepickerParts.value.h = true
            if(finalFormat.value.includes('m'))
                timepickerParts.value.m = true
            if(finalFormat.value.includes('s'))
                timepickerParts.value.s = true
        } else {
            finalFormat.value = 'hh:mm:ss'
            timepickerParts.value.h = true
            timepickerParts.value.m = true
            timepickerParts.value.s = true
        }


        processModelValue()
        produceOutput()
    })



    watch(timepicker.value ,()=>{
        produceOutput()
    })


    // watch(()=>props.modelValue ,()=>{
    //     processModelValue()
    // })


    const produceOutput = ()=>{
        const formatParts = finalFormat.value.split(":")

        finalOutput.value = ''

        if(formatParts[0]){
            finalOutput.value += " "+produceOutputBasedOnFormatPart(formatParts[0])
        }
        if(formatParts[1]){
            finalOutput.value += ":" + produceOutputBasedOnFormatPart(formatParts[1])
        }
        if(formatParts[2]){
            finalOutput.value += ":" + produceOutputBasedOnFormatPart(formatParts[2])
        }
    }



    const produceOutputBasedOnFormatPart = (part:string)=>{
        let hourDigits = part.split('h').length - 1
        let minuteDigits = part.split('m').length - 1
        let secondDigits = part.split('s').length - 1

        let partOutput = ''
        
        if(hourDigits > 0){
            partOutput = fixedDigits(timepicker.value.hour, hourDigits)
        }
        else if(minuteDigits > 0){
            partOutput = fixedDigits(timepicker.value.minute, minuteDigits)
        }
        else if(secondDigits > 0){
            partOutput = fixedDigits(timepicker.value.second, secondDigits)
        }

        return partOutput
    }



    const processModelValue = ()=>{
        if(!props.modelValue)
            return

        let timeFormatParts =  finalFormat.value.split(":")
        let modelValueTimeParts =  props.modelValue.split(":")
        
        timeFormatParts.forEach((formatPart, index)=>{

            let hourDigits = formatPart.split('h').length - 1
            let minuteDigits = formatPart.split('m').length - 1
            let secondDigits = formatPart.split('s').length - 1


            if(hourDigits > 0){
                timepicker.value.hour = parseInt(modelValueTimeParts[index])
            }
            else if(minuteDigits > 0){
                timepicker.value.minute = parseInt(modelValueTimeParts[index])
            }
            else if(secondDigits > 0){
                timepicker.value.second = parseInt(modelValueTimeParts[index])
            }

        })
    }



    const clear = ()=>{
        timepicker.value.hour = 0
        timepicker.value.minute = 0
        timepicker.value.second = 0

        steppersKey.value = getTimeStamp()
        produceOutput()
    }


    const emit = defineEmits(['update:modelValue'])
    const updateModelValue = ()=>{
        emit('update:modelValue', output.value)
    }   


    const output = computed(()=>{
        let output = finalOutput.value
        if(props.hourType == '12')
            output += ' '+ dayTime.value

        return output
    })

    watch(output ,()=>{
        updateModelValue()
    })


    defineExpose({
        clear,
    })


</script>