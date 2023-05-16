<template>
    <InputLayout :title="title" :icon="icon" @click="toggle($event)"> 

        <input v-if="computedPlaceholder"  :placeholder="computedPlaceholder" class="gamon-input__input" readonly>
        <div class="gamon-input__input">
            <div v-if="multi" class="gamon-input-select__multi-selected-items-container">
                <span v-for="(selected,index) in (selectedOption as SelectedOptionMulti)" :key="index" @click="removeSelectedItem(index, $event)" class="gamon-input-select__multi-selected-items-container__selected-item">
                    <img class="gamon-input-select__multi-selected-items-container__selected-item__remove-button" src="@/assets/icon_delete_circular.png">
                    <span class="gamon-input-select__multi-selected-items-container__selected-item__text">{{selected[1]}}</span>
                </span>
            </div>
            <div v-else>
                <span v-if="selectedOption && selectedOption[1]" >{{selectedOption[1]}}</span>
            </div>
        </div>

        <div class="gamon-display-toggle gamon-display-toggle--animation-slide-down" ref="optionsDropDownContainer">
            <div class="gamon-input-select__options-container dta-child dta-animated">
                <div 
                    v-for="(op, index) in options" 
                    :key="index" 
                    @click="optionSelection(op)" 
                    :class="['gamon-input-select__options-container__option', op[0] == selectedOption[0] ? 'gamon-input-select__options-container__option--selected' : ''  ]"
                >
                    {{op[1]}}
                </div>
            </div>
        </div>


        <Sheet ref="optionsSheetContainerInstance" :type="optionSheetContainerType">
            <div v-for="(op, index) in options" :key="index" @click="optionSelection(op)" :class="['gamon-input-select__options-container__option', op[0] == selectedOption[0] ? 'gamon-input-select__options-container__option--selected' : ''  ]">{{op[1]}}</div>
        </Sheet>
    </InputLayout>
</template>




<script setup lang="ts">
    import {ref, computed, onMounted, onUnmounted, watch} from 'vue'
    import {toggleAnimation} from '@/utils'
    import InputLayout from '@/components/Input/InputLayout.vue'
    import Sheet from '@/components/Sheet/Sheet.vue'
    import '@/style/inputSelect.css'

    type ModelValue = string | number | string[] | number[]
    type SheetType = InstanceType<typeof Sheet>['type']
    type SelectedOptionSingle = (string|number)[]
    type SelectedOptionMulti = (string|number)[][]
        
    const props = defineProps<{
        modelValue?: ModelValue,

        options ?: (number|string)[][],
        title ?: string,
        placeholder ?: string,
        multi ?: boolean,
        icon ?: string,
        displayType ?: 'dropdown' | 'sheet-bottom' | 'sheet-center',
    }>()


    const optionsDisplayType = ref(props.displayType || 'dropdown')
    const optionsDropDownContainer = ref<HTMLElement>()
    const optionSheetContainerType = ref<SheetType>('center')
    const optionsSheetContainerInstance = ref()
    const optionsAreVisible = ref(false)
    const selectedOption = ref<SelectedOptionSingle | SelectedOptionMulti>([])
    const selectedValues = ref<(string|number)[]>([])



    onMounted(()=>{
        processModelValue()
        determineOptionsSheetContainerType()
        window.addEventListener('click', generalClickHandler)
    })

    onUnmounted(()=>{
        window.removeEventListener('click', generalClickHandler)
    })

    watch(() => props.modelValue, () => {
        if(props.modelValue != selectedValues.value) processModelValue()
    })


    const processModelValue = () => {
        if(props.modelValue && props.options){
            if(props.multi){
                props.options.forEach((op)=>{
                    if((props.modelValue as ModelValue[] ).indexOf(op[0]) != -1)
                        optionSelection(op)
                })
            } else{
                props.options.forEach((op)=>{
                    if(op[0] == props.modelValue)
                        optionSelection(op)
                })
            }
        }
        else if (!props.modelValue) {
            selectedOption.value = []
            selectedValues.value = []
        }
    }


    const computedPlaceholder = computed(()=>{
        if(props.multi){
            return selectedOption.value.length == 0 ? props.placeholder : ''
        } else {
            return !(selectedOption.value && selectedOption.value[1]) ? props.placeholder : ''
        }
    })


    const toggle = (e:Event)=>{
        e.stopPropagation();

        if(optionsDisplayType.value == 'dropdown'){
            toggleAnimation(optionsDropDownContainer.value!, ()=>{
                optionsAreVisible.value = ! optionsAreVisible.value
            })
        } else if(optionsDisplayType.value == 'sheet-bottom' || optionsDisplayType.value == 'sheet-center'){
            if(optionsAreVisible.value) optionsSheetContainerInstance.value.hide()
            else optionsSheetContainerInstance.value.show()

            optionsAreVisible.value = ! optionsAreVisible.value
        }
    }

    

    const emit = defineEmits(['update:modelValue'])
    const optionSelection = (val: any) => {
        if(props.multi){
            if(selectedValues.value.indexOf(val[0]) == -1){
                selectedValues.value.push(val[0])
                selectedOption.value.push(val)
            }
            else {
                const indexToRemove = selectedValues.value.indexOf(val[0])
                removeSelectedItem(indexToRemove)
            }
        } else {
            selectedOption.value = val
            selectedValues.value = val[0]
        }
        emit('update:modelValue', selectedValues.value)
    }


    const removeSelectedItem = (index:number, event ?: MouseEvent)=>{
        if(event) event.stopPropagation()
        selectedValues.value.splice(index, 1)
        selectedOption.value.splice(index, 1)
    }


    const generalClickHandler = (e:MouseEvent)=>{
        if(optionsAreVisible.value){
            toggle(e)
        }
    }


    const determineOptionsSheetContainerType = ()=>{
        if(optionsDisplayType.value == 'sheet-bottom')
            optionSheetContainerType.value = 'bottom'
        else if(optionsDisplayType.value == 'sheet-center')
            optionSheetContainerType.value = 'center'
    }
  
</script>
