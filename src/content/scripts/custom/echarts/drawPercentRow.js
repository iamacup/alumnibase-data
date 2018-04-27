import React from 'react';

const getPercentRow = (title, percentage, bottomMargin) => {
  const barStyle = { height: '4px' };

  if (bottomMargin === false) {
    barStyle.marginBottom = '0';
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
        <h6 style={{ marginTop: '0', marginBottom: '4px' }}>{percentage}%</h6>
        <div className="progress" style={barStyle}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="700"
            aria-valuemin="0"
            aria-valuemax="100000"
            style={{ width: percentage + '%' }}
          >
            <span className="sr-only">{percentage}% Complete</span>
          </div>
        </div>
      </div>
    </div>
  );

  return obj;
};

export default getPercentRow;
