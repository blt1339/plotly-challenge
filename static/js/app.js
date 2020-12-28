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
        // console.log(data);
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
        let sampleMetadata = metadata.filter(metaInfo => metaInfo.id.toString() === idNo)[0];
        // console.log(sampleMetadata);

        let panelBody = d3.select('#sample-metadata')
        // console.log(panelBody);

        panelBody.html("");

        Object.entries(sampleMetadata).forEach((key) => {   
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
        let samples = data.samples;
        // console.log(samples);

        let sampleSamples = samples.filter(samplesInfo => samplesInfo.id.toString() === idNo)[0];

        let top10Values = sampleSamples.sample_values.splice(0,10);
        let top10Ids = sampleSamples.otu_ids.splice(0,10);
        let top10Labels = sampleSamples.otu_labels.splice(0,10);

        let top10ChartValues = top10Values.reverse();
        console.log(top10ChartValues);
        let top10IdNums = top10Ids.reverse();
        console.log(top10IdNums);
        let top10ChartLabels = top10Labels.reverse();
        console.log(top10ChartLabels);

        top10ChartIds = [];
        for (let i = 0; i < top10IdNums.length; i++) {
            top10ChartIds.push("OTU " + top10IdNums[i])
        }
        console.log(top10ChartIds)

 
        // Create the trace for the bar chart 
        let trace1 = {
            x: top10ChartValues,
            y: top10ChartIds,
            hovertext: top10ChartLabels,
            orientation: "h",
            name: "Top10BacteriaBar",
            type: "bar"
        };

        let traceData1 = [trace1];
  
        // Setup the layout for
        let layout1 = {
            title: "Top 10 Bacteria for Test Subject",
            labels:top10ChartIds
        };
  
        // Create the bar chart
        Plotly.newPlot("bar", traceData1, layout1);

    });
}




init();