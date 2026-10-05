const dateFormattedET = function(){
    let timeNow = new Date();
    const monthNamesET = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
    return timeNow.getDate() + '. ' + monthNamesET[timeNow.getMonth()] + ' ' + timeNow.getFullYear();
}

const addZero = function addZero(numValue){
    return numValue = String(numValue).padStart(2, '0');
}

const timeFormattedET = function(){
    let timeNow = new Date();
    let hourNow = addZero(timeNow.getHours());
    let minuteNow = addZero(timeNow.getMinutes());
    let secondNow = addZero(timeNow.getSeconds());
    let timeFormatted = hourNow + ':' + minuteNow + ':' + secondNow;
    return timeFormatted;
}

const weekDayET = function(){
    let weekDay = new Date().getDay();
    const weekDayNamesET = ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'];
    return weekDayNamesET[weekDay];
}

//ekspordin kõik vajaliku
module.exports = {fullDate: dateFormattedET, fullTime: timeFormattedET, weekDay: weekDayET}