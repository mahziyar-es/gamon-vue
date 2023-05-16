<template>
    <div class="gamon-cropper"  ref="container"
        @mouseup="resizerMouseup($event)"
        @mouseleave="resizerMouseleave($event)"

        @touchend.passive="resizerMouseleave($event)"
    >
        
        <img class="gamon-cropper__image" ref="cropperImage">

        <div class="gamon-cropper__window" ref="cropperWindow"  :style="{width: cropperWindowDims.width, height: cropperWindowDims.height}"
            @mousedown="mousedownHandler($event)"
            @mouseup="mouseupHandler($event)"
            @mouseleave="mouseupHandler($event)"
            @mousemove="mousemoveHandler($event)"


            @touchstart.passive="mousedownHandler($event)"
            @touchend.passive="mouseupHandler($event)"
            @touchmove.passive="mousemoveHandler($event)"
        >
            <div class="gamon-cropper__resize-handle-container">
                <div v-if="showCropperWindowResizer" class="gamon-cropper__resize-handle" ref="resizerEl"
                    @mousedown="resizerMousedown($event)"
                    @mousemove="resizerMousemove($event)"

                    @touchstart.passive="resizerMousedown($event)"
                    @touchmove.passive="resizerMousemove($event)"
                ></div>
            </div>
        </div>

        <canvas class="gamon-cropper__canvas" ref="croppingCanvas" ></canvas>
    </div>
    <div class="gamon-cropper__done_button_container">
        <Button @click="updateModelValue()" text="Done" class="gamon-cropper__done_button" />
    </div>
</template>




