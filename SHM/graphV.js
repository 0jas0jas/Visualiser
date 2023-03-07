let points = []; // dataPoints
let chartV = new CanvasJS.Chart("velocity", {
    backgroundColor: "#003049",

    axisX:{
        title : "Time",
        labelFontColor: '#003049',
        titleFontColor: "#FFF",
    },
    axisY:{
        title : "Velocity",
        titleFontColor: "#FFF",
        // minimum : -5,
        // maximum : 5,
        labelFontColor: "#FFF"
    },
	title :{
		text: "Velocity-Time Graph",
        fontFamily: 'Tilt Warp',
        fontColor: '#FFF',

	},
	data: [{
		type: "spline",
        markerType: "none",
		dataPoints: points
	}]
});

let tVal = 0;
let vVal = 0; 
// let updateIntervalV = 500;
// let dataLength = 20; // number of dataPoints visible at any point

let updateChartV = (count) => {

	count||= 1;

	for (let j = 0; j < count; j++) {
		vVal = boxB.speed
		points.push({
			x: tVal,
			y: vVal
		});
		tVal++;
	}

	if (points.length > dataLength) {
		points.shift();
	}

	chartV.render();
};

updateChart(dataLength);
setInterval(function(){updateChartV()}, updateInterval);