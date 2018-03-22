// eslint-disable jsx-a11y/anchor-is-valid

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../content/scripts/custom/utilities';
import { drawAreaChart } from '../../../../content/scripts/custom/echarts/drawAreaChart';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class BellCurve extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
    };
  }

  componentDidMount() {
    $(() => {
      const google = window.google;
      google.charts.load('current', { packages: ['corechart'] });

      // let stndDev = 1;
      // let mean = 0;
      // let xMin = -3;
      // let xMax = 3.1;
      // let xLeft = -2;
      // let xRight = 1.25;

      // const createArray = (xMin, xMax, xLeft, xRight, mean, stndDev) => {
      //   let chartData = new Array([]);
      //   let index = 0;
      //   for (let i = xMin; i <= xMax; i += 0.1) {
      //     chartData[index] = new Array(4);
      //     chartData[index][0] = i;
      //     // chartData[index][1] = jStat.normal.pdf(i, mean, stndDev);

      //     if (i < xLeft || i > xRight) {
      //       chartData[index][2] = false;
      //     }
      //     chartData[index][3] =
      //       "opacity: 1; + color: #8064A2; + stroke-color: black; ";

      //     index++;
      //   }
      //   console.log(chartData)
      //   return chartData;
      // }

      const options = {
        legend: { position: 'bottom' },
        tooltip: { trigger: 'focus' },
      };

      const drawChart = () => {
        const string = 'opacity: 1; + color: #a6cee3; + stroke-color: #1f78b4;';
        const data = new google.visualization.DataTable();
        data.addColumn('number', 'Salary');
        data.addColumn('number', 'People');
        data.addColumn({ type: 'boolean', role: 'scope' });
        data.addColumn({ type: 'string', role: 'style' });
        data.addRows([
          [-3, 0.004, false, string],
          [-1.5, 0.13, false, string],
          [0, 0.399, true, string],
          [1.5, 0.13, false, string],
          [3, 0, false, string],
        ]);

        // createArray(-3, 3.1, -2, 1.25, 0, 1));


        const chart = new google.visualization.AreaChart(this.graphTarget1);

        //   // listen for resize events
        fireDebouncedResizeEvents();

        //   // then listen for the events here
        $(document).on('debouncedResizeEvent', () => {
          //     // and redraw the charts
          chart.draw(data, options);
        });
      };
      google.charts.setOnLoadCallback(drawChart);
    });
  }

  getImageDataForActiveGraph() {
    let $parent = $('#' + this.state.panel1ID);

    if (!$parent.hasClass('active')) {
      $parent = $('#' + this.state.panel2ID);
    }

    const $canvas = $parent.find('canvas');

    if ($canvas.length === 1) {
      return $canvas[0].toDataURL('image/png');
    }

    console.log('handle error TODO');
    return null;
  }

  clickGraph() {
    setTimeout(() => { redrawCharts(); }, 200);
  }

  download(e) {
    e.preventDefault();

    const image = this.getImageDataForActiveGraph().replace('image/png', 'image/octet-stream');

    const cleanTitle = this.props.title.replace(/\W+/g, '_');

    this.downloadLink.setAttribute('download', cleanTitle + '.png');
    this.downloadLink.setAttribute('href', image);
    this.downloadLink.click();
  }

  pin(e) {
    e.preventDefault();

    this.props.reduxAction_doUpdate('pins', this.props.globalID, {
      title: this.props.title,
      imageData: this.getImageDataForActiveGraph(),
    });
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <div className="panel-control">
            <button className="btn btn-default" data-panel="minmax" onClick={() => { this.clickGraph(); }}><i className="far fa-chevron-up" /></button>
          </div>
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="collapse in">
          <div className="panel-body" id={this.state.panel1ID}>
            <div className="pad-all">
              <div
                className="echarts-graph"
                style={{ width: '100%', height: '360px' }}
                ref={(graphTarget1) => { this.graphTarget1 = graphTarget1; }}
              />
            </div>
            <div className="text-right" style={{ marginTop: '26px' }}>
              <h5>
                <small>
                      Salary values when all responses are aggregated
                </small>
              </h5>
            </div>
          </div>
          <a href="£" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
        </div>
      </div>
    );
  }
}

BellCurve.propTypes = {
  title: PropTypes.string.isRequired,
  globalID: PropTypes.string.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

BellCurve.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BellCurve);
