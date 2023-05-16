<template>
  <div :class="['gamon-input-range', inputRangeClass]" :style="inputRangeStyle">

    <span v-if="outputDisplay == 'up' " :class="['gamon-input-range__output', outputOneClass]"  :style="[{left: outputOneLeft }, outputOneStyle || '']">{{ rangeOneModel }}</span>
    <span v-if="double && outputDisplay == 'up' " :class="['gamon-input-range__output gamon-input-range__output--output-two', outputTwoClass]"  :style="[{left: outputTwoLeft }, outputTwoStyle || '' ]" >{{ rangeTwoModel }}</span>

    <span :class="['gamon-input-range__full-range', fullRangeClass]" :style="fullRangeStyle"></span>
    <span :class="['gamon-input-range__selected-range', selectedRangeClass]"  :style="[{width: pickedRangeWidth, left: pickedRangeLeft}, selectedRangeStyle || '' ]"></span>

    <input v-model="rangeOneModel" @input="updateUI($event)"  :min="minValue" :max="maxValue" :step="step" type="range" name="rangeOne"
      :class="['gamon-input-range__input gamon-input-range__input--input-one', inputOneClass]" :style="inputOneStyle">
    <input v-if="double" v-model="rangeTwoModel" @input="updateUI($event)"  :min="minValue" :max="maxValue" :step="step" type="range"  name="rangeTwo"
      :class="['gamon-input-range__input gamon-input-range__input--input-two', inputTwoClass]" :style="inputTwoStyle">

  </div>
</template>



<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import '@/style/inputRange.css'


  const props = defineProps<{
    modelValue ?: number|number[],

    min ?: number,
    max ?: number,
    step ?: number,
    double ?: boolean,
    outputDisplay ?: 'none' | 'up',

    inputRangeStyle ?: string | { [index: string]: string },
    outputOneStyle ?: string | { [index: string]: string },
    outputTwoStyle ?: string | { [index: string]: string },
    fullRangeStyle ?: string | { [index: string]: string },
    selectedRangeStyle ?: string | { [index: string]: string },
    inputOneStyle ?: string | { [index: string]: string },
    inputTwoStyle ?: string | { [index: string]: string },

    inputRangeClass ?: string,
    outputOneClass ?: string,
    outputTwoClass ?: string,
    fullRangeClass ?: string,
    selectedRangeClass ?: string,
    inputOneClass ?: string,
    inputTwoClass ?: string,
  }>()    

  const minValue = ref(props.min || 0)
  const maxValue = ref(props.max || 100)
  const fullRangeWidth = maxValue.value - minValue.value
  const rangeOneModel = ref<number>(minValue.value)
  const rangeTwoModel = ref<number>(maxValue.value)
  const outputOneLeft = ref('')
  const outputTwoLeft = ref('')
  const pickedRangeWidth = ref('')
  const pickedRangeLeft = ref('')


  onMounted(()=>{
    init()
  })


  const init = async ()=>{
    await processModelValue()
    updateUI()
  }


  const processModelValue =  ()=>{
    if(props.modelValue){
      if(typeof(props.modelValue) == 'number')
        rangeOneModel.value = props.modelValue
      else{
        rangeOneModel.value = props.modelValue[0]
        rangeTwoModel.value = props.modelValue[1]
      }
    }
  }


  const updateUI = (e ?: Event)=>{
   

    const inputName = (e?.target as HTMLInputElement)?.name 
    const inputValue = Number((e?.target as HTMLInputElement)?.value)

    if(props.double &&  ( (inputValue >= rangeTwoModel.value && inputName == 'rangeOne') || (inputValue <= rangeOneModel.value && inputName == 'rangeTwo')  ) ){
      e?.stopPropagation()
      return
    }

    rangeOneModel.value = Number(rangeOneModel.value)
    rangeTwoModel.value = Number(rangeTwoModel.value)


    outputOneLeft.value = ( (rangeOneModel.value - minValue.value) / fullRangeWidth) * 100 + '%'
    outputTwoLeft.value = ( (rangeTwoModel.value - minValue.value) / fullRangeWidth) * 100 + '%'

    
    if(props.double){
      if(rangeOneModel.value > rangeTwoModel.value){
        pickedRangeWidth.value =  (rangeOneModel.value - rangeTwoModel.value) / fullRangeWidth * 100 + '%'
        pickedRangeLeft.value =  ( (rangeTwoModel.value - minValue.value) / fullRangeWidth ) * 100 + '%'
      }
      else{
        pickedRangeWidth.value =  (rangeTwoModel.value - rangeOneModel.value) / fullRangeWidth * 100 + '%'
        pickedRangeLeft.value =  ( (rangeOneModel.value - minValue.value) / fullRangeWidth ) * 100 + '%'
      }
    } else {
      pickedRangeLeft.value = 0+'%'
      pickedRangeWidth.value = (rangeOneModel.value - minValue.value) / fullRangeWidth * 100 + '%'
    }
    
    updateModelValue()
  }


  
  const emit = defineEmits(['update:modelValue'])
  const updateModelValue = ()=>{
    emit('update:modelValue', props.double ? [rangeOneModel.value, rangeTwoModel.value] : rangeOneModel.value)
  }
</script>