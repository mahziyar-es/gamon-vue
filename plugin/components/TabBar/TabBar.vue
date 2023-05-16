<template>
    <Row
        :class="'gamon-tabbar__container gamon-tabbar__container--position-' + tabbarPosition"
    >
        <Col
            :width="responsiveWidth || 'lg-12'"
            :style="{display: 'flex', alignItems: 'center', justifyContent: 'center' }"
        >
            <div 
                :class="['gamon-tabbar gamon-custom-scroll', props.class]"
                :style="tabbarStyleObject" 
                ref="tabbar"
            >

                <F v-if="tabs">
                    <div
                        v-for="(tab, index) in tabs"
                        @click="tabSelection(index)"
                        :class="[
                            'gamon-tabbar__tab',
                            tabClass,
                            index == selectedTabIndex ? activeTabClass : '' ,
                            selectedTabIndex == index ? 'gamon-tabbar__tab--active' : '',
                        ]"
                        :style="{ ...tabStyleObject, ...getActiveTabStyleObject(index)}"
                        :key="index"
                    >
                        {{ Array.isArray(tab) ? 
                            tab[1]
                            :
                            tab
                        }}
                    </div>
                </F>



                <div
                    v-if="tabbarIndicatorType != 'none'"
                    :class="[
                        'gamon-tabbar__active__indicator',
                        'gamon-tabbar__active__indicator--type-' + tabbarIndicatorType,
                        indicatorClass,
                    ]"
                    :style="indicatorStyleObject"
                    ref="ativeIndicator"
                >
                </div>
        
            </div>

        </Col>
    </Row>
</template>

<script setup lang="ts">
    import F from '@/components/F/F.vue'
    import { prepareValueForStyleObject, convertCssStringToStyleObject } from '@/utils'
    import { onMounted, ref, watch } from 'vue'
    import '@/style/tabBar.css'
    

    const props = defineProps<{
        modelValue?: any,
        
        tabs ?: string[] | (string|number)[][],

        position?: 'default' | 'fixed-bottom' | 'fixed-top',
        
        indicatorType?: 'none' | 'box' | 'line-top' | 'line-bottom',

        width?: number | string,
        responsiveWidth ?: string,
        
        style?: { [index: string]: string } | string,
        class?: string,
        bgColor?: string,

        tabStyle?: { [index: string]: string } | string,
        tabClass ?: string,
        tabColor ?: string,
        
        indicatorStyle?: { [index: string]: string } | string,
        indicatorClass?: string,

        activeTabStyle?: { [index: string]: string } | string,
        activeTabClass?: string,
        activeTabColor ?: string,

        indicatorColor ?: string,
        
        
    }>()    




    const ativeIndicator = ref<HTMLDivElement>()
    const tabbar = ref<HTMLDivElement>()
    const selectedTabIndex = ref()
    const tabbarPosition = ref(props.position || 'default')
    const tabbarIndicatorType = ref(props.indicatorType || 'box')
    const indicatorStyleObject = ref(convertCssStringToStyleObject(props.indicatorStyle) || {})
    const tabStyleObject = ref(convertCssStringToStyleObject(props.tabStyle) || {})
    const tabbarStyleObject = ref(convertCssStringToStyleObject(props.style) || {})
    const activeTabStyleObject = ref(convertCssStringToStyleObject(props.activeTabStyle) || {})



    onMounted(() => {


        if (props.indicatorColor) {
            indicatorStyleObject.value.background = props.indicatorColor
        }
        if (props.bgColor) {
            tabbarStyleObject.value.background = props.bgColor
        }
        if (props.width) {
            tabbarStyleObject.value.maxWidth = prepareValueForStyleObject(props.width!)
        }
        if (props.tabColor) {
            tabStyleObject.value.color = props.tabColor
        }
        if (props.activeTabColor) {
            activeTabStyleObject.value.color = props.activeTabColor
        }

        setTimeout(() => {
            determineSelectedIndexBasedOnModelValue()
        },100)
    })


    watch(selectedTabIndex, ()=>{
        selectedTabChange()
    })


    const determineSelectedIndexBasedOnModelValue = () => {
        if (Array.isArray(props.tabs?.[0])) {
            props.tabs?.forEach((tab, index) => {
                if(tab[0] == props.modelValue) selectedTabIndex.value = index
            })
        } 
        else {
            selectedTabIndex.value = props.modelValue || 0
        }
    }


const tabSelection = (index: number) => {
        selectedTabIndex.value = index
    }


    const selectedTabChange = ()=>{
        if(tabbarIndicatorType.value != 'none')
            moveActiveIndicator(selectedTabIndex.value)

        const tab = props.tabs![selectedTabIndex.value]

        let output
        if (Array.isArray(tab)) output = tab[0]
        else output = selectedTabIndex.value
            
        updateModelValue(output)
    }


    const moveActiveIndicator = async (index :number) => {

        const tabbarRect = await tabbar.value!.getBoundingClientRect() 
        const selectedTabRect = await getSelectedTabRect(index)
        if(!selectedTabRect) return

        ativeIndicator.value!.style.width = selectedTabRect.width + 16 + 'px'
        ativeIndicator.value!.style.left = selectedTabRect.left - tabbarRect.left - 8 + 'px'
        
        if(tabbarIndicatorType.value == 'box')
            ativeIndicator.value!.style.height = selectedTabRect.height + 16 + 'px'
    }


    const getSelectedTabRect = async (index: number) => {
        let target = tabbar.value?.children[index]
        return (target as HTMLDivElement)?.getBoundingClientRect()
    }


    const getActiveTabStyleObject = (index: number)=>{
        if (index == selectedTabIndex.value) return activeTabStyleObject.value;
    }


    const emit = defineEmits(['update:modelValue'])
    const updateModelValue = (val:string|number)=>{
        emit('update:modelValue', val)
    }

</script>