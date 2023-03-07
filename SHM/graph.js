let dps = []; // dataPoints
let chart = new CanvasJS.Chart("displacement", {
    backgroundColor: "#003049",

    axisX:{
        title : "Time",
        labelFontColor: '#003049',
        titleFontColor: "#FFF",
    },
    axisY:{
        title : "displacement",
        minimum : -250,
        maximum : 250,
        titleFontColor: "#FFF",
        labelFontColor: "#FFF"
    },
	title :{
		text: "Displacement-Time Graph",
        fontFamily: 'Tilt Warp',
        fontColor: '#FFF',

	},
	data: [{
		type: "spline",
        markerType: "none",
		dataPoints: dps
	}]
});

let xVal = 0;
let yVal = 0; 
let updateInterval = 250;
let dataLength = 20; // number of dataPoints visible at any point

let updateChart = (count) => {

	count||= 1;

	for (let j = 0; j < count; j++) {
		yVal = boxB.position.x - 400
		dps.push({
			x: xVal,
			y: yVal
		});
		xVal++;
	}

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};

updateChart(dataLength);
setInterval(function(){updateChart()}, updateInterval);