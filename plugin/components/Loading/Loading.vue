<template>
    <div class="gamon-loading" :style="loadingStyleObject">

        <div v-if="loadingType == 'dual-ring' " :class="loadingCLassPrefix+'gamon-loading__'+loadingType" >
            <div :class="loadingCLassPrefix+'gamon-loading__'+loadingType+'--reverse'"></div>
        </div>


        <div v-if="loadingType == 'bouncing-balls'" :class="loadingCLassPrefix+'gamon-loading__'+loadingType">
            <div :class="loadingCLassPrefix+'gamon-loading__'+loadingType+'__dot'"></div>
            <div :class="loadingCLassPrefix+'gamon-loading__'+loadingType+'__dot'"></div>
            <div :class="loadingCLassPrefix+'gamon-loading__'+loadingType+'__dot'"></div>
        </div>



        <div v-if="loadingType == 'cradle' " :class="loadingCLassPrefix+'gamon-loading__'+loadingType">
            <div :class="loadingCLassPrefix+'gamon-loading__'+loadingType+'__dot'"></div>
            <div :class="loadingCLassPrefix+'gamon-loading__'+loadingType+'__dot'"></div>
            <div :class="loadingCLassPrefix+'gamon-loading__'+loadingType+'__dot'"></div>
        </div>


        <div v-if="loadingType == 'wave' " :class="loadingCLassPrefix + 'gamon-loading__' + loadingType">
            <div :class="loadingCLassPrefix+'gamon-loading__'+loadingType+'__outer'"></div>
            <div :class="loadingCLassPrefix+'gamon-loading__'+loadingType+'__inner'"></div>
        </div>



    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { prepareValueForStyleObject } from "@/utils";
    import '@/style/loading.css'


    const props = defineProps<{
        classPrefix ?: string,
        type ?: 'dual-ring' | 'bouncing-balls' | 'cradle' | 'wave',
        fullScreen?: boolean,
        width ?: string|number,
        height?: string | number,
    }>()


    const loadingType = ref(props.type || 'dual-ring')
    const loadingStyleObject = ref({minWidth: '20px', height:'20px'})
    const loadingCLassPrefix = ref(props.classPrefix ? props.classPrefix+'__' : '' )


    onMounted(()=>{
        if(props.width) loadingStyleObject.value.minWidth = prepareValueForStyleObject(props.width!)
        if(props.height) loadingStyleObject.value.height = prepareValueForStyleObject(props.height!)
    })

</script>