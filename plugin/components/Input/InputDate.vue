<template>
    <InputLayout :title="title" :icon="icon">
        <input @click="openDatepickerSheet()" :class="['gamon-input__input']" :value="output" :placeholder="placeholder" readonly  >

        <Sheet ref="datePickerSheet" type="center" :width="300">
            <div class="gamon-input-date">

                <div>

                    <div class="gamon-input-date__year-month-container">
                        <!-- year -->
                        <div class="gamon-input-date__year-month-container__year-picker">
                            <img @click="changeYear(-1)" src="@/assets/icon_chevron_left.png">
                            <h4 class="gamon-input-date__year-month-container__year-picker__year">{{ currentCalendarPage.year }}</h4>
                            <img @click="changeYear(1)" src="@/assets/icon_chevron_right.png">
                        </div>
                        <!-- / -->

                        <!-- month -->
                        <div class="gamon-input-date__year-month-container__month-picker">
                            <img @click="changeMonth(-1)" src="@/assets/icon_chevron_left.png">
                            <h4 @click="showMonths()" class="gamon-input-date__year-month-container__month-picker__month">{{ currentCalendarPage.monthNames[currentCalendarPage.month - 1] }} ( {{currentCalendarPage.month}} )</h4>
                            <img @click="changeMonth(1)" src="@/assets/icon_chevron_right.png">
                        </div>

                        <Sheet v-model:display="showMonthsSelectionPage" animation="scale" >
                            <div class = "gamon-input-date__year-month-container__months-selection-page" >
                                <div v-for="(month, index) in currentCalendarPage.monthNames" @click="monthSelection(index)" :key="index" class="gamon-input-date__year-month-container__months-selection-page__month">
                                    {{month}}
                                </div>
                            </div>
                        </Sheet>
                        <!-- / -->
                    </div>

                    

                    <div class="gamon-input-date__days-table-container">
                        <!-- week day names -->
                        <div class="gamon-input-date__days-table-container__weekday-names-container" >
                            <div v-for="(weekDayName, index) in currentCalendarPage.weekDayNames"  :key="index" class="gamon-input-date__days-table-container__weekday-names-container__name">
                                {{weekDayName}}
                            </div>
                        </div>
                        <!-- / -->

                        <!-- days -->
                        <div v-for="(row, index) in currentCalendarPage.daysArray" :key="index" class="gamon-input-date__days-table-container__days-table" >
                            <div v-for="day in row" :key="day" @click="daySelection(day as number)" 
                                :class="['gamon-input-date__days-table-container__days-table__day',
                                    !day && 'gamon-input-date__days-table-container__days-table__day--empty',  
                                    today.date == currentCalendarPage.year+'/'+currentCalendarPage.month+'/'+day && 'gamon-input-date__days-table-container__days-table__day--today',
                                    selectedDate.year+'/'+selectedDate.month+'/'+selectedDate.day == currentCalendarPage.year+'/'+currentCalendarPage.month+'/'+day && 'gamon-input-date__days-table-container__days-table__day--selected',
                                    ]">

                                {{ day }}
                            </div>
                        </div>
                        <!-- / -->
                    </div>


                    <!-- time picker -->
                    <Timepicker v-if="timepickerFormatExtracted && timepickerFormat" v-model="timepickerModel" :format="timepickerFormat" :hour-type="timepickerHourType" ref="timepickerComponentEl" />
                    <!-- / -->
                </div>

                <div class="gamon-input-date__bottom-buttons">
                    <div @click="goToToday()" class="gamon-input-date__bottom-buttons__today-button">Today</div>
                    <div @click="openDatepickerSheet()" class="gamon-input-date__bottom-buttons__done-button">Done</div>
                    <div @click="clear()" class="gamon-input-date__bottom-buttons__clear-button">Clear</div>
                </div>


            </div>
        </Sheet>
    </InputLayout>
</template>




