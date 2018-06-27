import latlong from './latitudes';

const worldColours = {
  northAmerica: '#a7a737', southAmerica: '#86a965', africa: '#de4c4f', europe: '#d8854f', asia: '#eea638', oceania: '#8aabb0',
};


const drawWorldMap = (mapData, type, value) => {
  require('echarts-maps/world.js');

  // mapData = the spots on the map.
  // mapData should be in the form  [{code: 'AF', name: 'Afghanistan', value: 32358260, color: 'asia'}]
  let max = 1000;

  mapData.forEach((itemOpt) => {
    if (itemOpt.value > max) {
      max = itemOpt.value;
    }
  });

  let visualType = {
    show: true, min: 0, max: max, calculable: true, color: ['#11293b', '#1c6cab', '#a4c0e5'], text: ['High', 'Low'],
  };

  if (type === 'scatter') {
    visualType = {
      show: false, min: 0, max, inRange: { symbolSize: [6, 60] },
    };
  }

  const options = {
    tooltip: {
      trigger: 'item',
      formatter(params) {
        const { name } = params;
        if (!params.data.value) return name;

        const population = params.data.value[2];
        return name + '<br />' + population + ' ' + value;
      },
    },
    visualMap: visualType,
    geo: {
      type: 'map',
      map: 'world',
      // roam: true, // this is the zoom!
      label: {
        emphasis: {
          show: false, // the label of the country
        },
      },
      itemStyle: {
        normal: {
          areaColor: '#d3d3d3', // country colour
          borderColor: '#111',
        },
        emphasis: {
          areaColor: '#d3d3d3',
        },
      },
    },
    series: [
      {
        type,
        mapType: 'world',
        coordinateSystem: 'geo',
        data: mapData.map(itemOpt => ({
          name: itemOpt.name,
          value: [latlong[itemOpt.code].longitude, latlong[itemOpt.code].latitude, itemOpt.value],
          label: {
            emphasis: {
              position: 'right',
              show: false, // the long number label
            },
          },
          itemStyle: {
            normal: {
              color: worldColours[latlong[itemOpt.code].color],
            },
          },
        })),
      },
    ],
  };
  return options;
};

export default drawWorldMap;
