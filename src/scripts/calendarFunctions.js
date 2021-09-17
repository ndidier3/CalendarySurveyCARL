


function formatDate(date) {
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    let yyyy = date.getFullYear()

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return yyyy + '/' + mm + '/' + dd
}

function past35Dates() {
    let datesOfMonth = []
    let daysOfWeek = []
    for (let i = 1; i < 36; i++) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const formattedDate = formatDate(d)
        datesOfMonth.push(formattedDate)
        daysOfWeek.push(d.getDay())
    }
    const datesAndDay = {}
    for (let i=0; i < datesOfMonth.length; i++) {
        datesAndDay[datesOfMonth[i]] = daysOfWeek[i]
    }

    return [datesAndDay, datesOfMonth]
}

function findFirstSunday(datesAndDay) {
    let sunday = 'unassigned'
    for (let date in datesAndDay) {
        if (datesAndDay[date] === 0) {
            sunday = date
        }
    }
    return sunday
}

//string of format 'yyyy/mm/dd' to Date format
function stringToDate(stringDate) {
    let year = stringDate.split('/')[0]
    let date31 = stringDate.split('/')[2]
    let month = stringDate.split('/')[1]
    let date = new Date(year, month-1, date31)
    return date
}

function getFirstSundayPosition(firstSunday, datesOfMonth) {
    datesOfMonth.reverse()
    return datesOfMonth.indexOf(firstSunday);
}

function getPastMonthList(sundayPosition, datesOfMonth) {
    let datesAddedAfter = Array(7 - sundayPosition).fill('NA   ')
    let datesAddedBefore = Array(0 + sundayPosition).fill('NA   ')
    datesOfMonth.reverse()
    datesOfMonth.push(datesAddedAfter)
    datesOfMonth.unshift(datesAddedBefore)
    
    return datesOfMonth.flat(Infinity)
}

function formatPastMonth(pastMonthDates) {
    for (let i=0; i < pastMonthDates.length; i++) {
        if (pastMonthDates[i].length > 5) {
            pastMonthDates[i] = pastMonthDates[i].slice(5)
        }
    }
    pastMonthDates.reverse()
    return pastMonthDates
}

//storeData(formattedMonth, 'keyForCigIndices', 'keyForCigData', 'cigPast5Weeks')
function formatCalendarDates(formattedMonth) {

    for (let i=1; i<formattedMonth.length+1; i++) {

        const labelId = "label-date-" + String(i)
        const textboxId = "day-" + String(i)
        
        if (formattedMonth[i-1] === 'NA   ') {
            const textbox = document.getElementById(textboxId)
            textbox.style.visibility= "hidden"
            const label = document.getElementById(labelId)
            label.style.visibility= "hidden"
        } else {
            const label = document.getElementById(labelId)
            let date = "<b>" + formattedMonth[i-1] + "</b>"
            label.innerHTML = date
        
        }
    }
}
//this occurs on every calendar load
let datesAndDay = past35Dates()[0]
let datesOfMonth = past35Dates()[1]
let firstSunday = findFirstSunday(datesAndDay)
const sundayPosition = getFirstSundayPosition(firstSunday, datesOfMonth)
const pastMonthDates = getPastMonthList(sundayPosition, datesOfMonth)
const formattedMonth = formatPastMonth(pastMonthDates)
formatCalendarDates(formattedMonth)


function addLabel(indicesKey, dataKey, dataLabel = false, color = false) {
    
    let stringIndices = sessionStorage.getItem(indicesKey)
    let stringData35 = sessionStorage.getItem(dataKey)
    
    let indices = stringIndices.split(',')
    let data35 = stringData35.split(',')
    
    const firstLabelIndex =  Number(indices[0])
    const lastLabelIndex = 35 + firstLabelIndex

    for (let i = firstLabelIndex; i < lastLabelIndex; i++) {

        let dataEntry = data35[i-firstLabelIndex]
        let labelId = "label-day-" + String(i)
        let label = document.getElementById(labelId)
        let labelText = label.innerHTML

        if ((dataEntry !== 'none') && (dataEntry !== '0') && (dataEntry !== '')) {
            if (dataLabel) {
                    let newLabelText = `${labelText} <br> &bull;${dataEntry} ${dataLabel}`
                    label.innerHTML = newLabelText
            } else {
                    let newLabelText = `${labelText} <br> &bull;${dataEntry}`
                    label.innerHTML = newLabelText
                }
        } 
            
    }   
}

