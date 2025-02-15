// Your code here
function createEmployeeRecord(array){
    let employeeRecord = {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : [] 
    }
    return employeeRecord;
}

function createEmployeeRecords(records){
    let employeeRecords = records.map(record => createEmployeeRecord(record))
    return employeeRecords
}

function createTimeInEvent(empRec, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    empRec.timeInEvents.push({
        type : "TimeIn",
        hour: parseInt(hour,10),
        date,
    })
    return empRec
}

function createTimeOutEvent(empRec, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    empRec.timeOutEvents.push({
        type: "TimeOut",
        hour : parseInt(hour, 10),
        date
    })
    return empRec
}

function hoursWorkedOnDate(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
                 return e.date === soughtDate
             })
             let outEvent = employee.timeOutEvents.find(function(e){
                 return e.date === soughtDate
             })
             return (outEvent.hour - inEvent.hour) / 100

}

function wagesEarnedOnDate(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
         * employee.payPerHour
     return parseFloat(rawWage.toString())

}

function allWagesFor(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
                 return e.date
             })
             let payable = eligibleDates.reduce(function(memo, d){
                 return memo + wagesEarnedOnDate(employee, d)
             }, 0)
             return payable
         }
         let findEmployeeByFirstName = function(srcArray, firstName) {
           return srcArray.find(function(rec){
             return rec.firstName === firstName
           })


}
let calculatePayroll = function(arrayOfEmployeeRecords){
           return arrayOfEmployeeRecords.reduce(function(memo, rec){
               return memo + allWagesFor(rec)
           }, 0)
       }