// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2], 
        payPerHour: arr[3],
        timeInEvents: [], 
        timeOutEvents: []
    }; 
}

function createEmployeeRecords(arrOfArr) {
    const thisArr = []
    arrOfArr.forEach(arr => {
        thisArr.push(createEmployeeRecord(arr));
    });
    return thisArr
}

function createTimeInEvent(employee, timeStamp) {
    // let date = timeStamp.split(' ')[0]
    // let hour = timeStamp.split(' ')[1]
    let [date, hour] = timeStamp.split(' ');
     employee.timeInEvents.push({
         type: "TimeIn", 
         hour: parseInt(hour, 10),
         date: date
     })
     return employee
}

function createTimeOutEvent(employee, timeStamp) {
    // let date = timeStamp.split(' ')[0]
    // let hour = timeStamp.split(' ')[1]
    let [date, hour] = timeStamp.split(' ');
     employee.timeOutEvents.push({
         type: "TimeOut", 
         hour: parseInt(hour, 10),
         date: date
     })
     return employee
}

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(event => event.date === date).hour;
    const timeOut = record.timeOutEvents.find(event => event.date === date).hour;
    const time = (Math.abs(timeOut - timeIn)/100);
    return time;
}

function wagesEarnedOnDate(record, date) {
    const hours = hoursWorkedOnDate(record, date); 
    return (hours * record.payPerHour);
}

function allWagesFor(record) {
    let wages = 0;
    record.timeInEvents.forEach( event => {
        // debugger
        wages += wagesEarnedOnDate(record, event.date);
    })
    return wages;
}

function calculatePayroll(arrOfEmployees) {
    let total = 0;
    arrOfEmployees.forEach( employee => {
        total += allWagesFor(employee);
    })
    return total;
}

function findEmployeeByFirstName(employees, firstName) {
    // record.timeInEvents.find(event => event.date === date)
    return employees.find( employee => employee.firstName === firstName )
}