function addGrayToNonLabeledDates(formattedMonth) {
    for (let i=1; i<formattedMonth.length+1; i++) {
        const labelId = "label-day-" + String(i)
        console.log(labelId)
        const label = document.getElementById(labelId)
        const labelText = label.innerHTML
        
        if (labelText.length < 17) {
            console.log(labelText.length)
            label.style.color = "gray"
            console.log('hello')
        }
    }
}



function loadPreviousEntries(keyForCurrentIndices, keyForCurrentData, keyForCheckboxStatus, formattedMonth, keyPast5Weeks = false) {

    let stringIndices = sessionStorage.getItem(keyForCurrentIndices)
    let stringCurrentData = sessionStorage.getItem(keyForCurrentData)
    console.log(keyPast5Weeks)
    let past5Weeks = sessionStorage.getItem(keyPast5Weeks)
    console.log(past5Weeks)
    
    
    //have currrentDataList be all 0's if alcPast5Weeks === no
    let indexList = []
    if (past5Weeks === "No") {
        const earliestDate = formattedMonth.find(date => date !== 'NA   ')
        const earliestDateIndex = formattedMonth.indexOf(earliestDate) + 1
        for (let i = earliestDateIndex; i < (35+earliestDateIndex); i++) {
            indexList.push(i)
        }
        console.log(indexList)
        currentDataList = Array(35).fill('0')
        console.log(currentDataList)
    } else {
        indexList = stringIndices.split(',')
        currentDataList = stringCurrentData.split(',')
    }
    console.log(indexList)
    const firstLabelIndex =  Number(indexList[0])
    const lastLabelIndex = 35 + firstLabelIndex

    for (let i = firstLabelIndex; i < lastLabelIndex; i++) {
        testboxIndex = i
        const textboxId = "day-" + String(testboxIndex)
        const textbox = document.getElementById(textboxId)
        const currentData = currentDataList[i-firstLabelIndex]
        
        if (currentData !== 'none') {
            textbox.value = currentData
        }
    }

    let checkboxStatus = sessionStorage.getItem(keyForCheckboxStatus)
    console.log(checkboxStatus)
    let checkbox = document.getElementById("instruction-check")
    if (checkboxStatus === "yes") {
        checkbox.checked = true
        toggleInstructionText()
    }
     
}

function storeData(formattedMonth, keyForIndices, keyForData, keyForPast5Week = false) {
    let data = []
    let dates = []
    let nextLabel = []
    let indices = []
    
    const earliestDate = formattedMonth.find(date => date !== 'NA   ')
    const earliestDateIndex = formattedMonth.indexOf(earliestDate)

    for (let i = earliestDateIndex+1; i < 35 + earliestDateIndex+1; i++) {
        testboxIndex = i
        const textboxId = "day-" + String(testboxIndex)
        const textbox = document.getElementById(textboxId)
        const textboxValue = textbox.value

        const labelId = "label-day-" + String(i)
        const label = document.getElementById(labelId)
        const labelText = label.innerHTML

        
        if (textboxValue) 
            { data.push(textboxValue) } 
            
        else 
            { data.push('') }
            
        dates.push(formattedMonth[i])
        indices.push(i)
        }
    console.log(data)
    
    const stringNextLabel = nextLabel.toString()
    const stringIndices = indices.toString()
    const stringData = data.toString()
    console.log(stringNextLabel)
    sessionStorage.setItem(keyForIndices, stringIndices)
    sessionStorage.setItem(keyForData, stringData)
    if (keyForPast5Week) {
        sessionStorage.removeItem(keyForPast5Week)
        sessionStorage.setItem(keyForPast5Week, 'maybe')
    }
    
    

    let ticker = 0
    if (Number(sessionStorage.getItem("keyForTicker", '0')+0))
        { let ticker = Number(sessionStorage.getItem("keyForTicker")) + 1}
        else 
        { sessionStorage.setItem("keyForTicker", "0") }


}

