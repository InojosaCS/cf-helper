function getPerformances(results) {
	const handle = results[0].handle;
	const firstDelta = results[0].newRating - 1500;
	const firstPerformance = 1500 + firstDelta * 4;
	const firstDate = new Date(results[0].ratingUpdateTimeSeconds * 1000);
	let performances = [{x: firstDate, y: firstPerformance}];

	for(let i = 1; i < results.length; i++){
		const delta = results[i].newRating - results[i].oldRating;
		const performance = results[i].oldRating + delta * 4;
		const date = new Date(results[i].ratingUpdateTimeSeconds * 1000);
		performances.push({x: date, y: performance});	
	}

	console.log(performances);
	const title = document.getElementById('performance-title');
	title.innerText = 'Performances of ' + handle;
	renderChart(performances);
	return performances;
}

function renderChart(series){
	JSC.Chart('chartDiv', {
		 series: [
			 {
			 	points: series
			 }
		 ]
	});
}

export { getPerformances };