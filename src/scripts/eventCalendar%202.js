
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
    for (let i = 0; i < 35; i++) {
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

let datesAndDay = past35Dates()[0]
let datesOfMonth = past35Dates()[1]

function findFirstSunday(datesAndDay) {
    let sunday = 'unassigned'
    for (let date in datesAndDay) {
        if (datesAndDay[date] === 0) {
            sunday = date
        }
    }
    return sunday
}

let firstSunday = findFirstSunday(datesAndDay)

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

const sundayPosition = getFirstSundayPosition(firstSunday, datesOfMonth);
console.log(sundayPosition)

function getPastMonthList(sundayPosition, datesOfMonth) {
    let datesAddedAfter = Array(7 - sundayPosition).fill('NA   ')
    let datesAddedBefore = Array(0 + sundayPosition).fill('NA   ')
    datesOfMonth.reverse()
    datesOfMonth.push(datesAddedAfter)
    datesOfMonth.unshift(datesAddedBefore)
    
    return datesOfMonth.flat(Infinity)
}

const pastMonthDates = getPastMonthList(sundayPosition, datesOfMonth)


function formatPastMonth(pastMonthDates) {
    for (let i=0; i < pastMonthDates.length; i++) {
        if (pastMonthDates[i].length > 5) {
            pastMonthDates[i] = pastMonthDates[i].slice(5)
        }
    }
    pastMonthDates.reverse()
    return pastMonthDates
}

const formattedMonth = formatPastMonth(pastMonthDates)


function formatCalendarDates(formattedMonth) {

    for (let i=1; i<formattedMonth.length+1; i++) {

        const labelId = "label-day-" + String(i)
        const textboxId = "day-" + String(i)
        
        if (formattedMonth[i-1] === 'NA   ') {
            const textbox = document.getElementById(textboxId)
            textbox.style.visibility= "hidden"
            const label = document.getElementById(labelId)
            label.style.visibility= "hidden"
        } else {
            const label = document.getElementById(labelId)
            let date = formattedMonth[i-1]
            label.innerHTML = date
        
        }
    }
}

formatCalendarDates(formattedMonth)


