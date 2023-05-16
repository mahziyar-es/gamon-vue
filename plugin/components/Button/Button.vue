<template>
    <button  
        :type="buttonType"
        :class="[
            'gamon-button', 
            'gamon-button--size-'+buttonSize, 
            widthParent && 'gamon-button--width-parent', 
            loading && ('gamon-button--loading gamon-button--loading-'+buttonLoadingType ),
            'gamon-button--type-'+(props.outline ? 'outline' : 'default'),
            rounded && 'gamon-button--rounded' , 
            disabled && 'gamon-button--disabled',
        ]" 

        :style="buttonStyleObject"
        ref="buttonEl" 
    > 

        <div v-if="!(loading && buttonLoadingEffect == 'simple') ">
            <slot v-if="$slots.default"></slot>
            <div v-else :class="['gamon-button__text', textClass]" :style="textStyleObject">{{text}} </div>
        </div>


        <div v-if="loading" style="width:fit-content; height:100%; display:flex; align-items:center;">
            <slot v-if="$slots.loading" name="loading"></slot>
            <F v-else>
                <Loading :type="buttonLoadingType" :width="30" :height="30" :class-prefix="loadingClassPrefix || 'gamon-button' " />
                <!-- <img :src="buttonLoadingType" class="gamon-button_loading-animation_custom" /> -->
            </F>
        </div>

    </button>
</template>


<script setup lang="ts">
    import {ref, onMounted} from 'vue'
    import {prepareValueForStyleObject, convertCssStringToStyleObject} from '@/utils'
    import '@/style/button.css'
    import Loading from '@/components/Loading/Loading.vue'
    
   
    
    const props = defineProps<{
        text ?: string,
        type ?: 'submit' | 'reset' | 'button' | undefined,
        loading ?: boolean,
        loadingEffect ?: 'default' | 'simple',
        loadingType ?: InstanceType<typeof Loading>['type'],
        loadingClassPrefix ?: string,
        width ?: string|number,
        height ?: string|number,
        size ?: 'small' | 'medium' | 'large',
        widthParent ?: boolean,
        rounded?: boolean,
        disabled?: boolean,
        outline?: boolean,
        
        textClass?: string,
        
        textStyle?: string | { [index: string]: string },
    }>()



    const buttonEl = ref<HTMLDivElement>()
    const buttonSize = ref(props.size || 'medium')
    const buttonStyleObject = ref<{ [index: string]: string }>({})
    const textStyleObject = ref(convertCssStringToStyleObject(props.textStyle) || {})
    const buttonLoadingType = ref(props.loadingType || 'dual-ring')
    const buttonLoadingEffect = ref(props.loadingEffect || 'default')
    const buttonType = ref(props.type || 'button')

    
    onMounted(()=>{
        if(props.width)
            buttonStyleObject.value.maxWidth = prepareValueForStyleObject(props.width)
        if(props.height)
            buttonStyleObject.value.height = prepareValueForStyleObject(props.height)
    })

</script>