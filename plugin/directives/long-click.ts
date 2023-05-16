import { DirectiveBinding, ObjectDirective, ref } from 'vue'

type TimeoutType = ReturnType<typeof setTimeout>

interface DirectiveElement extends HTMLElement {
    callbackFunction : (e?: MouseEvent | TouchEvent)=>void,
    interval : TimeoutType | number,
}

const longClickDirective : ObjectDirective = {

    mounted(el: DirectiveElement, binding: DirectiveBinding) {
        el.dataset.seconds = binding.arg as unknown as string || '1000'
        el.callbackFunction = binding.value

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





const mousedownHandler = (e : MouseEvent|TouchEvent, el: DirectiveElement) => {
    let counter = 0
    const seconds = Number(el.dataset.seconds)
    const callback = el.callbackFunction

    el.interval = setInterval(() => {

        counter += 100

        if (counter >= seconds) {
            counter = 0
            clearInterval(el.interval as TimeoutType)
            
            callback?.(e)
        }
        
    },100)
}


const mouseupHandler = (e: MouseEvent | TouchEvent, el: DirectiveElement) => {
    clearInterval(el!.interval as TimeoutType)
}


export default longClickDirective