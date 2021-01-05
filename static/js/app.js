// Process when the test ID changes
function optionChanged(id) {
    getDemoData(id);
    buildCharts(id);
}

// Perform the intial setup using the first ID
function init() {
    let dropDown = d3.select("#selDataset");

    // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((data) => {
        // Add all of the test subjects to the drop down box
        for (let i = 0; i < data.names.length; i++) {
            dropDown.append("option").text("BB_" + data.names[i]).property("value");
        }
        // Get / output the demographic information for the first item to start
        getDemoData("BB_" + data.names[0]);

        // Build / Output the charts for the first item to start
        buildCharts("BB_" + data.names[0])
    })
}

// Output the demographics information for chosen test id
function getDemoData(id) {

    // ID in format BB_999 so we ned to sepearate and grab the number
    let idParts = id.split('_')
    let idNo = idParts[1]
 
    // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((data) => {

        let metadata = data.metadata;
        // filter the metadata for the passed in test id
        let testSubjectMetadata = metadata.filter(metaInfo => metaInfo.id.toString() === idNo)[0];

        // Use d3 to select the panel Body
        let panelBody = d3.select('#sample-metadata')
        // console.log(panelBody);

        // Clear out the existing data in the panel body.
        panelBody.html("");

        // Add the demographic information for the passed in test id to the panel body
        Object.entries(testSubjectMetadata).forEach((key) => {   
                panelBody.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });
    })
}

// Build charts for the chosen test ID
function buildCharts(id) {
    // ID in format BB_999 so we ned to sepearate and grab the number
    let idParts = id.split('_')
    let idNo = idParts[1]
 
    // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((data) => {
        let metadata = data.metadata;
        let samples = data.samples;

        // Filter the fetched data for the passed in ID
        let testSubjectSamples = samples.filter(samplesInfo => samplesInfo.id.toString() === idNo)[0];
        let testSubjectMetadata = metadata.filter(metadataInfo => metadataInfo.id.toString() === idNo)[0];

        // Define variables for the top 10 Values, IDs and labels
        let top10Values = testSubjectSamples.sample_values.slice(0,10);
        let top10Ids = testSubjectSamples.otu_ids.slice(0,10);
        let top10Labels = testSubjectSamples.otu_labels.slice(0,10);

        // Reverse the order of the data for Plotly
        let top10ChartValues = top10Values.reverse();
        let top10IdNums = top10Ids.reverse();
        let top10ChartLabels = top10Labels.reverse();

        // Add OTU to the ids for output
        top10ChartIds = [];
        for (let i = 0; i < top10IdNums.length; i++) {
            top10ChartIds.push("OTU " + top10IdNums[i])
        }

        // Build the bar chart for passed in ID
        buildBarChart(top10ChartValues,top10ChartIds,top10ChartLabels);
        // Build the pie chart for passed in ID
        buildPieChart(top10ChartValues,top10ChartIds,top10ChartLabels);
        // Build the bubble chart for passed in ID
        buildBubbleChart(testSubjectSamples);
        // Build bonus Guage for passed in ID
        buildGuage(testSubjectMetadata);
    });
}

function buildBarChart(sampleValues,sampleIds,sampleLabels) {
    // Create the trace for the bar chart 
    let barTrace = {
        x: sampleValues,
        y: sampleIds,
        hovertext: sampleLabels,
        orientation: "h",
        name: "Top10BacteriaBar",
        type: "bar"
    };

    let barTraceData = [barTrace];
  
    // Setup the layout
    let barLayout = {
        title: "Top 10 Bacteria for Test Subject",
        labels:top10ChartIds
    };
  
    // Create the bar chart
    Plotly.newPlot("bar", barTraceData, barLayout);
}


function buildBubbleChart(chartData) {
    // Create the trace for the Bubble chart 
    let bubbleTrace = {
        x: chartData.otu_ids,
        y: chartData.sample_values,
        marker: {
            size: chartData.sample_values,
            color: chartData.otu_ids,
            colorscale: "Earth" 
        },
        text: chartData.otu_labels,
        mode: "markers"
    };

    let bubbleTraceData = [bubbleTrace];
  
    // Setup the layout for
    let bubbleLayout = {
        hovermode:'closest',
        xaxis: {
            title: 'OTU ID',
            titlefont: {
              size: 18,
              color: 'black'
            }
        },
        height: 500,
        width: 1100
    };
  
    // Create the Bubble chart
    Plotly.newPlot("bubble", bubbleTraceData, bubbleLayout);
}


function buildPieChart(sampleValues,sampleIds,sampleLabels) {
    // Create the trace for the pie chart 
    let pieTrace = {
        values: sampleValues,
        labels: sampleIds,
        hovertext: sampleLabels,
        name: "Top10BacteriaPie",
        type: "pie"
    };

    let pieTraceData = [pieTrace];

    // Setup the layout for
    let pieLayout = {
        title: "Top 10 Bacteria for Test Subject",
        labels:top10ChartIds
    };

    // Create the bar chart
    Plotly.newPlot("pie", pieTraceData, pieLayout)
}

init();