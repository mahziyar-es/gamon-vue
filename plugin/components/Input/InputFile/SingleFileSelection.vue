
<template>
    <div  :class="['gamon-input__input', dragDrop && 'gamon-input-file--drag-drop', ]"  @dragover="dragOverHandler($event)" @drop.prevent="dropHandler($event)">

        <div v-if="preview && finalOutput" class="gamon-input-file__single-file-preview-container" :style="previewSizeObject">
            <img @click.stop="removeSelectedFileHandler()" class="gamon-input-file__single-file-preview-container__remove-file-btn" src="@/assets/icon_delete_circular.png" />
            <InputFilePreview :file="finalOutput" :key="finalOutput" />
            <div class="gamon-input-file__selected-file-name">{{selectedFileName}}</div>
        </div>

        <div v-if="!preview && selectedFileName" class="gamon-input-file__selected-file-name">{{selectedFileName}}</div>

    </div>
</template>



<script setup lang="ts">
    import InputFilePreview from './InputFilePreview.vue'
    import {PreviewSize, FinalOutputSingle,FinalOutputMulti} from '@/types/inputFile.type'


    const props = defineProps<{
        finalOutput : FinalOutputSingle,
        selectedFileName : string,

        previewSizeObject : PreviewSize,
        preview ?: boolean,
        dragDrop ?: boolean,
    }>()



    const emit = defineEmits(['removeSelectedFile', 'fileSelection'])


    const dragOverHandler = (e:Event)=> e.preventDefault();
    

    const dropHandler = (e:DragEvent)=> {
        if(e.dataTransfer && e.dataTransfer.files[0]) emit('fileSelection', e.dataTransfer.files[0])
    }



    const removeSelectedFileHandler = ()=> emit('removeSelectedFile')
    


   
</script>


