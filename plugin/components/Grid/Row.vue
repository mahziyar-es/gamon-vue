<template>
   <div
        :class="['gamon-grid-row']"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    import '@/style/gridRow.css'
</script>