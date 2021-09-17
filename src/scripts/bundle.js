(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

function formatDate(date) {

    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();

    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    date = yyyy+'/'+mm+'/'+dd;
    return date
 }

function past7Dates() {
    var datesOfWeek = [];
    var daysOfWeek = []
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        datesOfWeek.push( formatDate(d) )
        daysOfWeek.push( d.getDay() )
    }
    var datesAndDay = {}
    for (var i=0; i<datesOfWeek.length; i++) {
        
        datesAndDay[datesOfWeek[i]] = daysOfWeek[i]
    }

    return [datesAndDay, datesOfWeek];
}

let datesAndDay = past7Dates()[0]
let datesOfWeek = past7Dates()[1]


function findFirstSunday(datesAndDay) {
    let sunday = 'unassigned'
    for (const date in datesAndDay) {
        if (datesAndDay[date] === 0) {
            sunday = date
        }
    }
    return sunday
}

let firstSunday = findFirstSunday(datesAndDay)

//string of format 'yyyy/mm/dd' to Date format
function stringToDate(stringDate) {
    let year = stringDate.split('/')[0];
    let date31 = stringDate.split('/')[2];
    let month = stringDate.split('/')[1];
    let date = new Date(year, month-1, date31);
    return date;
}

function getFirstSundayPosition(firstSunday, datesOfWeek) {
    return datesOfWeek.indexOf(firstSunday);
}

let sundayPosition = getFirstSundayPosition(firstSunday, datesOfWeek);
console.log(sundayPosition)


function getTwoWeekList(sundayPosition, datesOfWeek) {
    let datesAddedBefore = Array(7 - sundayPosition).fill('NA');
    let datesAddedAfter = Array(0 + sundayPosition).fill('NA');
    datesOfWeek.unshift(datesAddedBefore);
    datesOfWeek.push(datesAddedAfter);
    return datesOfWeek.flat(Infinity);
}

let fullTwoWeeks = getTwoWeekList(sundayPosition, datesOfWeek)
console.log(fullTwoWeeks)

function formatDateLabel(datesOfWeek, sundayPosition) {
    for (var i=1; i<15; i++) {
        elem_id = 'blday_' + i.toString();
        x=document.getElementById(elem_id);


    }
}

module.exports.sundayPosition = sundayPosition;
module.exports.fullTwoWeeks = fullTwoWeeks;

//var x=document.getElementById("lblday_1");
//x.innerHTML= '07/07' ;

//var x=document.getElementById("lblday_8");

//x.innerHTML= "07/14" ;


//document.getElementById("lblday1").value=dt
},{}],2:[function(require,module,exports){
const calendarInfo = require('/Users/nathandidier/Desktop/OTLFB_project/src/calendar.js')

function formatTextBoxes() {
    for (var i=1; i<15; i++) {
        var elem_id = 'day_' + i.toString();
        document.getElementById(elem_id).style.width='50px';
        document.getElementById(elem_id).style.height="40px";
    }
}

function formatTextBoxLabels() {
    for (var i=1; i<15; i++) {
        var elem_id = 'lblday_' + i.toString();
        document.getElementById(elem_id).style.padding='25px 0 0 25px';
    }
}

formatTextBoxLabels();

function getVal(elementID) {
    elem = document.getElementById(elementID);
    let input1 = elem.value;
    alert(input1);

}

formatTextBoxes();





//var x=document.getElementById("lblday_1");
//x.innerHTML= '07/07' ;

//var x=document.getElementById("lblday_8");

//x.innerHTML= "07/14" ;


//document.getElementById("lblday1").value=dt
},{"/Users/nathandidier/Desktop/OTLFB_project/src/calendar.js":1}]},{},[2]);