<script setup lang="ts">
    import {ref, onUpdated, onMounted, watch, computed} from 'vue'
    import {useSheet} from '@/components/Sheet/sheet'
    import Button from '@/components/Button/Button.vue'
    import '@/style/cropper.css'


    const props = defineProps<{
        modelValue ?: string,
        image ?: File,
        output ?:  {
            width:number,
            height:number,
            type:string,
        },
        cropper ?: {
            width:number,
            height:number,
        },
    }>()

    const croppingCanvas = ref<HTMLCanvasElement>()
    const cropperImage = ref<HTMLImageElement>()
    const cropperWindow = ref<HTMLElement>()
    const container = ref<HTMLElement>()
    const resizerEl = ref<HTMLElement>()
    const cropperWindowPositionChanged = ref<boolean>(false)
    const showCropperWindowResizer = ref<boolean>(true)
    const mouseIsDown = ref(false)
    const imageToBeCropped = ref()
    const cropperWindowDims = ref({width:'90%', height:'90%'})
    const resizeMouseIsDown = ref(false)
    const resizerLastPosition = ref({x:0, y:0})


    
    const emit = defineEmits(['update:modelValue','done'])

    const updateModelValue = async ()=>{
        if(resizeMouseIsDown.value || mouseIsDown.value)
            return 

        cropper()
    }


    onMounted(()=>{
        init()
    })

    watch(()=>props.image, ()=>{
        init()
    })
   

    const init = ()=>{

        if(props.image instanceof File)
            imageToBeCropped.value = URL.createObjectURL(props.image)
        else 
            imageToBeCropped.value = props.image

        cropperImage.value!.src = imageToBeCropped.value


        // setting the cropper window dims
        if(props.cropper && props.cropper.width)
            cropperWindowDims.value.width = props.cropper.width + 'px'
        if(props.cropper && props.cropper.height)
            cropperWindowDims.value.height = props.cropper.height + 'px'

        if(props.cropper && props.cropper.width && props.cropper.height){
            showCropperWindowResizer.value = false
        }
    }



    const resizerMousedown = ()=>{
        resizeMouseIsDown.value = true
    }
    const resizerMouseup = ()=>{
        if(!resizeMouseIsDown.value) return 
        resizeMouseIsDown.value = false
    }
    const resizerMouseleave = ()=>{
        if(!resizeMouseIsDown.value) return 
        resizeMouseIsDown.value = false
    }
    const resizerMousemove = (e:MouseEvent|TouchEvent)=>{
        if(!resizeMouseIsDown.value) return

        let movementSpeed = cropperWindowPositionChanged.value ? 1 : 2

        const [xDirection, yDirection] = detectResizerMoveDirection(e)

        const cropperWBoundingRect = cropperWindow.value!.getBoundingClientRect()

        if (!(props.cropper && props.cropper.width)) {
            cropperWindowDims.value.width = (cropperWBoundingRect.width) + 1 * (xDirection * movementSpeed) + 'px'
        }
        if(! (props.cropper && props.cropper.height) )
            cropperWindowDims.value.height = ( (cropperWBoundingRect.height) + 1*(yDirection * movementSpeed ) ) +'px'
    }


    const detectResizerMoveDirection = (e:MouseEvent|TouchEvent)=>{
        let xDirection = 0
        let yDirection = 0

        if(e instanceof MouseEvent){
            xDirection = e.movementX
            yDirection = e.movementY
        } else {
            xDirection = resizerLastPosition.value.x == 0 ? 0 : e.changedTouches[0].clientX - resizerLastPosition.value.x 
            yDirection = resizerLastPosition.value.y == 0 ? 0 : e.changedTouches[0].clientY - resizerLastPosition.value.y 

            resizerLastPosition.value.x = e.changedTouches[0].clientX
            resizerLastPosition.value.y = e.changedTouches[0].clientY
        }

        return [xDirection, yDirection]
    }
    

    // ========================================= mouse event handler
   

    const mousedownHandler = (e:MouseEvent)=>{
        mouseIsDown.value = true
    }

    const mouseupHandler = (e:MouseEvent)=>{
        if(!mouseIsDown.value) return 
        mouseIsDown.value = false
    }

    const mousemoveHandler = (e:MouseEvent|TouchEvent)=>{
        
        e.stopPropagation()

        if(!mouseIsDown.value || resizeMouseIsDown.value) return 

        cropperWindowPositionChanged.value = true

        const cropperWindowBoundingRect = cropperWindow.value!.getBoundingClientRect()
        const containerBoundingRect = container.value!.getBoundingClientRect()

        let [mouseX, mouseY] = [0,0]

        if(e instanceof MouseEvent){        
            mouseX = e.clientX
            mouseY = e.clientY
        } else if (e instanceof TouchEvent){
            mouseX = e.changedTouches[0].clientX
            mouseY = e.changedTouches[0].clientY
        }


        let fromLeft = (mouseX - cropperWindowBoundingRect.width/2 - containerBoundingRect.left )
        let fromTop = (mouseY - cropperWindowBoundingRect.height/2  - containerBoundingRect.top ) 


        cropperWindow.value!.style.left = fromLeft  +'px'
        cropperWindow.value!.style.top = fromTop +'px'
        cropperWindow.value!.style.right = 'unset'
        cropperWindow.value!.style.bottom = 'unset'
    }    





    // ======================================= cropper logic
    const cropper = async ()=>{

        var image = new Image();
        image.src = imageToBeCropped.value;


        const croppingCanvasCtx = croppingCanvas.value!.getContext('2d');


        image.onload = async ()=>{
            const originalWidth = image.naturalWidth;
            const originalHeight = image.naturalHeight;
            const aspectRatio = originalWidth/originalHeight;


            const imageBoundingBox = cropperImage.value!.getBoundingClientRect()
            const displayWidth = Math.round( imageBoundingBox.width )
            const displayHeight = Math.round( imageBoundingBox.height )

            const xRatio = (originalWidth/displayWidth)
            const yRatio = (originalHeight/displayHeight)



            // let newWidth = 100 * xRatio;
            // let newHeight = (newWidth/aspectRatio)*yRatio;

            const cropperWindowBoundingRect = cropperWindow.value!.getBoundingClientRect()

            let newWidth = cropperWindowBoundingRect.width * xRatio
            let newHeight = cropperWindowBoundingRect.height *yRatio



            // let outputWidth = 200;
            // let outputHeight = 200;

            
            let outputWidth = newWidth;
            let outputHeight = newHeight;

            if(props.output && props.output.width)
                outputWidth = props.output.width
            if(props.output && props.output.height)
                outputHeight = props.output.height 
          

            const containerBoundingRect = container.value!.getBoundingClientRect()
            let x = (cropperWindowBoundingRect.left - containerBoundingRect.left) * xRatio
            let y = (cropperWindowBoundingRect.top - containerBoundingRect.top) * yRatio


            croppingCanvas.value!.width = outputWidth
            croppingCanvas.value!.height = outputHeight

            
            croppingCanvasCtx!.drawImage(image, x , y, newWidth, newHeight, 0, 0, outputWidth, outputHeight)


            // resize
            // croppingCanvasCtx!.drawImage(image, 0 , 0, newWidth, newHeight)

            let output = await getImageDataFromCanvas()
            emit('update:modelValue', output)
            emit('done')
        }

    }


    const downloadOutput = async (e:Event)=>{
        e.preventDefault()

        let tempLink = document.createElement('a');
  
        let fileName = `output.png`;
        
        tempLink.download = fileName;
        tempLink.href = await getImageDataFromCanvas()
    
        tempLink.click();
    }


    const getImageDataFromCanvas = async () =>{
        return croppingCanvas.value!.toDataURL("image/png", 0.9);
    }    


</script>
