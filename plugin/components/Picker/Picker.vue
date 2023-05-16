<template>
    <div :class="['gamon-picker', 'gamon-picker--'+ (horizontal ? 'horizontal' : 'vertical') ]" ref="pickerEl"
        @wheel="mouseWheelHandler($event)" 

        @mousedown="mouseDownHandler($event)" 
        @mousemove="mouseMoveHandler($event)" 
        @mouseup="mouseUpHandler($event)" 
        @mouseleave="mouseLeaveHandler($event)"

        @touchstart="mouseDownHandler($event)"
        @touchmove="mouseMoveHandler($event)"
        @touchend="mouseUpHandler($event)"
        >


        <!-- vertical -->
        <img v-if="arrow && !horizontal" @click="pick(1)" class="gamon-picker__arrow gamon-picker__arrow-up"  src="@/assets/icon_chevron_up.png">
        <img v-if="arrow && !horizontal" @click="pick(-1)" class="gamon-picker__arrow gamon-picker__arrow-down"  src="@/assets/icon_chevron_down.png">
        <!-- / -->
        <!-- horizontal -->
        <img v-if="arrow && horizontal" @click="pick(-1)" class="gamon-picker__arrow gamon-picker__arrow-right"  src="@/assets/icon_chevron_right.png">
        <img v-if="arrow && horizontal" @click="pick(1)" class="gamon-picker__arrow gamon-picker__arrow-left"  src="@/assets/icon_chevron_left.png">
        <!-- / -->

        <div class="gamon-picker__options-container" ref="pickerOptionsEl" >
            <slot></slot>
            <div :class="['gamon-picker__options-container__option', optionClass]" v-for="(op, index) in options" :data-value="op[1] ? op[1] : (op[0] ? op[0] : op )  " :is-prop-option="true" :key="index" :style="optionStyle">
                <span>{{ op[0] ? op[0] : op }}</span>
            </div>
        </div>
        <div v-show="!noSelectedFrame" :class="['gamon-picker__selected-frame', selectedFrameClass]" ref="pickerSelectedFrameEl" :style="selectedFrameStyle"></div>
    </div>
</template>


