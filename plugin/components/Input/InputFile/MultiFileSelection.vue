<template>
    <div :class="['gamon-input__input', dragDrop && 'gamon-input-file--drag-drop', ]" @dragover="dragOverHandler($event)" @drop.prevent="dropHandler($event)">


        <div v-if="preview" style="display:flex; align-items:center;flex-wrap:wrap">
            <div v-for="(file,index) in finalOutput" :key="index"  class="gamon-input-file__multi-file-preview-container" :style="previewSizeObject">
                <img @click.stop="removeSelectedFileHandler(index)" class="gamon-input-file__multi-file-preview-container__remove-file-btn" src="@/assets/icon_delete_circular.png" />
                <InputFilePreview :file="file" :key="index+''+getTimeStamp()" />
                <span class="gamon-input-file__selected-file-name">{{selectedFileName[index]}}</span>
            </div>
        </div>


        <div v-else style="display:flex; align-items:center;flex-wrap:wrap">
            <div v-for="(name,index) in selectedFileName" :key="index" >
                <div class="gamon-input-file__multi-file-name-preview" >
                    <img @click.stop="removeSelectedFileHandler(index)" class="gamon-input-file__multi-file-name-preview__remove-file-btn" src="@/assets/icon_delete_circular.png" />
                    {{name}}
                </div>
            </div>
        </div>


    </div>
</template>



<script setup lang="ts">
    import InputFilePreview from './InputFilePreview.vue'
    import {PreviewSize, FinalOutputSingle,FinalOutputMulti} from '@/types/inputFile.type'
    import {getTimeStamp} from '@/utils'

    const props = defineProps<{
        finalOutput : FinalOutputMulti,
        selectedFileName : string[],

        previewSizeObject : PreviewSize,
        preview ?: boolean,
        dragDrop ?: boolean,
    }>()


    const emit = defineEmits(['removeSelectedFile', 'fileSelection'])


    const dragOverHandler = (e:Event)=> e.preventDefault();
    

    const dropHandler = (e:DragEvent)=> {
        if(props.dragDrop && e.dataTransfer && e.dataTransfer.files[0]) emit('fileSelection', e.dataTransfer.files[0])
    }


    const removeSelectedFileHandler = (index:number)=> emit('removeSelectedFile', index)


</script>

