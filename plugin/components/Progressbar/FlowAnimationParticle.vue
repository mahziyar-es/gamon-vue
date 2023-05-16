<template>
    <div  
        :class="['gamon-progressbar__progress__animation-flow__particle', particleClass]"
        :style="[particlePositionStyleObject, particleStyle]"
    >
    </div>
</template>



<script setup lang="ts">
    import { StyleObject } from '@/types/general.type'
    import {onMounted, ref} from 'vue'


    const props = defineProps<{
        particleStyle?:StyleObject,
        particleClass?:string,
    }>()

    const particlePositionStyleObject = ref<StyleObject>({})


    onMounted(()=>{
        particlePositionStyleObject.value.left = randomPositionGenerator()
        particlePositionStyleObject.value.top = randomPositionGenerator()
    })


    const randomPositionGenerator = () => {
        return (Math.floor(Math.random() * 100) + 1) + '%'
    }

</script>