<script setup lang="ts">
    import {ref, onMounted, onUpdated} from 'vue'
    import '@/style/picker.css'

  

    const props = defineProps<{
        modelValue ?: number|string,
        options ?: (string|number)[],
        stopAtEnd ?: boolean,
        optionSize ?: number, // height for vertical , width for horizontal
        mouseMoveRatio ?: number,
        touchMoveRatio ?: number,
        horizontal ?: boolean,
        height ?: number,
        width ?: number,
        noSelectedFrame ?: boolean,
        startCenter ?: boolean,
        getValue ?: boolean,
        arrow?: boolean,
        
        selectedFrameClass ?: string,
        optionClass?: string,
        
        selectedFrameStyle ?: string |  { [index: string]: string },
        optionStyle ?: string |  { [index: string]: string },
    }>()


    const pickerOptionsEl = ref<HTMLElement>()
    const pickerSelectedFrameEl = ref<HTMLElement>()
    const pickerEl = ref<HTMLElement>()
    const selectedOptionIndex = ref(0)
    const finalTranslateValue = ref(0)
    const optionsCount = ref(0)
    const eachOptionSize = ref(0)
    const pickerHeight = ref(props.height || 300)
    const pickerWidth = ref(props.width || 450)
    const mouseMoveStepRatio = ref(props.mouseMoveRatio || 0.1)
    const touchMoveStepRatio = ref(props.touchMoveRatio || 0.2)





    // ===============================================================================================================
    // =================================================  init  ======================================================
    // ===============================================================================================================

    onMounted(()=>{
        prepOptions()
    })
        
    onUpdated(()=>{ 
        prepOptions()
    })

    const prepOptions = () : void=>{

        const children =  pickerOptionsEl.value!.children
        
        if(children.length != optionsCount.value){

            optionsCount.value = children.length

            Array.from(children).forEach((child, index)=>{
                child.classList.add('gamon-picker__options-container__option')
            })

            determineEachOptionSize()
        }
    }

    const determineEachOptionSize = () : void =>{

        if(props.optionSize){

            eachOptionSize.value = props.optionSize
            applyPickerAndSelectedFrameSizes()
            setEachOptionSize()
            processModelValueAnddetermineStartingOptionIndex()
        }
        else{
            
            setTimeout(()=>{
                const children =  pickerOptionsEl.value!.children
                let optionsSizes : number[] = []

                Array.from(children).forEach((child, index)=>{
                    optionsSizes.push(  calcOptionsSizeBasedOnStyle(child)  )
                })

                eachOptionSize.value = Math.max(...optionsSizes)

                if(!eachOptionSize.value) // as the last resort, if we can not find a valid size for each element, we set a default size
                    eachOptionSize.value = 30

                applyPickerAndSelectedFrameSizes()
                processModelValueAnddetermineStartingOptionIndex()
                setEachOptionSize()

            },50)
        }
    }

    const calcOptionsSizeBasedOnStyle = (optionEl:Element) : number=>{
        var optionStyle = getComputedStyle(optionEl)

        let sizeStyleKeys = []

        if(props.horizontal){
            sizeStyleKeys = ['border-left','border-right','padding-left','padding-right','margin-left','margin-right','width']
        } else {
            sizeStyleKeys = ['border-top','border-bottom','padding-top','padding-bottom','margin-top','margin-bottom','height']
        }


        let optionSize = 0
        sizeStyleKeys.forEach((key:string)=>{
            optionSize += parseFloat(optionStyle.getPropertyValue(key))
        })

        return optionSize
    }

    const applyPickerAndSelectedFrameSizes = () : void =>{
        pickerEl.value!.style.height = pickerHeight.value+'px'

        if(props.horizontal){
            pickerSelectedFrameEl.value!.style.width = eachOptionSize.value+'px'
            pickerOptionsEl.value!.style.width = eachOptionSize.value+'px'
        }
        else{
            pickerSelectedFrameEl.value!.style.height = eachOptionSize.value+'px'
            pickerOptionsEl.value!.style.height = eachOptionSize.value+'px'
        }
    }

    

    const setEachOptionSize = () : void =>{
        const children =  pickerOptionsEl.value!.children as HTMLCollectionOf<HTMLElement>
        let styleToSet = 'height'
        if (props.horizontal)
            styleToSet = 'width'

        Array.from(children).forEach((child, index)=>{
            child.style[styleToSet] = eachOptionSize.value+'px'
        })
    }


    const processModelValueAnddetermineStartingOptionIndex = ()=>{

        let startingIndex = 0 // default starting index is the first item (aka 0)

        if (props.modelValue) {
            if (props.getValue) {
                Array.from(pickerOptionsEl.value!.children).forEach((optionEl, index) => {
                    let value = optionEl.getAttribute('data-value')
                    if (value == props.modelValue)
                        startingIndex = index
                })
            }
            else startingIndex = props.modelValue as number
        }
        else if(props.startCenter){
            startingIndex = optionsCount.value % 2 == 0 ?  Math.floor(optionsCount.value/2) - 1 : Math.floor(optionsCount.value/2)
        } 

        moveOptions(startingIndex)
    }



    // ===============================================================================================================
    // =================================================   mouse drag handler ========================================
    // ===============================================================================================================
    const mouseIsDown = ref<boolean>(false)
    const tempTranslateValue = ref(0)

    const mouseDownHandler = (e:MouseEvent|TouchEvent) =>{
        mouseIsDown.value = true
    }

    const mouseUpHandler = (e:MouseEvent|TouchEvent) =>{
        mouseIsDown.value = false
        correctOptionsPosition()
    }

    const mouseLeaveHandler = (e:MouseEvent|TouchEvent) =>{
        mouseIsDown.value = false
        correctOptionsPosition()
    }

    const mouseMoveHandler = (e:MouseEvent|TouchEvent) =>{
        e.preventDefault()
        if(!mouseIsDown.value)
            return


        let directionCof :number = getEventDirection(e)

        // return if the movement is 0 (mouse did move but not in the direction that we want it, like we would like to to move in Y direction, but it moved in X)
        if(directionCof == 0)
            return;

        directionCof = directionCof > 0 ? 1 : -1

        let nextOptionsIndexToBeSelected : number  = calculateNextOptionIndexToBeSelectedBasedOnMovementDirection(directionCof)

        tempTranslateValue.value +=  directionCof*(0.1*eachOptionSize.value)
        finalTranslateValue.value += directionCof*(0.1*eachOptionSize.value)
        pickerOptionsEl.value!.style.transform = transform()


        if( Math.abs(tempTranslateValue.value) >= 0.6*eachOptionSize.value )
            moveOptions(nextOptionsIndexToBeSelected)

    }




    
    // ===============================================================================================================
    // =================================================   mouse wheel handler =======================================
    // ===============================================================================================================

    const mouseWheelHandler = (e:WheelEvent)=>{
        e.preventDefault();

        let nextOptionsIndexToBeSelected : number  = calculateNextOptionIndexToBeSelectedBasedOnMovementDirection(getEventDirection(e))

        moveOptions(nextOptionsIndexToBeSelected)
    }


    
    // ===============================================================================================================
    // =================================================   arrows handler      =======================================
    // ===============================================================================================================

    const pick = (direction : number)=>{
        let nextOptionsIndexToBeSelected : number  = calculateNextOptionIndexToBeSelectedBasedOnMovementDirection(direction)
        moveOptions(nextOptionsIndexToBeSelected)
    }




    // ===============================================================================================================
    // =================================================  functions  =================================================
    // ===============================================================================================================

    const mouseMoveLastPosition = ref<number>(0)
    const getEventDirection = (e:WheelEvent|MouseEvent|TouchEvent) : number =>{

        let direction = 0

        if(e instanceof MouseEvent){

            let mouseCurrentPosition = props.horizontal ? e.clientX : e.clientY

            direction = mouseCurrentPosition - mouseMoveLastPosition.value
            mouseMoveLastPosition.value = mouseCurrentPosition

        }
        if(e instanceof TouchEvent){

            let mouseCurrentPosition = props.horizontal ? e.changedTouches[0].clientX : e.changedTouches[0].clientY

            direction = mouseCurrentPosition - mouseMoveLastPosition.value
            mouseMoveLastPosition.value = mouseCurrentPosition

        } 

        if(e instanceof WheelEvent){
            direction = -1*e.deltaY
        }

        return direction
    }

    const calculateNextOptionIndexToBeSelectedBasedOnMovementDirection = (movementIndicator:number) : number =>{

        // determining next option index to be selected
        let nextOptionsIndexToBeSelected : number = selectedOptionIndex.value


        if(movementIndicator > 0)
            nextOptionsIndexToBeSelected -= 1
        else
            nextOptionsIndexToBeSelected += 1


        // check for end of list (both ends)
        if(nextOptionsIndexToBeSelected > optionsCount.value - 1){
            if(props.stopAtEnd)
                nextOptionsIndexToBeSelected = selectedOptionIndex.value // revert to old value
            else
                nextOptionsIndexToBeSelected = 0
        }
        else if(nextOptionsIndexToBeSelected < 0){
            if(props.stopAtEnd)
                nextOptionsIndexToBeSelected = selectedOptionIndex.value // revert to old value
            else
                nextOptionsIndexToBeSelected = optionsCount.value - 1
        }

        return nextOptionsIndexToBeSelected
    }   



    const moveOptions = (nextOptionsIndexToBeSelected:number) : void =>{

        pickerOptionsEl.value!.children[selectedOptionIndex.value].classList.remove('gamon-picker__options-container__option--selected')

        // finalize option selection and moving the options
        selectedOptionIndex.value = nextOptionsIndexToBeSelected

        updateModelValue()

        pickerOptionsEl.value!.children[selectedOptionIndex.value].classList.add('gamon-picker__options-container__option--selected')

        correctOptionsPosition()
    }

    const correctOptionsPosition = () : void =>{
        tempTranslateValue.value = 0
        finalTranslateValue.value = -1*selectedOptionIndex.value * eachOptionSize.value
        pickerOptionsEl.value!.style.transform = transform()
    }

   
    const transform = () : string =>{
        if(props.horizontal)
            return 'translateX('+(finalTranslateValue.value)+'px)'
        else
            return 'translateY('+(finalTranslateValue.value)+'px)'
    }



    // ===============================================================================================================
    // =================================================  update model value  ========================================
    // ===============================================================================================================

    const emit = defineEmits(['update:modelValue'])
    const updateModelValue = ()=>{
        let valueToReturn : any = ''

        if(props.getValue){
            valueToReturn = pickerOptionsEl.value!.children[selectedOptionIndex.value].getAttribute('data-value')
            if (!valueToReturn)
                valueToReturn = pickerOptionsEl.value!.children[selectedOptionIndex.value].innerHTML
        }
        else 
            valueToReturn = selectedOptionIndex.value

        emit('update:modelValue', valueToReturn)
    }

</script>