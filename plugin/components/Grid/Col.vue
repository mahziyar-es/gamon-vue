<template>
    <div
        :class="['gamon-grid-col', props.width]"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    import '@/style/gridCol.scss'

    const props = defineProps<{
        width?: string,
    }>()

</script>