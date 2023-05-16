import type { NotifyPositions } from "./notify.type";
import Sheet from '@/components/Sheet/Sheet.vue'
import NotifyTextBox from '@/components/Notify/NotifyTextBox.vue'

type SheetTypes = InstanceType<typeof Sheet>['type']
type NotifyTypes = InstanceType<typeof NotifyTextBox>['type']
type StyleObject = { [index: string]: string }


type ToggleAnimations =  'slide-up'| 'slide-down'| 'slide-left'| 'slide-right'| 'fade'| 'scale'|'rotate'


type Confirm = (
    title: string,
    text: string,
    confirmCallback: () => void,
    cancelCallback?: () => void,
    animation?:  ToggleAnimations,
    type?: SheetTypes,
    confirmButtonText ?: string,
    cancelButtonText?: string,
) => void;


type SheetToggle = (
    id: string,
) => void;




type Notify = (
    text: string,
    type?: NotifyTypes,
    duration?: number,
    animation?: ToggleAnimations,
) => void;


type CallBasedOnResponsiveWidthType = (
    callback: () => void,
    width: string,
    operator: string
) => void;

interface GamonProvide  {
    confirm: Confirm,
    sheetToggle : SheetToggle,
    notify : Notify,
    windowResponsiveWidth : ()=>string,
    callBasedOnResponsiveWidth : CallBasedOnResponsiveWidthType,
}



interface GamonNotifyConfigOptions {
    position?: NotifyPositions,
    animation?: ToggleAnimations,
    duration?:number,
}

interface GamonSheetConfigOptions {
    animation ?: ToggleAnimations,
}

interface GamonConfirmConfigOptions {
    confirmButtonText ?: string,
    cancelButtonText ?: string,
    animation ?: ToggleAnimations,
    type ?: SheetTypes,
}

interface GamonPluginOptions {
    notify: GamonNotifyConfigOptions,
    sheet: GamonSheetConfigOptions,
    confirm: GamonConfirmConfigOptions,
}


export {
    ToggleAnimations,
    Confirm,
    SheetToggle,
    SheetTypes,
    Notify,
    StyleObject,
    GamonProvide,
    GamonPluginOptions,
    CallBasedOnResponsiveWidthType,
    GamonNotifyConfigOptions,
    GamonSheetConfigOptions,
    GamonConfirmConfigOptions,
}