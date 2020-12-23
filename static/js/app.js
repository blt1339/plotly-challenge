

function init() {
    let dropDown = d3.select("#selDataset");

    // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((data) => {

        for (let i = 0; i < data.names.length; i++) {
            dropDown.append("option").text("BB_" + data.names[i]).property("value");
        }

        // data.names.forEach(function(name) {
        //     dropDown.append("option").text(name).property("value");
        // });

        // data.names.forEach(name => dropDown.append("option").text(name).property("value"));
    })
}



init();