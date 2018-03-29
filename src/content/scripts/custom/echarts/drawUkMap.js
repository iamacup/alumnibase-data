
import ukData from './ukData';

const drawUKMap = (data, pieces) => {
  // pieces sould be in the form {max: #, label: "", min: # }
  const option = {
    series_id: 4242979,
    backgroundColor: '#c5d6e7',
    color: [
      '#c23531',
      '#2f4554',
      '#61a0a8',
      '#d48265',
      '#749f83',
      '#ca8622',
      '#bda29a',
      '#6e7074',
      '#546570',
      '#c4ccd3',
      '#f05b72',
      '#ef5b9c',
      '#f47920',
      '#905a3d',
      '#fab27b',
      '#2a5caa',
      '#444693',
      '#726930',
      '#b2d235',
      '#6d8346',
      '#ac6767',
      '#1d953f',
      '#6950a1',
      '#918597',
      '#f6f5ec',
    ],
    series: [
      {
        itemStyle: {
          // emphasis: {
          //   borderColor: 'black',
          // },
          normal: {
            borderColor: 'white',
          },
        },
        symbol: 'circle',
        data,
        showLegendSymbol: false,
        name: '',
        tooltip: {
          formatter: '{b}',
        },
        label: {
          emphasis: {
            show: false,
          },
        },
        mapType: 'UK_electoral_2016',
        nameMap: ukData,
        roam: true,
        type: 'map',
      },
    ],
    toolbox: {
      show: false,
    },
    legend: [
      {
        textStyle: {
          color: '#333',
          fontSize: 12,
        },
        show: true,
        top: 'top',
        data: [
          '',
        ],
        orient: 'horizontal',
        selectedMode: 'multiple',
        left: 'center',
      },
    ],
    tooltip: {
      borderColor: 'black',
      axisPointer: {
        type: 'line',
      },
      textStyle: {
        color: '#000000',
        fontSize: 14,
      },
      trigger: 'item',
      borderWidth: 1,
      backgroundColor: 'white',
      formatter: null,
      triggerOn: 'mousemove|click',
    },
    visualMap: {
      text: [
        'Legend',
      ],
      pieces,
      splitNumber: 5,
      calculable: true,
      orient: 'vertical',
      textStyle: {
        color: [
          'black',
        ],
      },
      min: 0,
      top: 'bottom',
      showLabel: true,
      max: 1,
      inRange: {
        color: ['#fff', '#e2efe2', '#c6ddc4', '#a9cca7', '#4a9150', '#11612c'],
      },
      type: 'piecewise',
      dimension: null,
      left: 'left',
    },
  };
  return option;
};

export default drawUKMap;
