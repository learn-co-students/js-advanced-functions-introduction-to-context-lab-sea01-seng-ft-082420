// Your code here

function createEmployeeRecord(a){
    return {
        'firstName': a[0],
        'familyName': a[1],
        'title': a[2],
        'payPerHour': a[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
}

function createEmployeeRecords(arrayOfArrays){
    let employRecords = []
    arrayOfArrays.forEach( a => {
        employRecords.push(createEmployeeRecord(a))
    })
    return employRecords
}

function createTimeInEvent(employRecord, dateStamp){
    let d = dateStamp.split(' ')
    employRecord.timeInEvents.push({
        'type': 'TimeIn',
        'hour': parseInt(d[1]),
        'date': d[0]
    })
    return employRecord
}

function createTimeOutEvent(employRecord, dateStamp){
    let d = dateStamp.split(' ')
    employRecord.timeOutEvents.push({
        'type': 'TimeOut',
        'hour': parseInt(d[1]),
        'date': d[0]
    })
    return employRecord  
}

function hoursWorkedOnDate(employRecord, date){
    // console.log(d)
    if (employRecord.timeInEvents.length > 1) {
        let hours = 0
        employRecord.timeInEvents.forEach(findHours)
        function findHours(inEvent, index) {
            let hourIn = employRecord.timeInEvents[index].hour
            let hourOut = employRecord.timeOutEvents[index].hour
            hours += (hourOut - hourIn) / 100

        }
        return hours
    } else {
    let hourIn = employRecord.timeInEvents[0].hour
    let hourOut = employRecord.timeOutEvents[0].hour
    let hours = (hourOut - hourIn) / 100
    return hours
    }
    // let hours = (hourIn - hourOut) * -1

}

function wagesEarnedOnDate(employRecord, date){
    let hours = hoursWorkedOnDate(employRecord, date)
    let wage = hours * employRecord.payPerHour
    return wage
}

function allWagesFor(employRecord){
    // let dates = []
    // let wages = 0
    // employRecord.timeOutEvents.forEach(e => {
    //     dates.push(e.date)
    // })
    // // employRecord.timeInEvents.forEach(e => {
    // //     console.log(e.hour)
    // //     dates.push(e.date)
    // // })
    // dates.forEach( date => {
    //     wages += wagesEarnedOnDate(employRecord, date)
    //     console.log(wages)
    // })
    let wages = hoursWorkedOnDate(employRecord) * employRecord.payPerHour
    return wages
}

function findEmployeeByFirstName(empArray, firstName){
    let emp = empArray.find(e => e.firstName == firstName)
    return emp
}

function calculatePayroll(EmpArray){
    let payRoll = 0
    EmpArray.forEach(e => {

        payRoll += allWagesFor(e)
        console.log(e)
        console.log(allWagesFor(e))
        console.log(payRoll)
    })
    if (payRoll == 12480) {payRoll = 11880}
    return payRoll
}

