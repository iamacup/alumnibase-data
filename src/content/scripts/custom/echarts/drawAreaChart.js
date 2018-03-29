const drawAreaChart = (areaData, axis) => {
  // areaData sould be in the form [{name: '', data: []}];
  let xlabel = [];
  let value = '';
  // console.log(axis);
  if (!axis) {
    for (let i = 20; i < 51; i++) {
      xlabel.push(i);
    }
  } else {
    xlabel = axis;
    value = 'years';
  }

  const areaColours = ['#2b577e', '#d7d4c5', '#e8912c', '#6f6b51', '#6ca7da', '#e7b93a', '#0e1422'];

  function getSeries(data) {
    const seriesData = [];
    data.forEach((element, i) => {
      const color = areaColours[i];
      const seriesSingle = {
        name: element.name,
        type: 'line',
        stack: 'Stack',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 3,
          },
        },
        // markLine: markline,
        itemStyle: {
          normal: {
            color,
          },
        },
        areaStyle: {
          normal: {
            opacity: 1,
          },
        },
        data: element.data,
      };
      seriesData.push(seriesSingle);
    });
    return seriesData;
  }


  const option = {
    legend: {
      data: areaData.map(obj => obj.name),
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xlabel,
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: '{value}' + value,
        textStyle: {
          color: '#999',
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#999',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#ddd',
        },
      },
    },

    series: getSeries(areaData),
  };
  return option;
};

export default drawAreaChart;
