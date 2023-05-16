<template>
    <div :class="['gamon-display-toggle ', 'gamon-display-toggle--animation-'+props.animation]" ref="notifyTextBoxEl">
        <div  :class="['gamon-notify__content-container  dta-child dta-animated', 'gamon-notify__content-container--type-'+type ]" >
            <p  class="gamon-notify__content-container__text">{{text}}</p>
            <div v-if="duration != -1 " class="gamon-notify__content-container__timer" ref="notifyTextBoxTimerEl" :style="{transitionDuration:notifyDurationStyle+'s'}"></div>
            <img @click="dismiss()" class="gamon-notify__content-container__dismiss-button" src="@/assets/icon_delete_circular.png">
        </div>
    </div>
</template>




<script setup lang="ts">
    import {ref, onMounted, computed} from 'vue'
    import {useNotify} from '@/components/Notify/notify'
    import {showAnimation, hideAnimation} from '@/utils'


    const props = defineProps<{
        text:string,
        type?:'success' | 'error' | '',
        duration:number, // if duration is -1, it means it will not fade automatically(its permanent)
        animation:string,
        parentEl:HTMLElement,
    }>()


    const notifyDurationStyle = computed(()=>{
        return props.duration/1000;
    })



    const notifyTextBoxEl = ref<HTMLElement>()
    const notifyTextBoxTimerEl = ref<HTMLElement>()

    const startTimerAnimation = ()=>{
        setTimeout(()=>{
            notifyTextBoxTimerEl.value!.style.width = '0'
        },100)
        setTimeout(()=>{
            dismiss()
        },props.duration)
    }


    const dismiss = ()=>{
        hideAnimation(notifyTextBoxEl.value!, ()=>{
            props.parentEl.removeChild(notifyTextBoxEl.value!)
        })
    }

    
    onMounted(()=>{
        showAnimation(notifyTextBoxEl.value!, ()=>{
            if(props.duration != -1) // -1 means the notify will not fade automatically
                startTimerAnimation()
        })
    })

</script>