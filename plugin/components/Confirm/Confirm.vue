<template>
    <Sheet 
        width="300px" 
        min-height="200px" 
        :display="useConfirm.show" 
        :animation="useConfirm.animation"
        :type="useConfirm.type"
        :backdrop-click-callback="cancel"
        dismiss-disabled
        >

        <div class="gamon-confirm">
            <div class="gamon-confirm__body">
                <h3 class="gamon-confirm__title">{{useConfirm.title}}</h3>
                <p class="gamon-confirm__text">{{useConfirm.text}}</p>
            </div>
            <div class="gamon-confirm__buttons">
                <button class="gamon-confirm__buttons__confirm" @click="confirm()">  {{  useConfirm.confirmButtonText  }}  </button>
                <button class="gamon-confirm__buttons__cancel" @click="cancel()">{{  useConfirm.cancelButtonText }}</button>
            </div>  
        </div>

    </Sheet>
</template>


<script setup lang="ts">
    import { useConfirm } from '@/components/Confirm/confirm'
    import Sheet from '@/components/Sheet/Sheet.vue'
    import '@/style/confirm.css'


    const cancel = ()=>{
        useConfirm.toggle()
        useConfirm.cancelCallback?.()
    }


    const confirm = ()=>{
        useConfirm.confirmCallback?.()
        useConfirm.toggle()
    }

</script>
