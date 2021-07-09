// FUNCTION #1 of 4
function buildCharts(selectedPatientID) {
    d3.json("samples.json").then(data => {

        var samples = data.samples;
        var filteredSample = samples.filter(patient => patient.id == selectedPatientID)[0]
        console.log(filteredSample)

        var metadata = data.metadata;
        var filteredMetadata = metadata.filter(patient => patient.id == selectedPatientID)[0]




        //BAR PLOT 
        var trace1 = {
            x: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
            y: [20, 14, 23, 25, 22],
            marker: {
                color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
            },
            type: 'bar'
        };

        var data = [trace1];

        var layout = {
            title: 'Least Used Feature'
        };

        Plotly.newPlot('barDiv', data, layout);


        // BUBBLE PLOT
        var trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 11, 12, 13],
            mode: 'markers',
            marker: {
                size: [40, 60, 80, 100]
            }
        };

        var data = [trace1];

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
                title: { text: "Speed" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [null, 500] } }
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