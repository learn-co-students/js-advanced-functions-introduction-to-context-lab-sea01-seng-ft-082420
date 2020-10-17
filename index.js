let createEmployeeRecord = function(array){
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(arrayofArrays){
  return arrayofArrays.map(function(array){
    return createEmployeeRecord(array)
  })
}

let createTimeInEvent = function(object, dateStamp){
  let [date,hour] = dateStamp.split(' ')
  object.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date,
  })
  return object
}

let createTimeOutEvent = function(object, dateStamp){
  let [date,hour] = dateStamp.split(' ')
  object.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date,
  })
  return object
}

let hoursWorkedOnDate = function(object, specialDate){
  let timeInEvent = object.timeInEvents.find (function(e){ return e.date === specialDate})
  let timeOutEvent = object.timeOutEvents.find(function(e){ return e.date === specialDate})

  return (timeOutEvent.hour - timeInEvent.hour) /100
}

let wagesEarnedOnDate = function(object, specialDate){
  let pay =hoursWorkedOnDate(object, specialDate) * object.payPerHour
  return pay
}

let allWagesFor = function(object){
  let workedDates = object.timeInEvents.map(function(e){ return e.date})
  let payToObject =workedDates.reduce(function(a,b){ return a + wagesEarnedOnDate(object, b)}, 0)

  return payToObject
}

let findEmployeeByFirstName = function(srcArray, firstName){
  return srcArray.find(function(e){ return e.firstName === firstName})
}

let calculatePayroll = function(array){
  return array.reduce(function(a, record){ return a+ allWagesFor(record)},0)
}