<script setup lang="ts">
    import {ref, computed, onMounted, watch} from 'vue'
    import {fixedDigits, jalali_to_gregorian} from '@/utils'
    import InputLayout from '@/components/Input/InputLayout.vue'
    import Timepicker from '@/components/Input/Timepicker.vue'
    import Sheet from '@/components/Sheet/Sheet.vue'
    import '@/style/inputDate.css'


    const props = defineProps<{
        modelValue ?: string,
        title ?: string,
        icon ?: string,
        placeholder ?: string,
        format ?: string,
        inputLocale ?: string,
        outputLocale ?: string,
        timepicker ?: boolean,
        timepickerHourType ?: string,
        defaultToday?: boolean,
    }>()

    const inputLocale = ref(props.inputLocale || 'en-US')
    const outputLocale = ref(props.outputLocale || inputLocale.value)
    const timepickerModel = ref()
    const timepickerFormat = ref()


    type Calendar = {monthNames: string[], weekDayNames: string[], weekDayNamesToFindOffset: string[]}
    const gregorian = ref<Calendar>({
        monthNames : ['January','February','March','April','May','June','July','August','September','October','Novemeber','Decemeber'],
        weekDayNames : ['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat'],
        weekDayNamesToFindOffset : ['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat'],
    })

    const jalali = ref<Calendar>({
        monthNames : ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
        weekDayNames : ['ش', 'ی', 'د', 'س' , 'چ', 'پ', 'ج'],
        weekDayNamesToFindOffset : ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه' , 'چهارشنبه', 'پنجشنبه', 'جمعه'],
    })

    type CurrentCalendarPage = {year: number, month: number, selectedDay:number ,monthNames: string[], weekDayNames: string[] , weekDayNamesToFindOffset: string[], daysArray : (number|string)[][]}
    const currentCalendarPage = ref<CurrentCalendarPage>({
        year : 0,
        month : 0,
        selectedDay : 0, // selected day on calendar
        monthNames : [],
        weekDayNames : [],
        weekDayNamesToFindOffset : [],
        daysArray : [],
    })

    const today = ref({
        year:0,
        month:0,
        day:0,
        date:'',
    })


    const selectedDate = ref({
        year:0,
        month:0,
        day:0,
    })

    const finalOutputFormat = ref(props.format || 'yyyy/mm/dd hh:mm:ss')
    const finalOutputSeperator = ref('/')
    const datepickerParts = ref({
        y:false,
        m:false,
        d:false,
    })

    const timepickerFormatExtracted = ref(false)
    const datePickerSheet = ref()


    onMounted(()=>{
        checkFormat()
        init()
        processModelValue()
    })

    watch(() => props.modelValue, () => {
        processModelValue()
    })

    const init = ()=>{

        // initiating the calendar page with today date with toLocaleDateString data
        let todayDate = new Date()
        today.value.year = parseInt(todayDate.toLocaleDateString(inputLocale.value, {year: 'numeric'}).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728))  );
        today.value.month = parseInt(todayDate.toLocaleDateString(inputLocale.value, {month: 'numeric'}).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728))  );
        today.value.day = parseInt(todayDate.toLocaleDateString(inputLocale.value, {day: 'numeric'}).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728))  );
        today.value.date = today.value.year+'/'+today.value.month+'/'+today.value.day

        // selecting the correct month and weekday names based on locale
        if(inputLocale.value == 'fa-IR'){
            currentCalendarPage.value.monthNames = jalali.value.monthNames
            currentCalendarPage.value.weekDayNames = jalali.value.weekDayNames
            currentCalendarPage.value.weekDayNamesToFindOffset = jalali.value.weekDayNamesToFindOffset
        } else {
            currentCalendarPage.value.monthNames = gregorian.value.monthNames
            currentCalendarPage.value.weekDayNames = gregorian.value.weekDayNames
            currentCalendarPage.value.weekDayNamesToFindOffset = gregorian.value.weekDayNamesToFindOffset
        }

    }


    const processModelValue = ()=>{
        let datetimeFormatRegex = /^(\d{4}|\d{1,2})(([.\/-])(\d{4}|\d{1,2}))?(([.\/-])(\d{4}|\d{1,2}))?(\s(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?$/gm

        if(props.modelValue && props.modelValue.match(datetimeFormatRegex)){
            let modelValueParts =  props.modelValue.split(" ")
            let modelValueDate = modelValueParts[0]
            timepickerModel.value = modelValueParts[1]

            let outputFormatParts = finalOutputFormat.value.split(" ")
            let outputFormatDate = outputFormatParts[0]
            timepickerFormat.value = outputFormatParts[1]

            setSelectedDateFromModelValue(outputFormatDate, modelValueDate)

            // set calendar page to model value
            setCalendarToSpecificDate(
                selectedDate.value.year || today.value.year,
                selectedDate.value.month || today.value.month,
                selectedDate.value.day || today.value.day,
            )
        } 
        else if(!props.modelValue){
            clear()
            goToToday()
        }
    }

    const setSelectedDateFromModelValue = (dateFormat:string, modelValueDate:string)=>{
       
        let dateFormatParts =  dateFormat.split(finalOutputSeperator.value)
        let modelValueDateParts =  modelValueDate.split(finalOutputSeperator.value)

        let year,month,day;
        
        dateFormatParts.forEach((formatPart, index)=>{
            let yearDigits = formatPart.split('y').length - 1
            let monthDigits = formatPart.split('m').length - 1
            let dayDigits = formatPart.split('d').length - 1

            if(yearDigits > 0){
                year = parseInt(modelValueDateParts[index])
            }
            else if(monthDigits > 0){
                month = parseInt(modelValueDateParts[index])
            }
            else if(dayDigits > 0){
                day = parseInt(modelValueDateParts[index])
            }
        })

        setSelectedDate(year, month, day)
    }
  

    const getDays = ()=>{

        let [offset, monthDaysCount] = calcMonthDaysOffsetAndCount()

        let day = 1;

        currentCalendarPage.value.daysArray = []

        for(let row=0; row<6; row++){ // 5 rows of days
            let rowDaysArray : (number|string)[] = []

            for(let col=0; col<7; col++){ // each row has 7 cols
                if(row == 0 ){
                    if(col < offset)
                        rowDaysArray.push('')
                    else{
                        rowDaysArray.push(day)
                        day++
                    }

                } else {
                    if(day > monthDaysCount)
                        break;

                    rowDaysArray.push(day)
                    day++
                    

                }

            }

            currentCalendarPage.value.daysArray.push(rowDaysArray)
        }
    }

    const calcMonthDaysOffsetAndCount = ()=>{
        let firstDayOfMonthGregorian = null
        let lastDayOfMonthGregorian = null

        let yearForLastDayOfMonth = currentCalendarPage.value.month == 12 ? currentCalendarPage.value.year+1 : currentCalendarPage.value.year
        let monthForLastDayOfMonth = currentCalendarPage.value.month == 12 ? 1 : currentCalendarPage.value.month+1



        if(inputLocale.value == 'fa-IR'){
            firstDayOfMonthGregorian = jalali_to_gregorian( currentCalendarPage.value.year, currentCalendarPage.value.month, 1)
            lastDayOfMonthGregorian = jalali_to_gregorian( yearForLastDayOfMonth , monthForLastDayOfMonth, 0)
        } else {
            firstDayOfMonthGregorian = [currentCalendarPage.value.year, currentCalendarPage.value.month, 1]
            lastDayOfMonthGregorian = [yearForLastDayOfMonth, monthForLastDayOfMonth, 0]
        }


        let firstDayOfMonth = new Date(firstDayOfMonthGregorian[0],  firstDayOfMonthGregorian[1]-1 , firstDayOfMonthGregorian[2])
            .toLocaleDateString(inputLocale.value, {weekday: 'short'}).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));
        let offset = currentCalendarPage.value.weekDayNamesToFindOffset.indexOf(firstDayOfMonth)


        let lastDayOfMonth = new Date(lastDayOfMonthGregorian[0],  lastDayOfMonthGregorian[1]-1, lastDayOfMonthGregorian[2])
            .toLocaleDateString(inputLocale.value, {day: 'numeric'}).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));
        let monthDaysCount = parseInt(lastDayOfMonth);


        return [offset, monthDaysCount]
    }

    const setCalendarToSpecificDate = (year:number, month:number, day:number)=>{
        currentCalendarPage.value.year = year
        currentCalendarPage.value.month = month
        currentCalendarPage.value.selectedDay = day
        getDays()
    }

    const checkFormat = ()=>{
        let formatRegex = /^(y{4}|m{1,2}|d{1,2})(([.\/-])(y{4}|m{1,2}|d{1,2}))?(([.\/-])(y{4}|m{1,2}|d{1,2}))?(\s(h{1,2}|m{1,2}|s{1,2}))?(:(h{1,2}|m{1,2}|s{1,2}))?(:(h{1,2}|m{1,2}|s{1,2}))?$/gm
        

        if(finalOutputFormat.value && finalOutputFormat.value.match(formatRegex)){
            let finalOutputFormatParts = finalOutputFormat.value.split(" ")
            let finalOutputFormatDate = finalOutputFormatParts[0]
            timepickerFormat.value = finalOutputFormatParts[1]



            // process date 
            let sepSlash = finalOutputFormatDate.split('/').length - 1
            let sepDash = finalOutputFormatDate.split('-').length - 1
            let sepDot = finalOutputFormatDate.split('.').length - 1

            if(sepSlash > 0 && sepDash == 0 && sepDot == 0) finalOutputSeperator.value = "/"
            else if(sepDash > 0 && sepSlash == 0 && sepDot == 0) finalOutputSeperator.value = "-"
            else if(sepDot > 0 && sepSlash == 0 && sepDash == 0) finalOutputSeperator.value = "."
            else finalOutputSeperator.value = "/"

        } 
        else {
            finalOutputFormat.value = 'yyyy/mm/dd hh:mm:ss'

            datepickerParts.value.y = true
            datepickerParts.value.m = true
            datepickerParts.value.d = true
        }

        timepickerFormatExtracted.value = true
    }

    const setSelectedDate = (year:number = 0, month:number = 0, day:number = 0, dateWithOutputFormat : string = '')=>{
        if(year)
            selectedDate.value.year = year
        if(month)
            selectedDate.value.month = month
        if(day)
            selectedDate.value.day = day

        outputDate.value = formatDate()
    }

    const openDatepickerSheet = ()=>{
        datePickerSheet.value.toggle()
    }

    // =======================================================================================
    // ================================= month manupilition section ==========================
    // =======================================================================================
    const showMonthsSelectionPage = ref(false)
    const showMonths = ()=>{
        showMonthsSelectionPage.value = true
    }

    const monthSelection = (monthIndex : number) : void =>{
        currentCalendarPage.value.month = monthIndex+1
        showMonthsSelectionPage.value = false
        getDays()
    }

    const changeMonth = (step:number)=>{

        currentCalendarPage.value.month += step

        if(currentCalendarPage.value.month > 12){
            currentCalendarPage.value.month = 1
            currentCalendarPage.value.year += 1
        }
        else if(currentCalendarPage.value.month < 1){
            currentCalendarPage.value.month = 12
            currentCalendarPage.value.year -= 1
        }

        getDays()
    }

    // =======================================================================================
    // ================================= year manupilition section ===========================
    // =======================================================================================
    const changeYear = (step:number)=>{
        currentCalendarPage.value.year += step
        getDays()
    }

    // =======================================================================================
    // ================================= day selection =======================================
    // =======================================================================================
    const outputDate = ref<number|string>('')
    const daySelection = (day:number)=>{
        setSelectedDate(currentCalendarPage.value.year, currentCalendarPage.value.month, day)
    }


    const dateToBeUsedForOutputFormat = ref({
        year:0,
        month:0,
        day:0,
    })
    const formatDate = () : (string|number) =>{

        let finalOutput = ''

        let outputFormatParts = finalOutputFormat.value.split(" ")
        let outputFormatDate = outputFormatParts[0]
        timepickerFormat.value = outputFormatParts[1]
        


        dateToBeUsedForOutputFormat.value.year = selectedDate.value.year
        dateToBeUsedForOutputFormat.value.month = selectedDate.value.month
        dateToBeUsedForOutputFormat.value.day = selectedDate.value.day

        if(inputLocale.value == 'fa-IR' && outputLocale.value == 'en-US' ){
            if(selectedDate.value.year != 0 && selectedDate.value.month != 0 && selectedDate.value.day != 0){
                [dateToBeUsedForOutputFormat.value.year, dateToBeUsedForOutputFormat.value.month, dateToBeUsedForOutputFormat.value.day] = jalali_to_gregorian(selectedDate.value.year, selectedDate.value.month, selectedDate.value.day)
            }
        }


        let fromatDateParts = outputFormatDate.split(finalOutputSeperator.value)
        
        if(fromatDateParts[0]){
            finalOutput = produceFormatPartOutput(fromatDateParts[0])
        }
        if(fromatDateParts[1]){
            finalOutput += finalOutputSeperator.value + produceFormatPartOutput(fromatDateParts[1])
        }
        if(fromatDateParts[2]){
            finalOutput += finalOutputSeperator.value + produceFormatPartOutput(fromatDateParts[2])
        }


        return finalOutput
    }

    const produceFormatPartOutput = (part:string)=>{
        let yearDigits = part.split('y').length - 1
        let monthDigits = part.split('m').length - 1
        let dayDigits = part.split('d').length - 1

        let partOutput = ''

        if(yearDigits > 0){
            partOutput = fixedDigits(dateToBeUsedForOutputFormat.value.year, yearDigits)
        }
        else if(monthDigits > 0){
            partOutput = fixedDigits(dateToBeUsedForOutputFormat.value.month, monthDigits)
        }
        else if(dayDigits > 0){
            partOutput = fixedDigits(dateToBeUsedForOutputFormat.value.day, dayDigits)
        }

        return partOutput
    }



    const goToToday = ()=>{
        setCalendarToSpecificDate(today.value.year, today.value.month, today.value.day)
        if(props.defaultToday) setSelectedDate(today.value.year, today.value.month, today.value.day)
    }


    const timepickerComponentEl = ref()

    const clear = ()=>{
        selectedDate.value.year = 0
        selectedDate.value.month = 0
        selectedDate.value.day = 0
        outputDate.value = ''

        if(timepickerComponentEl.value)
            timepickerComponentEl.value.clear()
    }


    
    const emit = defineEmits(['update:modelValue'])
    const updateModelValue = (val:string|number)=>{
        emit('update:modelValue', val)
    }


    const output = computed(()=>{
        let output = outputDate.value

        if(timepickerFormat.value && output)
            output += ' '+ timepickerModel.value

        return output 
    })


    watch(()=> output.value, (output)=>{
        updateModelValue(output)
    })


</script>