function nextWindow(htmlName) {
    
    const inputs = document.getElementsByClassName('date-input')
    let entryCount = 0
    for (let i = 0; i < inputs.length; i++) {
        let inputValue = inputs[i].value
        if (inputValue !== '') {
            entryCount += 1
            }
        }
        //35 entries need to be filled in; there are 42 total inputs, but 7 are hidden
    if (entryCount === 35) {
        //go to next page of form
        window.location.href = htmlName 
    } else {
        alert('Each day must have be given a value before submitting.')
    }
}

function formatReview(formattedMonth) {
        const inputLabels = document.getElementsByClassName("input-label")
        for (let i = 0; i < inputLabels.length; i++) {
            inputLabels[i].style.height = "80px"
            inputLabels[i].style.textAlign = "start"
            inputLabels[i].style.width = "100px"
            inputLabels[i].style.justifyContent = "left"
        }

        for (let i=1; i<formattedMonth.length+1; i++) {
    
            const labelId = "label-day-" + String(i)
            const textboxId = "day-" + String(i)
            
            if (formattedMonth[i-1] === 'NA   ') {
                const textbox = document.getElementById(textboxId)
                textbox.remove()

                const label = document.getElementById(labelId)
                label.style.visibility= "hidden"
            } else {
                const textbox = document.getElementById(textboxId)
                textbox.remove()
                const label = document.getElementById(labelId)
                label.style.fontSize = "16px"
            }
        }

        const weekIds = [".week1", ".week2", ".week3", ".week4", ".week5", ".week6"]
        weekIds.forEach((week) => {
            const listElements = document.querySelectorAll(week + ' li')
            for (let i = 0; i <= listElements.length - 1; i++) {
                listElements[i].remove();
            }
        })
        
        const labels = document.querySelectorAll('.date-label')
        for (let i = 0; i <= labels.length - 1; i++) {
    
            labels[i].style.height = "30px"
            labels[i].style.textAlign = "center"
            //labels[i].style.margin = "10px auto 45px auto"
        
        }

    const subheader = document.getElementById('subheader')
    subheader.style.padding = "0px 0px 25px 0px"
    }



function toggleInstructionText(keyForCheckboxStatus) {
    const checkbox = document.getElementById("instruction-check")
    const elements = document.getElementsByClassName("cal-instructions")
    const checkboxLabel = document.getElementById("checkboxLabel")
    console.log(checkbox.value)
    if (checkbox.checked) {
        for (let i = 0; i < elements.length; i++) {

            elements[i].style.display = "none"
            checkboxLabel.innerHTML = "Uncheck to display instructions"
            sessionStorage.setItem(keyForCheckboxStatus, "yes")
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "block"
            checkboxLabel.innerHTML = "Check to hide instructions"
        }
    }

    const calendar = document.getElementsByClassName("calendar")
    for (let i = 0; i < calendar.length; i++) {
        calendar[i].style.visibility="visible"
        console.log(calendar[i].style.visibility)
    }

    const abbreviations = document.getElementsByClassName("abbreviations")
    for (let i = 0; i < abbreviations.length; i++) {
        console.log('working')
        abbreviations[i].style.visibility="visible"
    }
}

function addCheckboxListener() {
    const checkbox = document.getElementById("instruction-check")
    checkbox.addEventListener('change', toggleInstructionText())
}

