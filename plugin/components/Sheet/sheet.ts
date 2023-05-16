import type { GamonSheetConfigOptions, ToggleAnimations } from '@/types/general.type'
import { ref, reactive } from 'vue'
import { showAnimation, hideAnimation } from '@/utils'

const animation = ref<ToggleAnimations>('fade')
const activeModalIds = ref<string[]>([])



const toggle = (id: string) => {
    const modalElement = document.getElementById(id)

    if (activeModalIds.value.indexOf(id) == -1) {   
        activeModalIds.value.push(id)
        showAnimation(modalElement!)
    }
    else {
        activeModalIds.value.splice(activeModalIds.value.indexOf(id), 1)
        hideAnimation(modalElement!)
    }

}


const setAnimation = (val: ToggleAnimations) => {
    animation.value = val
}


const processGeneralOptions = (options: GamonSheetConfigOptions) => {
    if (options.animation)
        setAnimation(options.animation)
}




const useSheet = reactive({
    toggle,
    setAnimation,
    processGeneralOptions,
    animation,
})

export {useSheet}