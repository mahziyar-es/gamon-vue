import { ref, reactive } from 'vue'
import type { ToggleAnimations, GamonConfirmConfigOptions } from '@/types/general.type'
import Sheet from '@/components/Sheet/Sheet.vue'

type SheetTypes = InstanceType<typeof Sheet>['type']

const title = ref('')
const text = ref('')
const confirmButtonText = ref('Yes')
const cancelButtonText = ref('No')
const confirmCallback = ref()
const cancelCallback = ref()
const show = ref(false)
const animation = ref<ToggleAnimations>('fade')
const type = ref<SheetTypes>('center')


// setters
const setTitle = (val:string) => {
    title.value = val
}
const setText = (val:string) => {
    text.value = val
}
const setConfirmButtonText = (val:string) => {
    confirmButtonText.value = val
}
const setCancelButtonText = (val:string) => {
    cancelButtonText.value = val
}
const toggle = () => {
    show.value = !show.value
}
const setConfirmCallback = (callback:()=>void) => {
    confirmCallback.value = callback
}
const setCancelCallback = (callback:()=>void) => {
    cancelCallback.value = callback
}
const setanimation = (val:ToggleAnimations) => {
    animation.value = val
}
const setType = (val:SheetTypes) => {
    type.value = val
}

const processGeneralOptions = (options:GamonConfirmConfigOptions) => {
    if (options.confirmButtonText)
        setConfirmButtonText(options.confirmButtonText)
    if (options.cancelButtonText)
        setCancelButtonText(options.cancelButtonText)
    if (options.animation)
        setanimation(options.animation)
    if (options.type)
        setType(options.type)
}




// interface Confirm{
//     setTitle(title: string): void,
//     setText(text: string): void,
//     setConfirmCallback(callback:()=>void): void,
//     setCancelCallback(callback:()=>void): void,
//     setanimation(animation:string): void,
//     toggle(): void,


//     title:string,
//     text:string,
//     confirmCallback:()=>void,
//     cancelCallback:()=>void,
//     show:boolean,
//     animation:string,
// }

const useConfirm = reactive({
    setTitle,
    setText,
    setConfirmButtonText,
    setCancelButtonText,
    setConfirmCallback,
    setCancelCallback,
    setanimation,
    setType,
    toggle,
    processGeneralOptions,

    title,
    text,
    confirmButtonText,
    cancelButtonText,
    confirmCallback,
    cancelCallback,
    show,
    animation,
    type,
})


export { useConfirm }

