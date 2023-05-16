<template>
    <div>
        <div class="gamon-progressbar__progress__animation-flow__part1">
            <FlowAnimationParticle 
                v-for="i in 20"
                :key="i"  
                :particle-class="particleClass"
                :particle-style="particleStyle"
            />
        </div>
        <div class="gamon-progressbar__progress__animation-flow__part2">
            <FlowAnimationParticle 
                v-for="i in 20"
                :key="i"  
                :particle-class="particleClass"
                :particle-style="particleStyle"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>

    import { StyleObject } from '@/types/general.type'
    import FlowAnimationParticle from './FlowAnimationParticle.vue'


    const props = defineProps<{
        particleStyle?: StyleObject,
        particleClass?:string,
    }>()

    


</script>