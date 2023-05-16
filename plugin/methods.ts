import { useConfirm } from './components/Confirm/confirm'
import { useSheet } from './components/Sheet/sheet'
import { useNotify } from './components/Notify/notify'
import {
    Confirm,
    SheetToggle,
    Notify,
    GamonProvide
} from '@/types/general.type'
import { windowResponsiveWidth, callBasedOnResponsiveWidth } from './utils'



const confirm : Confirm = (title, text, confirmCallback, cancelCallback?, animation?, type?, confirmButtonText?, cancelButtonText?) => {
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


const sheetToggle : SheetToggle = (id) => {
   useSheet.toggle(id)
}


const notify: Notify = (text, type, duration, animation) => {
    useNotify.setNotify(text, type, duration, animation)
}





const methods: GamonProvide = {
    confirm,
    sheetToggle,
    notify,
    windowResponsiveWidth,
    callBasedOnResponsiveWidth,
}


export default methods