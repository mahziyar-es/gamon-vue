# gamon-vue
gamon-vue is a highly customizable Vue 3 UI component and css class utility library to make life easier for vue developers.


including components like: 
- [`Button`](#button) 
- [`Carousel`](#carousel) => to display beautiful sliders
- [`Sheet`](#sheet) (aka modal)
- [`TabBar`](#tabbar) => a simple butbeautiful tabbar with amazing animation
- [`Progressbar`](#progressbar) => a progressbar with beautiful animations
- [`Picker`](#picker) => an easy to implement and use item picker
- [`Loading`](#loading) => a component to show multiple loading animations
- [`Row` and `Col`](#grid) => grid system
- [`InputBasic`](#inputbasic) => a basic input component with some extra features
- [`InputFile`](#inputfile) => a file input with features like: built in cropper, built in selected file preview, built in multi file selection
- [`InputSelect`](#inputselect) => a select input with features like: built in multi selection
- [`InputDate`](#inputdate) => a beautiful date and time selector
- [`InputTextarea`](#inputtextarea)
- [`InputRange`](#inputrange)
- [`InputCheckbox`](#inputcheckbox)
- [`InputRadio`](#inputradio)
- [`InputToggle`](#inputtoggle) => a simple toggle selector
- [`Stepper`](#stepper) => stepper input for numbers
- [`GrabScroll`](#grabscroll)


some built in features (functions) like:
- [`confirm`](#confirm) => get user confirmation on an action (like js confirm)
- [`notify`](#notify) => notification message
- [`sheetToggle`](#sheettoggle)

and directives like:
- [`v-long-click`](#v-long-click) => a directive to detect holding click (long click)
- [`v-custom-click`](#v-custom-click) => a directive to detect both long and normal click together

also, many utility css classes that support both LTR and RTL
- [utility classes](#utility-classes)

## installation
it's so simple to add gamon-vue to your project 
```npm 
npm i gamon-vue
```

## usage
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import gamonVue from 'gamon-vue'

const app = createApp(App)
app.use(gamonVue)
app.mount('#app')
```

that's IT, done. you can use all gamon-vue components now.

Enjoy :)

## Components


### Button
```javascript
<Buttton text="simple button" />

<Buttton> simple button </Button>

 /**
  *  ====== PROPS ======
  * 
  * text: string => text to be shown inside button
  * 
  * type?: 'submit' | 'reset' | 'button' => default is button
  * 
  * width?: number|string => width of the button. 
  *   e.g.
  *     <Button text="btn" width="100px" />
  *     <Button text="btn" :width="100" />
  *  
  * height?: number|string => height of the button
  *  e.g.
  *     <Button text="btn" height="50px" />
  *     <Button text="btn" :height="50" />
  * 
  * size?: 'small' | 'medium' | 'large'
  * 
  * loading?: boolean => if true, a loading animation will be shown inside button
  * 
  * loadingEffect?: 'simple' | 'default' => effect of loading animation
  * 
  * loadingType?: refer to Loading component "type" prop
  * 
  * loadingClassPrefix?: string => a class prefix for loading animation 
  *    (to customize animation)
  * 
  * widthParent?: boolean => button will adjust to parent width (responsive)
  * 
  * rounded?: boolean => button will apear rounded
  * 
  * outline?: boolean => button will apear outlined
  * 
  * disabled?: boolean
  * 
  * textClass?: string => class of the text
  * 
  * textStyle?: string | { [index: string]: string } => css style of the text
  * 
  */
```



### Carousel
```javascript
<Carousel>
  <img src="img1.jpg" />
  <img src="img2.jpg" />
  <img src="img3.jpg" />
</Carousel>

 /**
  *  ====== PROPS ======
  * 
  *   itemsPerView?: number => how many items should be shown in each slide
  * 
  *   itemsPerSlide?: number => how many items should slide on slide
  * 
  *   eachItemMargin?: number => margin between items
  * 
  *   eachItemHeight?: number => height of each item
  * 
  *   auto?: boolean => if true, Carousel will slide automatically
  * 
  *   duration?: number => duration of auto slide in seconds
  * 
  *   stopAtEnd?: boolean => stop sliding at the last slide
  * 
  *   noIndicator?: boolean => slide indicators will not show
  *
  *   responsive?: {[index:number]:number} => responsive slides.
  *       e.g.
  *         <Carousel :responsive="{1000:5, 600:4, 400:2}">
            </Carousel>
  *     
  * 
  */
```


### Grid
```javascript
<Row>
  <Col width="xl-4 lg-6 md-8 sm-10 xs-12"> Col 1 </Col>
  <Col width="xl-4 lg-6 md-8 sm-10 xs-12"> Col 2 </Col>
  <Col width="xl-4 lg-6 md-8 sm-10 xs-12"> Col 3 </Col>
</Row>
 /**
  *   each Row can be divided into 12 sections
  *   xl-4 means the Col will take 4 sections in xl screen
  *   lg-6 means the Col will take 6 sections in lg screen
  *   md-8 means the Col will take 8 sections in md screen
  *   sm-10 means the Col will take 10 sections in sm screen
  *   xs-12 means the Col will take 12 sections in xs screen
  * 
  *  ====== PROPS ======
  *   width: string
  *  
  * 
  */
```


### InputBasic
```javascript
const inpModel = ref()

<InputBasic v-model="inpModel" />
/**
 *  ====== PROPS ======
 * 
 *  title?: string => title of the input
 * 
 *  placeholder?: string => placeholder of the input
 * 
 *  readonly?: boolean => input will be readonly
 * 
 *  focus?: boolean => if true, input will be focused
 * 
 *  delay?: boolean | number => if number value (in ms) provided, model will be 
  *     updated according to that delay, if number is not provided, the 
  *     default delay will be 500 ms  
 * 
 *  type?:  "text" | "number" | "tel" | "email" | "password"
 * 
 *  icon?: string => address of an image to show as icon at the start of input
 * 
 *  passwordVisibilityToggler?: boolean => displays a password visibility toggler
 *    icon for password input
 * 
 * 
 */
```



### InputFile
```javascript
const inpModel = ref()

<InputFile v-model="inpModel" />


/**
 * ====== PROPS ======
 * 
 *  title?: string => title of the input
 * 
 *  placeholder?: string => placeholder of the input
 * 
 *  icon?: string => address of an image to show as icon at the start of input
 * 
 *  accept?: string => the accept attribute of html file input 
 * 
 *  video?: boolean => input will only accept video files 
 * 
 *  audio?: boolean => input will only accept audio files 
 * 
 *  image?: boolean => input will only accept image files 
 * 
 *  preview?: boolean => input will show a preview of the selected file
 * 
 *   multi?: boolean => select multiple files
 * 
 *   maxSize?: number => max size of the selected file
 * 
 *   dragDrop?: boolean => input will select files by drag and drop
 * 
 *   cropper?: boolean => user can crop selected images
 * 
 *   previewSize?: {
         width ?:number|string,
         height ?:number|string,
         maxWidth ?:number|string,
         maxHeight ?:number|string,
     } => size of the preview
   
     e.g. 
   
     :previewSize = {
       width: 250,
       height: 250,
     }
 * 
 *  
 */
```



### InputDate
```javascript
const inpModel = ref()

<InputDate v-model="inpModel" />

/**
 * props:
 * 
 *  title?: string => title of the input
 * 
 *  placeholder?: string => placeholder of the input
 * 
 *  icon?: string => address of an image to show as icon at the start of input
 *  
 * 
 *  format?: string => format of the input and output
 *    not: allowed seperators are "/" and "-"
 *    e.g.
 *    format="yyyy/mm/dd" or format="yyyy/mm"
 *    format="yyyy-mm-dd"
 * 
 * timepicker?: boolean => user can select time
 * 
 * timepickerHourType?: string => either 12 or 24
 * 
 * defaultToday?: boolean => if true, default value will be today
 * 
 */
```



### InputSelect
```javascript
const inpModel = ref()

<InputSelect v-model="inpModel" :options="[ [1, 'one'], [2, 'two'] ]" />

/**
 * props:
 * 
 *  options: (number|string)[][] => select options
 *    e.g.
 *    :options="[ 
 *      ['option 1 value', 'option 1 text '],
 *      ['option 2 value', 'option 2 text '],
 *    ]" 
 * 
 *  title?: string => title of the input
 * 
 *  placeholder?: string => placeholder of the input
 * 
 *  icon?: string => address of an image to show as icon at the start of input
 *  
 *  multi?: boolean => user can select multiple options 
 *  
 *  displayType?: 'dropdown' | 'sheet-bottom' | 'sheet-center'
 */
```







### InputTextarea
```javascript
const inpModel = ref()

<InputTextarea v-model="inpModel"  />

/**
 * props:
 * 
 *  title?: string => title of the input
 * 
 *  placeholder?: string => placeholder of the input
 * 
 *  icon?: string => address of an image to show as icon at the start of input
 * 
 *  readonly?: boolean => input will be readonly
 * 
 *  focus?: boolean => if true, input will be focused
 * 
 *  cols?: number => cols attribute of html textarea
 * 
 *  rows?: number => rows attribute of html textarea
 * 
 */
```



### InputCheckbox
```javascript
const inpModel = ref()

<InputCheckbox v-model="inpModel" title="simple checkbox" value="foo" />

/**
 * props:
 * 
 * title: string => title of the checkbox
 * 
 * value: string|number => value of the checkbox
 * 
 * name?: string => name of the checkbox html input
 * 
 * binary?: boolean => if true, if the checkbox is selected value will be 1 and if not selected value will be 0
 * 
 * checkmarkStyle?: string | { [index: string]: string } => css style of the checkmark
 * 
 * titleStyle?: string | { [index: string]: string } => css style of the checkbox title
 * 
 * checkmarkClass?: string => class of checkmark
 * 
 * titleClass?: string => class of checkbox title
 * 
 */
```



### InputToggle
```javascript
const inpModel = ref()

<InputToggle v-model="inpModel" :default-value="[1, 'one']" :active-value="[2, 'two']"  />

/**
 * props:
 * 
 * defaultValue: [default value, text to display]
 * 
 * activeValue: [selected value, text to display]
 * 
 * rectangle?: boolean => input will be a rectangle
 * 
 * togglerStyle?: string | { [index: string]: string } => css style for toggler 
 * 
 * pointerStyle?: string | { [index: string]: string } => css style for toggler pointer 
 * 
 * activeValueStyle?: string | { [index: string]: string } => css style for active value text 
 * 
 * defaultValueStyle?: string | { [index: string]: string } => css style for default value text 
 * 
 * defaultValueClass?: string => class for default value text 
 * 
 * activeValueClass?: string => class for active value text 
 * 
 * pointerClass?: string => class for toggler pointer 
 * 
 * togglerClass?: string => class for toggler input 
 * 
 */
```



### InputRadio
```javascript
const inpModel = ref()

<InputRadio v-model="inpModel" title="simple checkbox" value="foo" />

/**
 * props:
 * 
 * title: string => title of the radio input
 * 
 * value: string|number => value of the radio input
 * 
 * name?: string => name of the radio input html input
 *  
 * checkmarkStyle?:  string | { [index: string]: string }  => css style of the checkmark
 * 
 * titleStyle?:  string | { [index: string]: string } => css style of the title
 * 
 * checkmarkClass?: string => class of checkmark
 * 
 * titleClass?: string => class of title
 * 
 */
```


### InputRange
```javascript
const inpModel = ref()

<InputRange v-model="inpModel"  />

/**
 * props:
 * 
 * min?: number
 * 
 * max?: number
 * 
 * step?: number
 * 
 * double?: boolean
 * 
 * outputDisplay?: 'none' | 'up'
 * 
 */
```








### Loading
```javascript

<Loading type="wave" />

/**
 * props:
 * 
 *  type?: 'dual-ring' | 'bouncing-balls' | 'cradle' | 'wave'
 * 
 *  classPrefix?: string => class prefix for loading component
 * 
 *  fullScreen?: boolean => loading will be full screen
 * 
 *  width?: string|number => width of the loading
 * 
 *  height?: string|number => height of the loading
 * 
 */
```



### Picker
```javascript
const inpModel = ref()

// method 1
<Picker v-model="inpModel" :options="[1,2,3,4]" />

// method 2
<Picker v-model="inpModel">
  <div> 1 </div>
  <div> 2 </div>
  <div> 3 </div>
</Picker>

// you can put any element inside the Picker, just remember that all element must be the same.

/**
 *  by default picker will update the model value (inpModel) with the index of
 *    the selected option. to get the value, you can use "getValue" prop
 * 
 * props:
 * 
 * options: (string|number)[] => options for picking
 *    e.g.
 *      <Picker :options="[1,2,3,4]" />
 *     
 * 
 * stopAtEnd?: boolean => stop at the last option
 * 
 * horizontal?: boolean => if true, picker will be horizontal
 * 
 * noSelectedFrame?: boolean => if true, selected frame will not be shown
 * 
 * startCenter?: boolean => if true, default selected value will be the middle 
 * (center) value
 * 
 * arrow?: boolean => if true, directional arrows will be shown
 * 
 * optionSize?: number => height for vertical , width for horizontal
 *    e.g. <Picker :options="[1,2,3,4]" :optionSize="50" />
 *    -- each option will have 50px height
 * 
 * height?: number => height of the picker
 * 
 * getValue?: boolean => if true, modelValue will be updated with the selected
 *    value instead of selected index. this prop works even with method 2.
 * 
 * selectedFrameClass?: string => class of the selected frame
 * 
 * optionClass?: string => class applied to each option
 * 
 * selectedFrameStyle?: string |  { [index: string]: string } => css style for selected frame
 * 
 * optionStyle?: string |  { [index: string]: string } => css style for each option
 * 
 */
```







### Progressbar
```javascript

<Progressbar :value="40" />

/**
 * props:
 * 
 * value: number => progress value in % e.g.(40)
 * 
 * text?: string => text to be shown beside the value
 * 
 * hideValue?: boolean => if true, value will not be shown
 * 
 * animation?: 'flash' | 'flow' 
 * 
 * progressColor?: string => color of the progress
 * 
 * flowParticleColor?: string => color of the flow animation particles
 * 
 * flasherColor?: string => color of the flash animation band
 * 
 * bgColor?: string => progressbar background color
 * 
 * textColor?: string => color of the text
 * 
 * textFontSize?: string => font size of text
 * 
 * progressStyle?: string | { [index: string]: string } => css style of progress
 * 
 * textStyle?: string | { [index: string]: string } => css style of text
 * 
 * flowParticleStyle?: string | { [index: string]: string } => css style of flow animation particles
 * 
 * flasherStyle?: string | { [index: string]: string } => css style of flasher animation band
 * 
 * progressClass?: string => class of progress
 * 
 * textClass?: string => class of text
 * 
 * flowParticleClass?: string => class of flow animation particles
 * 
 * flasherClass?: string => class of flasher animation band
 * 
 * 
 */
```


### Sheet
```javascript

// method 1: toggle the sheet using id
<Button text="toggle sheet" gamon-sheet-toggle="aUniqueId" />

<Sheet id="aUniqueId" title="a simple sheet" >
  <div>this is a simple sheet</div>
</Sheet>


// method 2: toggle the sheet using "v-model:display" model
// setting "sheetDisplay" to true will display the sheet
const sheetDisplay = ref(false)

<Sheet id="aUniqueId" title="a simple sheet" v-model:display="sheetDisplay" >
  <div>this is a simple sheet</div>
</Sheet>


/**
 * props:
 * 
 * id: string => unique ID of the sheet
 * 
 * type?: 'center' | 'bottom' | 'top' | 'left' | 'right' 
 * 
 * title?: string => title of the sheet(will be shown in sheet header)
 * 
 * width?: string|number => width of the sheet (responsive)
 * 
 * height?: string|number => height of the sheet
 * 
 * minHeight?: string|number => min height of the sheet
 * 
 * animation?: ToggleAnimation => e.g. animation="scale"
 * 
 * v-model:display?: boolean => with this prop, you can manually toggle the visibility of the sheet 
 * 
 * onDismiss?: function => callback function on sheet dismiss
 * 
 * onDisplay?: function => callback function on sheet display
 * 
 * onBackdropClick?: function => callback function on backdrop click
 * 
 * dismissDisabled?: boolean => sheet will not have a backdrop
 * 
 * bodyStyle?: string | { [index: string]: string } => css style of the sheet body
 * 
 * backdropStyle?: string | { [index: string]: string } => css style of the sheet backdrop
 * 
 * 
 */
```
you can set a global animation for all of your sheets, in plugin options in main.js:

```javascript
const app = createApp(Demo)
app.use(gamonVue, {
  sheet: {
    animation: 'rotate'
  }
})
app.mount('#app')
```





### TabBar
```javascript
const selectedTab = ref()

// method 1 : selectedTab would be the index of the selected tab
<TabBar v-model="selectedTab" :tabs="[ 'tab 1', 'tab 2', 'tab 3'  ]" />

// method 2 : selectedTab would be the value of the selected tab
<TabBar v-model="selectedTab" :tabs="[  ['value 1', 'tab 1'], ['value 2','tab 2'] ]" />


/**
 * props:
 * 
 *  tabs: string[] | (string|number)[][]
 * 
 *  position?: 'default' | 'fixed-bottom' | 'fixed-top'
 * 
 *  indicatorType?: 'none' | 'box' | 'line-top' | 'line-bottom'
 * 
 *  width?: string|number
 * 
 *  responsiveWidth?: string => same as Col width 
 *    e.g. responsiveWidth="lg-5 md-8"
 *  
 *  bgColor?: string => background color of tabbar
 * 
 *  tabStyle?: string | { [index: string]: string } => css style of each tab
 * 
 *  tabClass?: string => class of each tab
 * 
 *  tabColor?: string => color of each tab
 * 
 *  indicatorStyle?: string | { [index: string]: string } => css style of active tab indicator
 * 
 *  indicatorClass?: string => class of of active tab indicator
 * 
 *  indicatorColor?: string => color of active tab indicator
 * 
 *  activeTabStyle?: string | { [index: string]: string } => css style of active tab
 * 
 *  activeTabClass?: string => class of active tab
 * 
 *  activeTabColor?: string => color of active tab
 * 
 */
```







### Stepper
```javascript
const stepperValue = ref()

// method 1 : selectedTab would be the index of the selected tab
<Stepper v-model="stepperValue"  />


/**
 * props:
 * 
 *  min?: number => min stepper value
 * 
 *  max?: number => max stepper value
 * 
 *  editable?: boolean => stepper is manually editable
 * 
 *  vertical?: boolean => stepper is vertical
 * 
 *  chevron?: boolean => display chevron icon instead of plus and minus
 *  
 *  width?: string|number => width of the stepper
 * 
 *  height?: string|number => height of the stepper
 * 
 *  incStyle?: string | { [index: string]: string } => css style of increase btn
 * 
 *  decStyle?: string | { [index: string]: string } => css style of decrease btn
 * 
 *  numberStyle?: string | { [index: string]: string } => css style of number
 *  
 *  incClass?: string => class of increase btn
 * 
 *  decClass?: string => class of decrease btn
 * 
 *  numberClass?: string => class of number
 * 
 */
```









## Methods
gamon-vue has some amazing built in methods to help developers

just import Gamon from gamon-vue and you can use them

`import {Gamon} from 'gamon-vue'`

### confirm
```javascript
  import {Gamon} from 'gamon-vue'

  const deleteItem = ()=>{
    Gamon.confirm(
      'confirmation title', 
      'confirmation text',
      ()=>{
        console.log('user confirmed')
      }
    )
  }


  <Button text="Delete" @click="deleteItem" />


/**
 *  Gamon.confirm(title, text, confirmCallback, cancelCallback?, animation?, confirmButtonText?, cancelButtonText?)
 * 
 *  title: string => title of the confirmation 
 * 
 *  text: string => text of the confirmation 
 * 
 *  confirmCallback: function => confirmed callback 
 * 
 *  cancelCallback?: function => not confirmed callback 
 * 
 *  animation?: ToggleAnimation => e.g. animation="scale"
 * 
 *  type?: string => type of confirmation sheet (refer to Sheet component "type" prop)
 *  
 *  confirmButtonText?: string
 * 
 *  cancelButtonText?: string
 * 
 */
```
you can set a global config for all of your confirms, in plugin options in main.js:

```javascript
const app = createApp(Demo)
app.use(gamonVue, {
  confirm: {
    confirmButtonText ?: string, // e.g. confirmButtonText: 'I agree'
    cancelButtonText ?: string, // e.g. cancelButtonText: 'No'
    animation ?: ToggleAnimations, // e.g. animation: 'scale'
    type ?: SheetTypes, //  e.g. type: 'bottom' (refer to Sheet "type" prop)
  },
})
app.mount('#app')
```


### notify
```javascript
  import {Gamon} from 'gamon-vue'

  const showNotif = ()=>{
    Gamon.notify('this is a simple notififcation')
  }



  <Button text="Show notif" @click="showNotif" />


/**
 *  Gamon.notify(text, type, duration, animation)
 * 
 *  text: string => notification text
 * 
 *  type: 'success' | 'error' | ''
 * 
 *  duration?: number => notification display diration in ms e.g. (3000) which is 3s
 * 
 *  animation?: ToggleAnimation => e.g. animation="scale"
 * 
 */
```
you can set a global config for all of your notifies, in plugin options in main.js:

```javascript
const app = createApp(Demo)
app.use(gamonVue, {
  notify: {
    position?:'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'center' ,
    animation?: ToggleAnimations,  // e.g. animation: 'scale'
    duration?:number, // e.g. duration : 4000
  },
})
app.mount('#app')
```


### sheetToggle
toggle a Sheet with sheetToggle method
```javascript
  import {Gamon} from 'gamon-vue'

  const toggleSheet = ()=>{
    Gamon.sheetToggle('simpleSheetId')
  }



  <Button text="toggle sheet" @click="toggleSheet" />

  <Sheet id="simpleSheetId">
    this is a simple sheet
  </Sheet>

/**
 *  Gamon.sheetToggle(id)
 * 
 *  id: string => unique ID of the sheet
 * 
 */
```


## ToggleAnimation
```javascript
type ToggleAnimations = 'slide-up'|'slide-down'|'slide-left'|'slide-right'|'fade'|'scale'|'rotate'
```

## Directives

### v-long-click
```javascript
  // function will be called on long click
  const longClickDetected = (e: MouseEvent|TouchEvent)=>{
    console.log('long click detected')
  }



  <Button text="long click" v-long-click="longClickDetected" />

  
/**
 *  default hold time is 1000 ms (1 s)
 * 
 *  you can change this by =>
 *  
 *  <Button text="long click" v-long-click:3000="longClickDetected" />
 * 
 *  now, hold time is 3000 ms (3 s)
 * 
 */
```

### v-custom-click
if you need both click and long click detection on one element. you can use this directive

```javascript
  // function will be called on click
  const clickCallback = (e: MouseEvent|TouchEvent)=>{
    console.log('click detected')
  }

  // function will be called on long click
  const longClickCallback = (e: MouseEvent|TouchEvent)=>{
    console.log('long click detected')
  }



  <Button text="long click" v-custom-click="
    {
      click_callback: clickCallback,
      long_click_callback: longClickCallback,
      long_click_duration: 2000
    }
  " />
```





## Utility Classes

### colors
available colors are :

purple / 
purple-dark / 
purple-light / 
red / 
red-dark / 
red-light / 
green / 
green-dark / 
green-light / 
orange / 
orange-dark / 
orange-light / 
blue / 
blue-dark / 
blue-light / 
yellow / 
yellow-dark / 
yellow-light / 
gray / 
gray-dark / 
gray-light / 
black / 
white / 

so you can use these colors for background, border, text. for example :
```css
.text-blue
.text-blue-dark
.text-orange-light

.background-purple
.background-purple-light
.background-yellow

.border-green
.border-green-dark

...
```



### display
`flex` / `inline-flex` /  `block` / `inline-block` /  `none`/ 
```css
.display-flex
.display-none
```

### align-items
`center` / `start` / `end` / `baseline` / `stretch` /
```css
.align-items-center
.align-items-start
```

### justify-content 

`center` / `start` / `end` / `between` / `around` / `evenly`
```css
.justify-content-center
.justify-content-end
```

### align-self 
`center` / `start` / `end` / `baseline` / `stretch` /
```css
.align-self-center
.align-self-baseline
```

### align-content 
`center` / `start` / `end` /  `stretch` / 
```css
.align-content-center
.align-content-start
```

### flex 
`row` / `column` / `wrap` /  `row-reverse` / `column-reverse` / `wrap-reverse` / `nowrap` / `fill`
```css
.flex-row
.flex-row-reverse
.flex-column
.flex-wrap
.flex-wrap-reverse
.flex-fill
```

### responsive
you can use responsive classes using class prefixes :
`lg` / `md` / `sm` / `xs`

these prefixes can be used with the following classes:
- `align-items`
- `align-self`
- `align-content`
- `justify-content`
- `flex`
- `display`
```css
.lg-align-items-center
.md-align-items-start

.md-justify-content-end
.sm-justify-content-center

.lg-flex-row
.md-flex-column

.display-flex
.sm-display-none

```


### dimension sizes
`width` / `max-width` / `min-width` / `height` / `max-height` / `min-height`

all of them can have the value of 0% to 100% in steps of 5 (e.g. 0, 5, 10, 15...)

and css values like: `inherit`, `fit-content`, `none`, `revert`, `auto`, `unset`
```css
.width-50 /* 50% of the parent width */
.width-95 /* 95% of the parent width */
.width-fit-content

.height-50 
.height-85
.height-auto

.min-height-65 

.max-width-5 
```

### font-size
from 1px to 25px
```
.font-size-10px
.font-size-20px

...
```



### padding
from 0 to 12 .  maps 0rem to 3rem

```css
.padding-0 /* 0 rem - no padding */ 
.padding-4
.padding-12 /* 3 rem*/ 

...
```



### margin
from 0 to 12 . maps 0rem to 3rem

```css
.margin-0 /* 0 rem - no margin */ 
.margin-4
.margin-12 /* 3 rem*/ 

.margin-auto
...
```



### border
from 1x to 5px 

```css
.border-1px /* border: 1px solid gray */ 
.border-5px /* border: 5px solid gray */ 

...
```
you can change border color
```html
<div class="border-1px border-blue"></div>
```




### rounded
from 0 to 12 . maps 0rem to 3rem

```css
.rounded-0 /* not rounded */ 
.rounded-2
.rounded-5
.rounded-circle
...
```



### sides and RTL, LTR support
gamon-vue classes like padding, margin and rounded can be used with sides
like:
```css
.margin-start-3
.margin-end-3
.margin-top-3
.margin-bottom-3

.margin-start-auto
.margin-end-auto
.margin-top-auto
.margin-bottom-auto

.padding-start-5
.padding-end-5
.padding-top-5
.padding-bottom-5

.rounded-start-2
.rounded-end-2
.rounded-top-2
.rounded-bottom-2
```
`start` and `end` sides are controlled by html tag `dir` attribute

``` html
for LTR
<html dir="ltr">
</html>

for RTL
<html dir="rtl">
</html>
```



### overflow
```css
.overflow-auto
.overflow-hidden
.overflow-visible
.overflow-scroll

.overflow-x-auto
.overflow-x-hidden
.overflow-x-visible
.overflow-x-scroll

.overflow-y-auto
.overflow-y-hidden
.overflow-y-visible
.overflow-y-scroll
```




### position
```css
.position-absolute
.position-fixed
.position-relative
.position-static
.position-sticky
```



### cursor
```css
.cursor-pointer
.cursor-grab
.cursor-copy
.cursor-default
.cursor-none
.cursor-progress
.cursor-wait
.cursor-zoom-in
.cursor-zoom-out
.cursor-text
```

