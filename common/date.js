
//checks if a date was today or in the future
//ex input 2019-03-29
function isDateNowOrLater(date) {    
    date = date.split('-').join('');
	date = parseInt(date);

    let now = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    
    now = now.split(",")[0];
    now = now.split("/");

    let day = (now[0].length == 1) ? '0' + now[0] : now[0];
    let month = (now[1].length == 1) ? '0' + now[1] : now[1];
    let year = now[2];
    now = year + day + month;    
    console.log("now is "+now);
    console.log("date is "+date);
	return now <= date
}

module.exports = {isDateNowOrLater};