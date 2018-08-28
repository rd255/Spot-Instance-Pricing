
// Load google charts 
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

// function to construct query to draw chart
function drawChart() {
	// Get selected value of Instance type
	var e = document.getElementById("Type");
	var instanceType = e.options[e.selectedIndex].value;

	// Get selected value of region
	var f = document.getElementById("Region");
	var region = f.options[f.selectedIndex].value;

	// construct query to retrieve data as per selection
  	var queryString = encodeURIComponent('SELECT A, D/F , E/F'  
 	+ ' WHERE (B = "' + instanceType + '" and C = "' + region + '") and ( D/F > 0 or E/F >0)'
   	+ ' label D/F "Linux Rate", E/F "Windows Rate"');  
  	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/12uN1riEIVUZ1PkRAnZk4WST9ng6TcC9p81Ms7tpVZ3k/gviz/tq?headers=1&tq=' + queryString );
 	query.send(handleQueryResponse);
}

// function to draw chart
function handleQueryResponse(response) {
  
	var data = response.getDataTable();
	
	// customize chart title, axis labels and format
	var options = {
        title: 'AWS spot instance price',
		height:2000,
		bar: {groupWidth: "80%"},
        vAxis: {
          title: 'Instance name',
        },
        hAxis: {
          title: 'Cost per vCPU per hour',
          format: 'currency',
        }
      };
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
  
}
