<template>
    <div class="gamon-carousel" ref="containerEl"  
        @mousemove="mouseMoveHandler" 
        @mousedown="startDragging" 
        @mouseup="stopDragging" 
        @mouseleave="stopDragging"

        @touchstart="startDragging"
        @touchend="stopDragging"
        @touchmove="mouseMoveHandler"
    >


        <div @click="navigate('left')" class="gamon-carousel__nav-next">
            <img src="@/assets/icon_carousel_left.png">
        </div>
        <div @click="navigate('right')" class="gamon-carousel__nav-prev">
            <img src="@/assets/icon_carousel_right.png">
        </div>


        <div class="gamon-carousel__items-container" ref="carouselItemsContainerEl" >
            <slot></slot>
        </div>


        <div v-if="!noIndicator" class="gamon-carousel__indicators-container">
            <div v-for="i in itemsCount" :key="i" @click="navigate(i-1)" :class="['gamon-carousel__indicators-container__indicator', indexOfVisibleItem == i-1 ? 'gamon-carousel__indicators-container__indicator--active' : '' ]"></div>
        </div>



    </div>
</template>


<script setup lang="ts">
    import {ref, onMounted, onUnmounted ,onUpdated} from 'vue'
    import '@/style/carousel.css'

    
    const props = defineProps<{
        itemsPerView ?: number,
        itemsPerSlide ?: number,
        eachItemMargin ?: number,
        eachItemHeight ?: number,
        duration ?: number,
        auto ?: boolean,
        stopAtEnd ?: boolean,
        noIndicator ?: boolean,
        responsive ?: {[index:number]:number}, // e.g  {1000: 5,  800 : 3, 200 : 1 }
    }>()




    // ================================================= init and watch slot content
    const containerEl = ref<HTMLElement>()
    const itemsCountToShowPerSlide = ref<number>(props.itemsPerView || 1)
    const itemsCountToMovePerSlide = ref<number>(props.itemsPerSlide || 1)
    const itemsMargin = ref<number>(props.eachItemMargin || 0)
    const itemsCount = ref<number>(0)
    const carouselItemsContainerEl = ref<HTMLElement>()
    const mouseDown = ref<boolean>(false)
    const startX = ref()
    const mouseMoveDetectionDelay = ref()
    const autoIntervalValue = ref()
    const autoIntervalDuration = ref<number>(props.duration || 4000)
    const indexOfVisibleItem = ref<number>(0)
    const translation = ref<number>(0)



    onMounted(()=>{
        let childs = carouselItemsContainerEl.value!.children
        itemsCount.value = childs.length


        if(props.responsive)
            responsiveInit()
        else 
            if(itemsCount.value > 0)
                carouselInit()

        if(props.auto)
            startAutoNavigate()
    })

    onUnmounted(()=>{
        stopAutoNavigate()
        stopScreenSizeChangeListener()
    })


    onUpdated(()=>{
        let childs = carouselItemsContainerEl.value!.children
        if(childs.length != itemsCount.value)
            carouselInit()
    })



    const carouselInit = ()=>{
        
        let childs  = carouselItemsContainerEl.value!.children as HTMLCollectionOf<HTMLElement>
        itemsCount.value = Math.ceil((childs.length - itemsCountToShowPerSlide.value)/itemsCountToMovePerSlide.value) + 1

        let itemsContainerWidth = carouselItemsContainerEl.value!.getClientRects()[0].width
        carouselItemsContainerEl.value!.style.width = itemsContainerWidth+'px'

        // let itemsContainerWidth = carouselItemsContainerEl.value!.offsetWidth
        let eachItemWidth = (itemsContainerWidth/itemsCountToShowPerSlide.value) - 2*itemsMargin.value

        Array.from(childs!).forEach((child ,index)=>{

            child.classList.add('gamon-carousel-item')

            child.style.width = eachItemWidth+'px'
            child.style.minWidth = eachItemWidth+'px'

            child.style.marginLeft = itemsMargin.value+'px'
            child.style.marginRight = itemsMargin.value+'px'

            if(props.eachItemHeight)
                child.style.height = props.eachItemHeight+'px'
        })
    }


    const startAutoNavigate = ()=>{
        autoIntervalValue.value = setInterval(()=>{
            navigate()
        }, autoIntervalDuration.value)
    }

    const stopAutoNavigate = ()=>{
        clearInterval(autoIntervalValue.value)
    }

   

    const responsiveInit = ()=>{
        startScreenSizeChangeListener()
        handleScreenResize()
    }

    const startScreenSizeChangeListener = ()=>{
        window.addEventListener('resize', handleScreenResize)
    }

    const stopScreenSizeChangeListener = ()=>{
        window.removeEventListener('resize', handleScreenResize)
    }


    const handleScreenResize = (e?:Event)=>{
        let carouselParentWidth =   containerEl.value!.clientWidth
        let sizes = Object.keys(props.responsive!).map(Number);


        let sizesLessThanParentWidth = sizes.filter((value)=> value < carouselParentWidth)
        
        let sizesAndParentWidthDiff : number[] = []
        sizesLessThanParentWidth.map((size, index)=>{
            sizesAndParentWidthDiff.push(carouselParentWidth - size)
        })

        let newItemsToShowPerSlide = props.responsive![sizesLessThanParentWidth[sizesAndParentWidthDiff.indexOf(Math.min(...sizesAndParentWidthDiff))]]

        if(newItemsToShowPerSlide != itemsCountToShowPerSlide.value){
            itemsCountToShowPerSlide.value = newItemsToShowPerSlide
            carouselInit()
        }
    }


    // =============================================== navigate by drag
   
    const getMouseMovementDirection = (e:Event) => {

        let direction = 0

        if (e.type == 'mousemove') {
            let mouseCurrentPosition = (e as MouseEvent).clientX
            direction = mouseCurrentPosition - startX.value
            startX.value = mouseCurrentPosition
        }
        else if(e.type == 'touchmove' && e instanceof TouchEvent){
            let mouseCurrentPosition = (e as TouchEvent).changedTouches[0].clientX
            direction = mouseCurrentPosition - startX.value
            startX.value = mouseCurrentPosition
        }
    
        return direction
    }

    const mouseMoveHandler = (e:Event)=>{
        e.preventDefault();
        if(!mouseDown.value) { return; }
        const direction = getMouseMovementDirection(e)


        if(mouseMoveDetectionDelay.value)
            clearTimeout(mouseMoveDetectionDelay.value)

        mouseMoveDetectionDelay.value = setTimeout(()=>{
            if(direction < 0)
                navigate('left')
            else 
                navigate('right')
        },200)
    }

    const startDragging = ()=> mouseDown.value = true;

    const stopDragging = ()=> mouseDown.value = false;
    


    // =============================================== navigate
    const navigate = (navDirection : string|number = 'left', isAutoNavigate : boolean = false)=>{

        if(props.auto && !isAutoNavigate){
            stopAutoNavigate()
            startAutoNavigate()
        }

        if(typeof(navDirection) == 'number') {
            indexOfVisibleItem.value = navDirection
            translation.value =  (-1*navDirection*itemsCountToMovePerSlide.value)*100/itemsCountToShowPerSlide.value
        }
        else {
            let translationFactor = -1;

            if(navDirection == 'left'){
                if((itemsCount.value-1) == indexOfVisibleItem.value){

                    if(props.stopAtEnd)
                        return

                    indexOfVisibleItem.value = 0
                    translationFactor = itemsCount.value - 1
                }
                else{
                    indexOfVisibleItem.value += 1
                    translationFactor = -1
                }
            }
            else if(navDirection == 'right'){
                if(indexOfVisibleItem.value == 0){
                    
                    if(props.stopAtEnd)
                        return

                    indexOfVisibleItem.value = itemsCount.value - 1
                    translationFactor = -1*(itemsCount.value - 1)
                }
                else{
                    indexOfVisibleItem.value -= 1
                    translationFactor = 1
                }

            }

            translation.value +=  (translationFactor*itemsCountToMovePerSlide.value)*100/itemsCountToShowPerSlide.value
        }

        carouselItemsContainerEl.value!.style.transform = 'translateX('+translation.value+'%)'
    }

</script>