
//checks if a date was today or in the future
function isDateNowOrLater(date) {
	date = date.split('-').join('');
	date = parseInt(date);

	let now = new Date().toISOString().slice(0,10); 
	now = now.split('-').join('');
	now = parseInt(now);

	return now <= date
}

module.exports = {isDateNowOrLater};