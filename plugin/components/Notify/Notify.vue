<template>
    <div :class="['gamon-notify', 'gamon-notify--position-'+useNotify.defaultPosition]" ref="notifyEl">
        <NotifyTextBox v-for="(notify, index) in useNotify.notifies" 
            :key="index" 
            :text="notify.text" 
            :type="notify.type" 
            :duration="notify.duration" 
            :animation="notify.animation" 
            :parentEl="notifyEl!"
        />
    </div>
</template>




<script setup lang="ts">
    import {ref} from 'vue'
    import {useNotify} from '@/components/Notify/notify'
    import NotifyTextBox from '@/components/Notify/NotifyTextBox.vue'
    import '@/style/notify.css'


    const notifyEl = ref<HTMLElement>()
</script>