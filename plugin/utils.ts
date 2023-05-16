const showAnimation = (el: HTMLElement, callback?: () => void) => {
    el.style.display='block'
    setTimeout(()=>{
        el.classList.add('gamon-display-toggle--show')
        if(callback)
            callback()
    },10)
}


const hideAnimation = (el:HTMLElement, callback?:()=>void)=>{
    el.classList.remove('gamon-display-toggle--show')
    setTimeout(()=>{
        el.style.display = 'none'
        if(callback)
            callback()
    },150)
}




const toggleAnimation = (el: HTMLElement, callback?: () => void) => {

    const elIsVisible = (el.style.display == '' || el.style.display == 'none') ? false : true;

    if (elIsVisible) {
        hideAnimation(el, () => {
            if(callback)
                callback()
        })
    }
    else {
        showAnimation(el, () => {
            if(callback)
                callback()
        })
    }
}




const fixedDigits = (number: number, digits : number = 2 ): string => {
    
    let inputLength = String(number).length

    if (inputLength < digits) {
        let finalValue = String(number)
        for (let i = 1; i <= digits - inputLength; i++){
            finalValue = '0'+finalValue
        }
        return finalValue
        
    } else {
        return String(number)
    }

}



const convertCssStringToStyleObject = (css?:any) => {
    if (!css) return undefined

    if(typeof css != 'string') return css

    const styles = css.split(';')
    const styleObject: {[index: string]: string} = {}

    styles.forEach(style => {
        const [key, value] = style.split(':')
        styleObject[key] = value
    })

    return styleObject
}


const prepareValueForStyleObject = (value:string|number): string => {
    return typeof(value) == 'string' ? value : value+'px'
}


const getTimeStamp = (): number => {
    return new Date().getTime()
}



const responsiveWidthSizes = {
    'xs' : 0,
    'sm' : 576,
    'md' : 768,
    'lg' : 992,
    'xl' : 1200,
    'xxl' : 1400,
}

const windowResponsiveWidth = (): string => {
    const width = window.innerWidth

    const keys = Object.keys(responsiveWidthSizes)
    const values = Object.values(responsiveWidthSizes)

    let resWidth = ''
    values.forEach((size, index) => {
        if(width >= size) resWidth = keys[index] 
    })

    return resWidth
}



const callBasedOnResponsiveWidth = (
    callback: () => void,
    width: string,
    operator: string = '=='
) => {
    const windowWidth = window.innerWidth

    const keys = Object.keys(responsiveWidthSizes)
    const values = Object.values(responsiveWidthSizes)

    const chosenKeyIndex = keys.indexOf(width)

    if (chosenKeyIndex == -1 ||  (operator == '<=' && chosenKeyIndex == keys.length - 1) ) {
        console.error('Wrong width key')
        return
    }

    let currentResponsiveWidthNumber = 0
    let currentResponsiveWidth = ''
    let chosenResponsiveWidthNumber = values[chosenKeyIndex]
    let chosenResponsiveWidthUpperNumber = values[chosenKeyIndex + 1]
    
    values.forEach((size, index) => {
        if (windowWidth >= size) {
            currentResponsiveWidth = keys[index] 
            currentResponsiveWidthNumber = size
        }
    })

    
    switch (operator) {
        case "==":
            if (currentResponsiveWidth == width) callback()
            break
        case ">=":
            if (windowWidth >= chosenResponsiveWidthNumber) callback()
            break
        case "<=":
            if (windowWidth < chosenResponsiveWidthUpperNumber) callback()
            break
        default:
            break
    }
}


const gregorian_to_jalali = (gy:number,gm:number,gd:number)=>{
    var g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
    var jy=(gy<=1600)?0:979;
    gy-=(gy<=1600)?621:1600;
    var gy2=(gm>2)?(gy+1):gy;
    var days=(365*gy) +(Math.floor((gy2+3)/4)) -(Math.floor((gy2+99)/100)) +(Math.floor((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
    jy+=33*(Math.floor(days/12053));
    days%=12053;
    jy+=4*(Math.floor(days/1461));
    days%=1461;
    jy+=Math.floor((days-1)/365);
    if(days > 365)days=(days-1)%365;
    var jm=(days < 186)?1+Math.floor(days/31):7+Math.floor((days-186)/30);
    var jd=1+((days < 186)?(days%31):((days-186)%30));
    return [jy,jm,jd];
}

const jalali_to_gregorian = (jy:number,jm:number,jd:number)=>{
    var gy=(jy<=979)?621:1600;
    jy-=(jy<=979)?0:979;
    var days=(365*jy) +((Math.floor(jy/33))*8) +(Math.floor(((jy%33)+3)/4))
            +78 +jd +((jm<7)?(jm-1)*31:((jm-7)*30)+186);
    gy+=400*(Math.floor(days/146097));
    days%=146097;
    if(days > 36524){
        gy+=100*(Math.floor(--days/36524));
        days%=36524;
        if(days >= 365)days++;
    }
    gy+=4*(Math.floor((days)/1461));
    days%=1461;
    gy+=Math.floor((days-1)/365);
    if(days > 365)days=(days-1)%365;
    var gd=days+1;
    var sal_a=[0,31,((gy%4==0 && gy%100!=0) || (gy%400==0))?29:28,31,30,31,30,31,31,30,31,30,31];
    var gm
    for(gm=0;gm<13;gm++){
        var v=sal_a[gm];
        if(gd <= v)break;
        gd-=v;
    }
    return [gy,gm,gd];
}






export {
    showAnimation,
    hideAnimation,
    toggleAnimation,
    fixedDigits,
    convertCssStringToStyleObject,
    prepareValueForStyleObject,
    getTimeStamp,
    windowResponsiveWidth,
    callBasedOnResponsiveWidth,
    gregorian_to_jalali,
    jalali_to_gregorian,
    responsiveWidthSizes,
}