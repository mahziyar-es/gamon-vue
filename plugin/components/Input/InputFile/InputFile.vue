<template>
    <InputLayout :title="title" :icon="icon" >

        <input class="gamon-input-file__input"  type="file"  @change="checkForCropper($event.target.files[0])" :required="props.required" ref="fileBrowserInputEl" :accept="acceptableFileTypes">


        <div @click="openFileBrowser()" class="gamon-input-file">
            <input v-if="computedPlaceholder" :placeholder="computedPlaceholder" class="gamon-input__input" readonly>

            <SingleFileSelection v-if="!computedPlaceholder && !multi"
                :finalOutput="finalOutput"
                :selectedFileName="selectedFileNames"
                :previewSizeObject="previewSizeObject"
                :preview="preview"
                :dragDrop="dragDrop"

                @remove-selected-file="removeFilefromFinalOutput"
                @file-selection="checkForCropper"
            />

            <MultiFileSelection v-if="!computedPlaceholder && multi"
                :finalOutput="finalOutput"
                :selectedFileName="selectedFileNames"
                :previewSizeObject="previewSizeObject"
                :preview="preview"
                :dragDrop="dragDrop"

                @remove-selected-file="removeFilefromFinalOutput"
                @file-selection="checkForCropper"
            />

        </div>


        <Sheet ref="cropperModalEl" >
            <Cropper v-model="croppedImage" :image="imageFileToBeCropped" @done="croppingDone" />
        </Sheet>

    </InputLayout>


</template>




<script setup lang="ts">
    import {ref, computed, onMounted, watch} from 'vue'
    import {showAnimation , hideAnimation, prepareValueForStyleObject} from '@/utils'
    import Cropper from '@/components/Cropper/Cropper.vue'
    import InputLayout from '@/components/Input/InputLayout.vue'
    import Sheet from '@/components/Sheet/Sheet.vue'
    import SingleFileSelection from './SingleFileSelection.vue'
    import MultiFileSelection from './MultiFileSelection.vue'
    import {FinalOutputSingle,FinalOutputMulti} from '@/types/inputFile.type'
    import '@/style/inputFile.css'

 

    const props = defineProps<{
        modelValue ?: any,
        title ?: string,
        placeholder ?: string,
        required ?: boolean,
        accept ?: string,
        video ?: boolean,
        audio ?: boolean,
        image ?: boolean,
        preview ?: boolean,
        multi ?: boolean,
        maxSize ?: number,
        dragDrop ?: boolean,
        cropper ?: boolean,
        icon ?: string,
        previewSize ?:  {
            width ?:number|string,
            height ?:number|string,
            maxWidth ?:number|string,
            maxHeight ?:number|string,
        },
    }>()



    const fileBrowserInputEl = ref<HTMLElement>()
    const previewSizeObject = ref({width:'100%', height:'100%', maxWidth:'100%', maxHeight:'100%'})
    const cropperModalEl =  ref()
    const imageFileToBeCropped =  ref()
    const croppedImage =  ref<File|string>('')
    const finalOutput =  ref<FinalOutputSingle | FinalOutputMulti>(props.multi ? [] : '')
    const selectedFileNames =  ref<string | string[]>(props.multi ? [] : '')


    const openFileBrowser = ()=> fileBrowserInputEl.value!.click()


    const computedPlaceholder = computed(()=>{
        if(props.multi) return (finalOutput.value as FinalOutputMulti).length == 0 ? props.placeholder : ''
        else return finalOutput.value ? '' : props.placeholder
    })


    const acceptableFileTypes = computed(()=>{
        if(props.accept)
            return props.accept
        else{
            let types = ''
            if(props.video)
                types += 'video/*'
            if(props.audio)
                types += ',audio/*'
            if(props.image)
                types += ',image/*'

            return types
        }
    })



    onMounted(()=>{
        if (props.previewSize) {
            if(props.previewSize.width)
                previewSizeObject.value.width = prepareValueForStyleObject(props.previewSize.width)
            if(props.previewSize.height)
                previewSizeObject.value.height = prepareValueForStyleObject(props.previewSize.height)
            if(props.previewSize.maxWidth)
                previewSizeObject.value.maxWidth = prepareValueForStyleObject(props.previewSize.maxWidth)
            if(props.previewSize.maxHeight)
                previewSizeObject.value.maxHeight = prepareValueForStyleObject(props.previewSize.maxHeight)
        }
    })

    
    const emit = defineEmits(['update:modelValue'])

    const updateModelValue = ()=>{
        emit('update:modelValue', finalOutput.value)
    }

    watch(() => props.modelValue, () => {
        if(!props.modelValue) clear()
    })

    watch(()=>props.multi ? (finalOutput.value as FinalOutputMulti).length : finalOutput.value  , ()=>{
        updateModelValue()
    })

    const clear = () => {
        finalOutput.value = ''    
        selectedFileNames.value = ''
    }


    // ========================================== cropper
    
    const openCropper = (file:File)=>{
        imageFileToBeCropped.value = file
        cropperModalEl.value.show()
    }
   
    const closeCropper = ()=>{
        cropperModalEl.value.hide()
    }
   
    const croppingDone = ()=>{
        closeCropper()
        addFileToFinalOutput(croppedImage.value)
    }
   
    const checkForCropper = (file:File)=>{
        if(!file) return

        saveSelectedFileName(file)

        if(props.cropper) openCropper(file)
        else addFileToFinalOutput(file)
    }


    const saveSelectedFileName = (file:File) => {
        if(props.multi) (selectedFileNames.value as string[]).push(file.name)
        else selectedFileNames.value = file.name    
    }


    const addFileToFinalOutput = (file:File|string) => {
        if(props.multi) (finalOutput.value as FinalOutputMulti).push(file)
        else finalOutput.value = file    
    }

    const removeFilefromFinalOutput = (index?:number) => {
        if(props.multi) {
            (finalOutput.value as FinalOutputMulti).splice(index!, 1);
            (selectedFileNames.value as string[]).splice(index!, 1);
        }
        else {
            finalOutput.value = ''    
            selectedFileNames.value = ''
        }
    }




</script>
