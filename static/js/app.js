// FUNCTION #1 of 4
function buildCharts(selectedPatientID) {
    d3.json("samples.json").then(data => {

        var samples = data.samples;
        var filteredSample = samples.filter(patient => patient.id == selectedPatientID)[0]
        console.log(filteredSample)

        var metadata = data.metadata;
        var filteredMetadata = metadata.filter(patient => patient.id == selectedPatientID)[0]

        console.log(filteredSample.sample_values.slice(0, 10))
        console.log(filteredSample.otu_ids.slice(0, 10))
        console.log(filteredSample.otu_labels.slice(0, 10))
        // Use sample_values as the values for the bar chart.

        // Use otu_ids as the labels for the bar chart.

        // Use otu_labels as the hovertext for the chart.

        //BAR PLOT 
        var data = [
            {
                x: filteredSample.sample_values.slice(0, 10),
                y: filteredSample.otu_ids.slice(0, 10).map(otu_id => `OTU #${otu_id}`),
                type: 'bar',
                text: filteredSample.otu_labels.slice(0, 10),
                orientation: "h"

            }
        ];

        var layout = {
            title: 'Belly Button Bacteria Bar'
        };

        Plotly.newPlot('barDiv', data, layout);


        // BUBBLE PLOT
        //         Use otu_ids for the x values.

        // Use sample_values for the y values.

        // Use sample_values for the marker size.

        // Use otu_ids for the marker colors.

        // Use otu_labels for the text values.
        var data = [{
            text: filteredSample.otu_labels,
            x: filteredSample.otu_ids,
            y: filteredSample.sample_values,
            mode: 'markers',
            marker: {
                size: filteredSample.sample_values,
                color: filteredSample.otu_ids
            }
        }];


        var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot('bubbleDiv', data, layout);


        //   GUAGE PLOT
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: filteredMetadata.wfreq,
                title: { text: "Weekly Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [null, 15] } }
            }
        ];

        var layout = { width: 600, height: 400 };
        Plotly.newPlot('gaugeDiv', data, layout);

    })
};

// FUNCTION #2 of 4
function populateDemographicInfo(selectedPatientID) {

    var demographicInfoBox = d3.select("#sample-metadata");
    demographicInfoBox.html("")

    d3.json("samples.json").then(data => {
        var metadata = data.metadata;
        var filteredMetadata = metadata.filter(patient => patient.id == selectedPatientID)[0]
        let toString = obj => Object.entries(obj).map(([k, v]) => `${k} —> ${v}`).join(', ');
        demographicInfoBox.append("h6").text(toString(filteredMetadata))

    })
}

// FUNCTION #3 of 4
function optionChanged(selectedPatientID) {
    buildCharts(selectedPatientID);
    populateDemographicInfo(selectedPatientID);
}

// FUNCTION #4 of 4
function initializeChartsAndDemoInfo() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
        buildCharts(patientIDs[0]);
        populateDemographicInfo(patientIDs[0]);
    });
};

initializeChartsAndDemoInfo();