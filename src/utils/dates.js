import moment from 'moment';

const dates = {};

export default dates;

dates.getDays = (interval) => {
    let days = [];
    for (let i = (interval-1); i >= 0 ; i--) {
        let day = moment().subtract(i, 'days');
        days.push(day.format('DD-MMM'));
    }

    return days;
    
}

dates.getMonths = (interval) => {
    let months = [];
    for (let i = (interval-1); i >= 0 ; i--) {
        let month = moment().subtract(i, 'month');
        months.push(month.format('MMM'));
    }

    return months;
    
}


dates.getWeeks = (interval) => {
    let weeks = [];
    for (let i = (interval-1); i >= 0 ; i--) {
        let weekEnd = moment().subtract(i, 'weeks');
        let weekStart = moment().subtract(i+1, 'weeks').add(1, 'days');
       
        weeks.push(weekStart.format('DD') + weekEnd.format('-DD') + weekEnd.format(' MMM'));
    }

    return weeks;
    
}


dates.getQuarters = (interval) => {

    let quarters = [];
    for (let i = (interval-1); i >= 0 ; i--) {
        let quarter = moment().subtract(i, 'Q');
        quarters.push(quarter.format('[q]Q-YYYY'));
    }

    return quarters;
}

