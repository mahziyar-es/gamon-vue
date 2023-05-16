<template>
    <div :class="['gamon-progressbar']" :style="bgStyleObject">
        <span  :class="['gamon-progressbar__text', textClass]" :style="textStyleObject">
            <span v-if="!hideValue">{{progressValue}} % </span>
            <span v-if="text"> {{text}}</span>
        </span>
        <div :class="['gamon-progressbar__progress', progressClass]" :style="progressStyleObject" ref="progressbarValueEl">
            <span v-if="animation == 'flash' " :class="['gamon-progressbar__progress__animation-flasher', flasherClass]" :style="flasherStyleObject" ref="progressbarFlasherEl"></span>
            <FlowAnimation  v-if="animation == 'flow' " :particle-style="flowParticleStyleObject" :particle-class="flowParticleClass" />
        </div>
    </div>
</template>




<script setup lang="ts">
    import {ref, watch, onMounted} from 'vue'
    import FlowAnimation from './FlowAnimation.vue'
    import '@/style/progressbar.css'
    import { convertCssStringToStyleObject } from '@/utils'


    const props = defineProps<{
        value:string|number,
        text?:string,
        hideValue?:boolean,
        animation?:'flash' | 'flow',
        progressColor?:string,
        flowParticleColor?:string,
        flasherColor?:string,
        bgColor?:string,
        textColor?:string,
        textFontSize?:string,

        progressStyle?:string | { [index: string]: string },
        textStyle?:string | { [index: string]: string },
        flowParticleStyle?:string | { [index: string]: string },
        flasherStyle?:string | { [index: string]: string },

        progressClass?:string,
        textClass?:string,
        flowParticleClass?:string,
        flasherClass?:string,
    }>()

    


    const progressValue = ref(props.value || 0)
    const progressbarValueEl = ref<HTMLElement>()
    const animation = ref(props.animation)

    const progressStyleObject = ref(convertCssStringToStyleObject(props.progressStyle) || {})
    const bgStyleObject = ref<{ [index: string]: string }>({})
    const textStyleObject = ref(convertCssStringToStyleObject(props.textStyle) || {})
    const flowParticleStyleObject = ref(convertCssStringToStyleObject(props.flowParticleStyle) || {})
    const flasherStyleObject = ref(convertCssStringToStyleObject(props.flasherStyle) || {})


    onMounted(()=>{
        syncModelValueAndUi()

        if(props.progressColor) 
            progressStyleObject.value!['background'] = props.progressColor
        if(props.bgColor) 
            bgStyleObject.value!.background = props.bgColor
        if(props.textColor) 
            textStyleObject.value!.color = props.textColor
        if(props.textFontSize) 
            textStyleObject.value!.fontSize = props.textFontSize
        if(props.flowParticleColor) 
            flowParticleStyleObject.value!.background = props.flowParticleColor
        if(props.flasherColor) 
            flasherStyleObject.value!.background = props.flasherColor
    })


    watch(()=> props.value ,(newValue)=>{
        progressValue.value = newValue
        syncModelValueAndUi()
    })


    const syncModelValueAndUi = ()=>{
        progressbarValueEl.value!.style.width = progressValue.value+'%';
    }

</script>