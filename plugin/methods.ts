import { useConfirm } from './components/Confirm/confirm'
import { useSheet } from './components/Sheet/sheet'
import { useNotify } from './components/Notify/notify'
import {
    ToggleAnimations,
} from '@/types/general.type'
import { windowResponsiveWidth, callBasedOnResponsiveWidth } from './utils'
import NotifyTextBox from '@/components/Notify/NotifyTextBox.vue'
import Sheet from '@/components/Sheet/Sheet.vue'


const confirm  = (
    title: string,
    text: string,
    confirmCallback: () => void,
    cancelCallback?: () => void,
    animation?:  ToggleAnimations,
    type?: InstanceType<typeof Sheet>['type'],
    confirmButtonText ?: string,
    cancelButtonText?: string,
) => {
    useConfirm.setTitle(title)
    useConfirm.setText(text)
    useConfirm.setConfirmCallback(confirmCallback)

    if(cancelCallback)
        useConfirm.setCancelCallback(cancelCallback)
    if (animation)
        useConfirm.setanimation(animation)
    if (confirmButtonText)
        useConfirm.setConfirmButtonText(confirmButtonText)
    if(cancelButtonText)
        useConfirm.setCancelButtonText(cancelButtonText)
    if(type)
        useConfirm.setType(type)

    useConfirm.toggle()
}


const sheetToggle =  (id: string) => {
   useSheet.toggle(id)
}


const notify = (
    text: string,
    type?: InstanceType<typeof NotifyTextBox>['type'],
    duration?: number,
    animation?: ToggleAnimations,
) => {
    useNotify.setNotify(text, type, duration, animation)
}





const methods = {
    confirm,
    sheetToggle,
    notify,
    windowResponsiveWidth,
    callBasedOnResponsiveWidth,
}


export default methods