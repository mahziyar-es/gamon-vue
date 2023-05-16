<template>
  

    <img v-if="fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/jpg' || fileType == 'image/png'  || fileType == 'image' " class="gamon-input-file__preview" :src="preview">
    <video v-if="fileType == 'video/mp4' " class="gamon-input-file__preview" :src="preview" controls />
    <audio v-if="fileType == 'audio/mpeg' " class="gamon-input-file__preview" :src="preview" controls />
    <embed v-if="fileType == 'application/pdf' " class="gamon-input-file__preview" :src="preview">
    <embed v-if="fileType == 'text/csv' " class="gamon-input-file__preview" :src="preview">
    <embed v-if="fileType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' " class="gamon-input-file__preview" :src="preview">
    <embed v-if="fileType == 'text/plain' " class="gamon-input-file__preview" :src="preview">


  
</template>

<script lang="ts" setup>
    import { ref, onMounted, watch, computed } from 'vue'

    const props = defineProps<{
        file : File|string,
    }>()


    const preview = ref()
    const fileType = ref('')

    onMounted(()=>{
        if(!props.file)
            return 

        fileType.value = props.file instanceof File ? props.file.type : 'image'
        preview.value = props.file instanceof File ? URL.createObjectURL(props.file) : props.file 
    })


</script>