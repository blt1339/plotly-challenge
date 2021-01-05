function buildGuage(chartData) {

  // Setup the gauge data
  let gaugeTraceData = [
  {
    type: "indicator",
    mode: "gauge+number",
    value: chartData.wfreq,
    title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs Per Week", font: { size: 30 } },
    gauge: {
      axis: { 
        range: [0, 9],
       },
      bar: { color: "darkblue", thickness: .2},
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 1], color: "#f8f3ec" },
        { range: [1, 2], color: "#f4f1e4" },
        { range: [2, 3], color: "#e9e7c9" },
        { range: [3, 4], color: "#e5e8b0" },
        { range: [4, 5], color: "#d5e599" },
        { range: [5, 6], color: "#b7cd8f" },
        { range: [6, 7], color: "#8bc086" },
        { range: [7, 8], color: "#89bc8d" },
        { range: [8, 9], color: "#84b589" }                            
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 1,
        value: 9
      }
    }
  }
  ];
  // Setup the Gauge layout
  var gaugeLayout = {
    height: 700,
    width: 1000,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "black", family: "Arial" }
  };
  
  // Build the washing frequency gauge
  Plotly.newPlot('gauge', gaugeTraceData, gaugeLayout);
}

