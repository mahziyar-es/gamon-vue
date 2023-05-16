import { DirectiveBinding, ObjectDirective, ref } from 'vue'


type TimeoutType = ReturnType<typeof setTimeout>

interface DirectiveElement extends HTMLElement {
    clickCallback : (e?: MouseEvent | TouchEvent)=>void,
    longClickCallback : (e?: MouseEvent | TouchEvent)=>void,
    interval : TimeoutType | number,
}

interface BindingValue extends DirectiveBinding{
    click_callback : ()=>void,
    long_click_callback : ()=>void,
    long_click_duration ?: string,
}

const customClickDirective : ObjectDirective = {

    mounted(el: DirectiveElement, binding: DirectiveBinding) {
        const bindingValue = binding.value as BindingValue

        el.dataset.seconds = bindingValue.long_click_duration || '1000'
        el.clickCallback = bindingValue.click_callback
        el.longClickCallback = bindingValue.long_click_callback

        el.addEventListener('mousedown',  (e)=>mousedownHandler(e, el) )
        el.addEventListener('mouseup', (e) => mouseupHandler(e, el) )
        el.addEventListener('touchstart', (e) => mousedownHandler(e, el) )
        el.addEventListener('touchend', (e) =>mouseupHandler(e, el))

    },


    unmounted(el:DirectiveElement) {
        el.removeEventListener('mousedown', (e)=>mousedownHandler (e, el))
        el.removeEventListener('mouseup', (e)=>mouseupHandler(e, el))
        el.removeEventListener('touchstart', (e)=>mousedownHandler (e, el))
        el.removeEventListener('touchend', (e)=>mouseupHandler (e, el))
    }

}





const mousedownHandler = (e: MouseEvent | TouchEvent, el: DirectiveElement) => {
    let counter = 0
    const longClickDuration = Number(el.dataset.seconds)

    el.interval = setInterval(() => {
        counter += 100
        if (counter >= longClickDuration) {
            counter = 0
            clearInterval(el.interval as TimeoutType)
            el.interval = -1
            el.longClickCallback?.(e)
        }
    },100)
}


const mouseupHandler = (e: MouseEvent | TouchEvent, el: DirectiveElement) => {
    if (el.interval != -1) el.clickCallback?.(e)
    clearInterval(el!.interval as TimeoutType)
}


export default customClickDirective