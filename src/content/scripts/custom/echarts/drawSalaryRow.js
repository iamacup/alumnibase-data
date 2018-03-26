import React from 'react';

const getSalaryRow = (title, salary, bottomMargin) => {
  const barStyle = { height: '4px' };

  if (bottomMargin === false) {
    barStyle.marginBottom = '0';
  }

  const string = '' + (salary * 1000);
  const value = '£' + string.slice(0, 2) + ',' + string.slice(2);


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
            style={{ width: salary + '%' }}
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
