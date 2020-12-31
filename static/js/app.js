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
        //console.log(data);
        for (let i = 0; i < data.names.length; i++) {
            dropDown.append("option").text("BB_" + data.names[i]).property("value");
        }

        // data.names.forEach(function(name) {
        //     dropDown.append("option").text(name).property("value");
        // });

        // data.names.forEach(name => dropDown.append("option").text(name).property("value"));
     
        // Update demographics for the first ID 
        getDemoData("BB_" + data.names[0]);

        // Build the charts for the first Idiomarina
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
        // console.log(metadata);
        let testSubjectMetadata = metadata.filter(metaInfo => metaInfo.id.toString() === idNo)[0];
        console.log(testSubjectMetadata);

        let panelBody = d3.select('#sample-metadata')
        // console.log(panelBody);

        panelBody.html("");

        Object.entries(testSubjectMetadata).forEach((key) => {   
                panelBody.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });


    })
}

// Build charts
function buildCharts(id) {
    // ID in format BB_999 so we ned to sepearate and grab the number
    let idParts = id.split('_')
    let idNo = idParts[1]
 
    // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((data) => {
        let metadata = data.metadata;
        // console.log(metadata);
        let samples = data.samples;
        // console.log(samples);

        let testSubjectSamples = samples.filter(samplesInfo => samplesInfo.id.toString() === idNo)[0];
        // console.log(testSubjectSamples);
        let testSubjectMetadata = metadata.filter(metadataInfo => metadataInfo.id.toString() === idNo)[0];
        // console.log(testSubjectMetadata);


        let top10Values = testSubjectSamples.sample_values.slice(0,10);
        let top10Ids = testSubjectSamples.otu_ids.slice(0,10);
        let top10Labels = testSubjectSamples.otu_labels.slice(0,10);

        let top10ChartValues = top10Values.reverse();
        // console.log(top10ChartValues);
        let top10IdNums = top10Ids.reverse();
        // console.log(top10IdNums);
        let top10ChartLabels = top10Labels.reverse();
        // console.log(top10ChartLabels);

        top10ChartIds = [];
        for (let i = 0; i < top10IdNums.length; i++) {
            top10ChartIds.push("OTU " + top10IdNums[i])
        }
        // console.log(top10ChartIds)

        buildBarChart(top10ChartValues,top10ChartIds,top10ChartLabels);

        buildPieChart(top10ChartValues,top10ChartIds,top10ChartLabels);

        buildBubbleChart(testSubjectSamples);

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