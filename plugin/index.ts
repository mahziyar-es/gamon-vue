import { App, createApp } from 'vue'
import Main from './components/Main.vue'
import Button from './components/Button/Button.vue'
import Sheet from './components/Sheet/Sheet.vue'
import InputLayout from './components/Input/InputLayout.vue'
import InputBasic from './components/Input/InputBasic.vue'
import InputTextarea from './components/Input/InputTextarea.vue'
import InputSelect from './components/Input/InputSelect.vue'
import InputFile from './components/Input/InputFile/InputFile.vue'
import InputToggle from './components/Input/InputToggle.vue'
import InputRadio from './components/Input/InputRadio.vue'
import InputCheckbox from './components/Input/InputCheckbox.vue'
import InputRange from './components/Input/InputRange.vue'
import InputDate from './components/Input/InputDate.vue'
import Timepicker from './components/Input/Timepicker.vue'
import Carousel from './components/Carousel/Carousel.vue'
import Picker from './components/Picker/Picker.vue'
import Progressbar from './components/Progressbar/Progressbar.vue'
import Cropper from './components/Cropper/Cropper.vue'
import Stepper from './components/Stepper/Stepper.vue'
import Loading from './components/Loading/Loading.vue'
import GrabScroll from './components/GrabScroll/GrabScroll.vue'
import Row from './components/Grid/Row.vue'
import Col from './components/Grid/Col.vue'
import TabBar from './components/TabBar/TabBar.vue'
import F from './components/F/F.vue'

import methods from './methods'

import {useNotify} from './components/Notify/notify'
import { useButton } from './components/Button/button'
import { useSheet } from './components/Sheet/sheet'
import { useConfirm } from './components/Confirm/confirm'

import longClickDirective from '@/directives/long-click'
import customClickDirective from '@/directives/custom-click'

import type { GamonPluginOptions } from './types/general.type'

import '@/style/general.css'
import '@/style/animation.css'
import '@/style/utils.scss'




declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        Button: typeof Button;
        Sheet: typeof Sheet;
        InputBasic: typeof InputBasic;
        InputTextarea: typeof InputTextarea;
        InputSelect: typeof InputSelect;
        InputFile: typeof InputFile;
        InputToggle: typeof InputToggle;
        InputRadio: typeof InputRadio;
        InputCheckbox: typeof InputCheckbox;
        InputRange: typeof InputRange;
        InputDate: typeof InputDate;
        Timepicker: typeof Timepicker;
        Carousel: typeof Carousel;
        Picker: typeof Picker;
        Progressbar: typeof Progressbar;
        Cropper: typeof Cropper;
        Stepper: typeof Stepper;
        Loading: typeof Loading;
        GrabScroll: typeof GrabScroll;
        Row: typeof Row;
        Col: typeof Col;
        TabBar: typeof TabBar;
        F: typeof F;
    }
}

export default {
    install: (app: App, options?: GamonPluginOptions) => {
        
        

        if (options) {
            if (options.notify) {
                useNotify.processGeneralOptions(options.notify)
            }
            if (options.sheet) {
                useSheet.processGeneralOptions(options.sheet)
            }
            if (options.confirm) {
                useConfirm.processGeneralOptions(options.confirm)
            }
        }



        const pluginAppElement = document.createElement('div')
        document.body.appendChild(pluginAppElement);
        createApp(Main).mount(pluginAppElement)





        // components
        app.component('Button', Button)
        app.component('Carousel', Carousel)
        app.component('Cropper', Cropper)
        app.component('InputBasic', InputBasic)
        app.component('InputCheckbox', InputCheckbox)
        app.component('InputRadio', InputRadio)
        app.component('InputRange', InputRange)
        app.component('InputSelect', InputSelect)
        app.component('InputTextarea', InputTextarea)
        app.component('InputToggle', InputToggle)
        app.component('Timepicker', Timepicker)
        app.component('InputDate', InputDate)
        app.component('InputFile', InputFile)
        app.component('Picker', Picker)
        app.component('Progressbar', Progressbar)
        app.component('Sheet', Sheet)
        app.component('Stepper', Stepper)
        app.component('Loading', Loading)
        app.component('GrabScroll', GrabScroll)
        app.component('Row', Row)
        app.component('Col', Col)
        app.component('TabBar', TabBar)
        app.component('F', F)




        // directives
        app.directive('long-click', longClickDirective)
        app.directive('custom-click', customClickDirective)


       


        app.provide('Gamon', methods)
        app.config.globalProperties.Gamon = methods


    },
}



export {methods as Gamon}
export * from './types/general.type'
export * from './types/inputFile.type'
export * from './types/notify.type'
