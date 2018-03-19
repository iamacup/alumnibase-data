
/*
  because of webpack its hard to import the data tool as a js dep
  so we take the relevant source from
  https://github.com/ecomfe/echarts/blob/master/dist/extension/dataTool.js
  and manually require it in as needed
 */

/* eslint-disable */

function asc(arr) {
  arr.sort((a, b) => a - b);
  return arr;
}

const quantile = function (ascArr, p) {
  let H = (ascArr.length - 1) * p + 1,
    h = Math.floor(H),
    v = +ascArr[h - 1],
    e = H - h;
  return e ? v + e * (ascArr[h] - v) : v;
};

const prepareBoxplotData = function (rawData, opt) {
  opt = opt || [];
  const boxData = [];
  const outliers = [];
  const axisData = [];
  const boundIQR = opt.boundIQR;
  const useExtreme = boundIQR === 'none' || boundIQR === 0;

  for (let i = 0; i < rawData.length; i++) {
    axisData.push(i + '');
    const ascList = asc(rawData[i].slice());

    const Q1 = quantile(ascList, 0.25);
    const Q2 = quantile(ascList, 0.5);
    const Q3 = quantile(ascList, 0.75);
    const min = ascList[0];
    const max = ascList[ascList.length - 1];

    const bound = (boundIQR == null ? 1.5 : boundIQR) * (Q3 - Q1);

    const low = useExtreme
      ? min
      : Math.max(min, Q1 - bound);
    const high = useExtreme
      ? max
      : Math.min(max, Q3 + bound);

    boxData.push([low, Q1, Q2, Q3, high]);

    for (let j = 0; j < ascList.length; j++) {
      const dataItem = ascList[j];
      if (dataItem < low || dataItem > high) {
        const outlier = [i, dataItem];
        opt.layout === 'vertical' && outlier.reverse();
        outliers.push(outlier);
      }
    }
  }
  return {
    boxData,
    outliers,
    axisData,
  };
};

export default prepareBoxplotData;
