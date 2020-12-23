// Process when the test ID changes
function optionChanged(id) {
    getDemoData(id);
}


function init() {
    let dropDown = d3.select("#selDataset");

    // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((data) => {

        for (let i = 0; i < data.names.length; i++) {
            dropDown.append("option").text("BB_" + data.names[i]).property("value");
        }
     
        // Update demographics for the first ID 
        getDemoData("BB_" + data.names[0]);

        // data.names.forEach(function(name) {
        //     dropDown.append("option").text(name).property("value");
        // });

        // data.names.forEach(name => dropDown.append("option").text(name).property("value"));
    })
}

// Output the demographics information for chosen test id
function getDemoData(id) {
    let idParts = id.split('_')
    let idNo = idParts[1]
    console.log(idParts);
    console.log(idNo);
    


    // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((data) => {

        let metadata = data.metadata;
        console.log(metadata);
        var sampleMetadata = metadata.filter(metaInfo => metaInfo.id.toString() === idNo)[0];
        console.log(sampleMetadata);

        let panelBody = d3.select('#sample-metadata')
        console.log(panelBody);

        panelBody.html("");

        Object.entries(sampleMetadata).forEach((key) => {   
                panelBody.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });


    })
}

init();