import type { NotifyPositions } from '@/types/notify.type'
import Sheet from '@/components/Sheet/Sheet.vue'

type StyleObject = { [index: string]: string }
type ToggleAnimations =  'slide-up'| 'slide-down'| 'slide-left'| 'slide-right'| 'fade'| 'scale'|'rotate'


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
    type ?: InstanceType<typeof Sheet>['type'],
}


interface GamonPluginOptions {
    notify: GamonNotifyConfigOptions,
    sheet: GamonSheetConfigOptions,
    confirm: GamonConfirmConfigOptions, 
}


export {
    ToggleAnimations,
    StyleObject,
    GamonNotifyConfigOptions,
    GamonSheetConfigOptions,
    GamonConfirmConfigOptions,
    GamonPluginOptions,
}