/*
 * Scott Campbell
 * cse451
 * airPollution
 * */


$(document).ready(()=>{
	$(".locs").change(() => {
		createChart();
	});
	$("form").submit((event) => {
		event.preventDefault();
		createChart();
	});

	createChart();
});

function getAirPollution(loc) {
	var uri = "https://tranhuq.451.csi.miamioh.edu/cse451-tranhuq-web/airPollution/public/index.php/api/airPollution"
	const arr = loc.split(/[, ]+/);
	arr.forEach(function(n) {
		uri = uri + "/" + n;
	});

	a=$.ajax({
		url: uri
		method: "GET"
	}).done(function(data) {
		//clear out old data
		if(data["status"] == "FAIL") {
			console.error("Wrong input");
		} else {
			return data["no2"];
		}

	}).fail(function() {
	});

}

let myChart=0
function createChart() {
	console.log("createChart");
	var ctx = document.getElementById('myChart');
	try {
		myChart.destroy();	//must destroy chart before reusing, do it in try catch to handle first time
	} catch (e) {}
	let loc1=$("#loc1").val();
	let loc2=$("#loc2").val();
	let loc3=$("#loc3").val();
	let ap1=getAirPollution(loc1);
	let ap2=getAirPollution(loc2);
	let ap3=getAirPollution(loc3);
	myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: [loc1,loc2,loc3],
			datasets: [{
				label: 'Air Polution',
				data: [ap1,ap2,ap3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(155, 106, 86, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(155, 106, 86, 1)',
				],
				borderWidth: 1
			}]
		}
	});
}
