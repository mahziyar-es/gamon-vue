import type { ToggleAnimations, GamonNotifyConfigOptions, Notify } from '@/types/general.type'
import type { NotifyPositions } from '@/types/notify.type'
import { ref, reactive } from 'vue'
import NotifyTextBox from '@/components/Notify/NotifyTextBox.vue'

type NotifyTypes = InstanceType<typeof NotifyTextBox>['type']

type NotifyObject = {
    text:string,
    type:NotifyTypes,
    duration:number,
    animation:ToggleAnimations,
}

const notifies = ref<NotifyObject[]>([])
const defaultPosition = ref<NotifyPositions>('top-right')
const defaultDuration = ref<number>(4000)
const defaultAnimation = ref<ToggleAnimations>('fade')



const setNotify = (text: string | string[], type : NotifyTypes = ''  ,duration ?: number, animation ?: ToggleAnimations) => {
    if (typeof (text) == 'string')
        text = [text]
    
    text.forEach((notifyText) => {
        notifies.value.push({
            text:notifyText,
            type:type,
            duration:duration || defaultDuration.value,
            animation:animation || defaultAnimation.value,
        })
    })    
}




const processGeneralOptions = (options: GamonNotifyConfigOptions) => {
    if (options.position)
        defaultPosition.value = options.position
    if (options.duration)
        defaultDuration.value = options.duration
    if (options.animation)
        defaultAnimation.value = options.animation
}



const useNotify = reactive({
    setNotify,
    processGeneralOptions,
    notifies,
    defaultPosition,
})



export {useNotify}