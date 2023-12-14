let optionChanged = () => {

    let choice = d3.select('select').node().value;

    d3.json('./samples.json').then(({metadata, samples})=> {
        
        let meta = metadata.find(obj=>obj.id==choice); 
        let sample = samples.find(obj=>obj.id==choice);
        
        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key,val]) => {
            d3.select('.panel-body').append('h4').text(`${key.toUpperCase()}: ${val}`)
        });

        let {otu_ids, sample_values, otu_labels} = sample;

        var data = [
            {
              x: sample_values.slice(0,10).reverse(),
              y: otu_ids.slice(0,10).reverse().map(x=>`OTU ${x}`),
              text: otu_labels.slice(0,10).reverse(),
              type: 'bar',
              orientation:'h'
            }
          ];
          
          var layout1 = { width: 400, height: 400, margin: { t: 0, b: 1 } };
          Plotly.newPlot('bar', data, layout1);
          
          

          //adding Gauge Chart
          var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                //range:
                value: meta.wfreq,
                title: { text: "<b> Belly Button Washing Frequency </b> <br> Scrubs per Week",
                font: {color: "black", size: 18}
                        },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {range: [0,9], tickmode: 'linear',tick0: 2, dtick:2},
                    bar: {color: "purple"},
                    steps: [
                        { range: [0,1], color: "f8f3eb" },
                        { range: [1,2], color: "f4f1e4" },
                        { range: [2,3], color: "e9e7c8" },
                        { range: [3,4], color: "e5e7b1" },
                        { range: [4,5], color: "d5e69a" },
                        { range: [5,6], color: "b6cd8f" },
                        { range: [6,7], color: "8ac086" },
                        { range: [7,8], color: "8ac086" },
                        { range: [8,9], color: "84b588" }

                      ],
                      borderWidth: 1,
                      

                }
                
            }
            
            
        ];

        
    
        var layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);

        //adding bubble chart
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            type: 'scatter',
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
            }
          };
          
          var data = [trace1];
          
          const layoutbu = {
            margin: {t:0},
            xaxis: {title: 'OTU IDS'},
            margin: {t: 30},
            showlegend: false,
            
          }

          Plotly.newPlot('bubble', data, layoutbu);

    });
};


d3.json('./samples.json').then(({names}) => {
    names.forEach(id => {
        d3.select('select').append('option').text(id);
    });

    optionChanged();
});

