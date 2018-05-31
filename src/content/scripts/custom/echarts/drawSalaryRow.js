import React from 'react';

const getSalaryRow = (title, salary, bottomMargin, time) => {
  const barStyle = { height: '4px' };

  if (bottomMargin === false) {
    barStyle.marginBottom = '0';
  }

  let convertedNumber = salary.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 });
  let width = { width: ((salary / 10000) * 5) + '%'}

  if (time === true) {
    convertedNumber = (salary) + ' Months';
    width = { width: (salary / 10) + '%' }
  }

  const obj = (
    <div key={title + salary} className="row">
      <div className="col-sm-4">
        <div className="text-left visible-xs-block">
          <h6 style={{ marginTop: '0' }}>{title}</h6>
        </div>
        <div className="text-right hidden-xs">
          <h6 style={{ marginTop: '0' }}>{title}</h6>
        </div>
      </div>
      <div className="col-sm-8">
        <h6 style={{ marginTop: '0', marginBottom: '4px' }}>{convertedNumber}</h6>
        <div className="progress" style={barStyle}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="70"
            aria-valuemin="0"
            aria-valuemax="100"
            style={width}
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
