<template>
    <div :class="['gamon-sheet gamon-display-toggle',  'gamon-display-toggle--animation-'+(animation || useSheet.animation) ]" :id="id" ref="sheetEl">
        <div @click="backdropClickHandler()" class="gamon-sheet__backdrop dta-child" :style="backdropStyleObject"></div>
        <div :class="['gamon-sheet__body dta-child dta-animated', 'gamon-sheet__body--type-'+sheetType]" :style="[bodyStyleObject]">

            <div v-if="!noHeader && (title || !dismissDisabled) " class="gamon-sheet__body__header">
                <div class="gamon-sheet__body__header__title">{{title}}</div>
                <div v-if="!dismissDisabled" @click="dismissActionHandler()" class="gamon-sheet__body__header__dismiss-button">
                    <img src="@/assets/ic_close.png">
                </div>
            </div>

            <slot></slot>

        </div>
    </div>
</template>


<script setup lang="ts">
    import {ref, watch, computed, onMounted, onUnmounted} from 'vue'
    import {useSheet} from './sheet'
    import {showAnimation , hideAnimation, prepareValueForStyleObject, convertCssStringToStyleObject} from '@/utils'
    import type { ToggleAnimations } from '@/types/general.type'
    import '@/style/sheet.css'


    const props = defineProps<{
        id?:string,
        type?: 'center' | 'bottom' | 'top' | 'left' | 'right',
        width?:string | number,
        height?:string | number,
        minHeight?: string | number,
        animation?: ToggleAnimations,
        title?:string,
        display?:boolean,
        dismissDisabled?:boolean,
        noHeader?:boolean,

        bodyStyle?: string | { [index: string]: string },
        backdropStyle?: string | { [index: string]: string },

        onDismiss?:()=>void,
        onDisplay?:()=>void,
        onBackdropClick?:()=>void,
    }>()


    const bodyStyleObject = ref( convertCssStringToStyleObject(props.bodyStyle) || {})
    const backdropStyleObject = ref(convertCssStringToStyleObject(props.backdropStyle) || {})
    const sheetType = ref(props.type || 'center')
    const sheetEl = ref<HTMLElement>()
    const isSheetVisible = ref(false)


    const emit = defineEmits(['update:display'])


    onMounted(()=>{
        if(props.width)
            bodyStyleObject.value.maxWidth = prepareValueForStyleObject(props.width)
        if(props.height){
            const height = prepareValueForStyleObject(props.height)
            bodyStyleObject.value.height = height
            bodyStyleObject.value.minHeight = height
        }
        if(props.minHeight){
            bodyStyleObject.value.minHeight = prepareValueForStyleObject(props.minHeight)
        }

        if(props.id) addClickListenerToSheetTogglerButtons()
    })


    onUnmounted(()=>{
        if(props.id) removeClickListenerFromSheetTogglerButtons()
    })


    const addClickListenerToSheetTogglerButtons = () => {
        const btns = document.querySelectorAll("[gamon-sheet-toggle=" + (props.id) + "]")
        Array.from(btns).map(btn => {
            btn.addEventListener('click', toggle)
        })
    }


    const removeClickListenerFromSheetTogglerButtons = () => {
        const btns = document.querySelectorAll("[gamon-sheet-toggle=" + (props.id) + "]")
        Array.from(btns).map(btn => {
            btn.removeEventListener('click', toggle)
        })
    }

  
    const hide = ()=>{
        isSheetVisible.value = false

        if(props.id) useSheet.toggle(props.id)
        else hideAnimation(sheetEl.value!)

        props.onDismiss?.()
        emit('update:display', false)
    }


    const show = ()=>{
        isSheetVisible.value = true

        if(props.id) useSheet.toggle(props.id)
        else showAnimation(sheetEl.value!)

        props.onDisplay?.()
        emit('update:display', true)
    }


    const toggle = ()=>{
        if(!isSheetVisible.value) show()
        else  hide()
    }


    const backdropClickHandler = ()=>{
        props.onBackdropClick?.()
        dismissActionHandler()
    }


    const dismissActionHandler = ()=>{
        if(!props.dismissDisabled) toggle()
    }


    watch(()=>props.display , ()=>{
        if(props.display && !isSheetVisible.value)
            toggle()
        else if(!props.display && isSheetVisible.value)
            toggle()
    })


    defineExpose({
        sheetEl,
        hide,
        show,
        toggle,
    })

</script>
