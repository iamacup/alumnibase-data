import React from 'react';

const getSalaryRow = (title, salary, bottomMargin, time) => {
  const barStyle = { height: '4px' };

  if (bottomMargin === false) {
    barStyle.marginBottom = '0';
  }

  let length = 3;
  const string = '' + (salary * 1000);
  let value = '£' + string.slice(0, 2) + ',' + string.slice(2);
  if (string.length < 5) value = '£' + string.slice(0, 1) + ',' + string.slice(1, string.length);

  if (time) {
    value = salary + ' Months';
    length = 5;
  }

  const obj = (
    <div className="row">
      <div className="col-sm-4">
        <div className="text-left visible-xs-block">
          <h6 style={{ marginTop: '0' }}>{title}</h6>
        </div>
        <div className="text-right hidden-xs">
          <h6 style={{ marginTop: '0' }}>{title}</h6>
        </div>
      </div>
      <div className="col-sm-8">
        <h6 style={{ marginTop: '0', marginBottom: '4px' }}>{value}</h6>
        <div className="progress" style={barStyle}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="70"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: (salary * length) + '%' }}
          >
            <span className="sr-only">{salary}% Complete</span>
          </div>
        </div>
      </div>
    </div>
  );

  return obj;
};

export default getSalaryRow;
