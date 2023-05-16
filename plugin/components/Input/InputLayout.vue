<template>
    <div class="gamon-input">
        <p v-if="title" class="gamon-input__title">{{props.title}}</p>
        <div :class="['gamon-input__icon-container', props.class]" :style="props.style">
            <div v-if="icon" class="gamon-input__icon-container__icon">
                <img :src="icon">
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {ref} from 'vue'
    import '@/style/inputLayout.css'

    const props = defineProps<{
        title ?: string,
        icon?: string,
        
        class ?: string,
        style ?: string,
    }>()
</script>
