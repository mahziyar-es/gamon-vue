<template>
   <div
        :class="[
            'gamon-grab-scroll',
            hideScrollbar && 'scrollbar-hide',
            vertical && 'gamon-grab-scroll--vertical',
        ]"
        
        @mousemove="mouseMoveHandler"
        @mousedown="startDragging"
        @mouseup="stopDragging"
        @mouseleave="stopDragging"

        ref="containerEl" 
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    import '@/style/grabScroll.css'
    import { ref } from 'vue'


    const props = defineProps<{
        hideScrollbar?: boolean,
        vertical?: boolean,
    }>()

    const containerEl = ref<HTMLDivElement>()
    const mouseDown = ref(false)
    const mouseStartingPosition = ref(0)
    const currentScroll = ref(0)


    const mouseMoveHandler = async (e:MouseEvent)=>{
        e.preventDefault();
        if(!mouseDown.value) { return; }
        const mousePosition = await getMousePosition(e);
        const distanceToBeScrolled =  -1*(mousePosition - mouseStartingPosition.value - currentScroll.value);
        if (props.vertical) containerEl.value!.scrollTop = distanceToBeScrolled;
        else containerEl.value!.scrollLeft = distanceToBeScrolled;
        
    }


    const startDragging = async (e: MouseEvent) => {
        mouseDown.value = true;
        mouseStartingPosition.value = await getMousePosition(e)
        currentScroll.value = props.vertical ? containerEl.value!.scrollTop : containerEl.value!.scrollLeft;
    }


    const stopDragging = () => mouseDown.value = false;
    

    const getMousePosition = async (e: MouseEvent) => {
        return props.vertical ? (e.pageY - containerEl.value!.offsetTop) : (e.pageX - containerEl.value!.offsetLeft)
    }


</script>