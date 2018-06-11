const drawHeatMap = (axisData, graphData) => {

// axisData should be an object { xAxis: [titles], yAxis: [titles]}
// data should be in the format [[how many on the y-axis, how many on the x-axis, the number to fill]]
// let data = [[1, 2, 3], [4, 5, 6], [0, 0, 1], [0, 1, 0], [0, 2, 1]]
let data = graphData.map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});

let max = 10;

graphData.forEach(arr => {
    if (arr[2] > max) max = arr[2];
})

// origins and destinat
let option = {
    tooltip: {
        position: 'top',
        formatter: function (params) {
            console.log(params)
            return params.name + ' - ' + params.data[2]
        }
    },
    animation: false,
    grid: {
        height: '50%',
        y: '10%'
    },
    xAxis: {
        type: 'category',
        data: axisData.xAxis,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: axisData.yAxis,
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: 0,
        max,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
    },
    series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: data,
        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};

return option;
}

export default drawHeatMap;