
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import { drawLineChart } from '../../../../content/scripts/custom/echarts/generators';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
      panel2ID: this.props.globalID + '2',
    };
  }

  componentDidMount() {
    $(() => {
      const age = [];
      const plotted = [];

      const start = 9.1;
      const end = 5.6;

      const firstAge = 21;
      const lastAge = 61;

      let current = start;
      const increment = (start - end) / (lastAge - firstAge);

      for (let a = firstAge; a < lastAge; a++) {
        age.push(a);
        plotted.push(Number(current.toPrecision(2)));

        current -= increment;

        console.log(increment);
      }

      const data = {
        age,
        plotted,
      };

      const option = drawLineChart(data, 'Age', 'Average Response');

      renderChartToTarget(this.graphTarget1, option);
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

  getPercentageBlock() {
    const randombetween = (min, max) => Math.floor(Math.random() * ((max - (min + 1)) + min));

    const generate = (max, thecount) => {
      const r = [];
      let currsum = 0;
      for (let i = 0; i < thecount - 1; i++) {
        r[i] = randombetween(1, max - (thecount - i - 1) - currsum);
        currsum += r[i];
      }
      r[thecount - 1] = max - currsum;
      return r;
    };

    const rands = generate(100, 11);

    const obj = (
      <div>
        {this.getPercentRow('10', rands[0])}
        {this.getPercentRow('9', rands[1])}
        {this.getPercentRow('8', rands[2])}
        {this.getPercentRow('7', rands[3])}
        {this.getPercentRow('6', rands[4])}
        {this.getPercentRow('5', rands[5])}
        {this.getPercentRow('4', rands[6])}
        {this.getPercentRow('3', rands[7])}
        {this.getPercentRow('2', rands[8])}
        {this.getPercentRow('1', rands[9])}
        {this.getPercentRow('0', rands[10], false)}
      </div>
    );

    return obj;
  }

  getPercentRow(title, percentage, bottomMargin) {
    const barStyle = { height: '4px' };

    if (bottomMargin === false) {
      barStyle.marginBottom = '0';
    }

    const obj = (
      <div className="row">
        <div className="col-sm-2">
          <div className="text-left visible-xs-block">
            <h6 style={{ marginTop: '0' }}>{title}</h6>
          </div>
          <div className="text-right hidden-xs">
            <h6 style={{ marginTop: '0' }}>{title}</h6>
          </div>
        </div>
        <div className="col-sm-10">
          <h6 style={{ marginTop: '0', marginBottom: '4px' }}>{percentage}%</h6>
          <div className="progress" style={barStyle}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="70"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: percentage + '%' }}
            >
              <span className="sr-only">{percentage}% Complete</span>
            </div>
          </div>
        </div>
      </div>
    );

    return obj;
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
            <button className="btn btn-default" data-panel="minmax"><i className="far fa-chevron-up" /></button>
          </div>
          <h3 className="panel-title">{this.props.title}</h3>
        </div>

        <div className="collapse in">
          <div className="panel-body" style={{ paddingBottom: '0', paddingTop: '0' }}>

            <div className="panel">
              <div className="panel-heading">
                <div className="panel-control">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a data-toggle="tab" href={'#' + this.state.panel1ID}>
                  Overall
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href={'#' + this.state.panel2ID} onClick={() => { this.clickGraph(); }}>
                  Trends
                      </a>
                    </li>
                  </ul>
                  <div className="btn-group dropdown">
                    <button data-toggle="dropdown" className="dropdown-toggle btn btn-default btn-active-primary">
                      <i className="caret" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li><a href="#" onClick={(e) => { this.download(e); }} ><i className="far fa-download" /> Download Image</a></li>
                      <li><a href="#"><i className="far fa-table" /> See Underlying Data</a></li>
                      <li><a href="#" onClick={(e) => { this.pin(e); }}><i className="fas fa-thumbtack" /> Pin Graph</a></li>
                    </ul>
                  </div>
                </div>
                <h3 className="panel-title"><strong /></h3>
              </div>

              <hr style={{ margin: 0 }} />

              <div className="panel-body" style={{ paddingBottom: '0' }}>

                <div className="tab-content">
                  <div id={this.state.panel1ID} className="tab-pane fade in active">
                    {this.getPercentageBlock()}
                  </div>
                  <div id={this.state.panel2ID} className="tab-pane fade">
                    <div className="pad-all">

                      <h5>
                          Trends averaged for each age group with responses, plotted below
                      </h5>

                      <div
                        className="echarts-graph"
                        style={{ width: '100%', height: '360px' }}
                        ref={(graphTarget1) => { this.graphTarget1 = graphTarget1; }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-right" style={{ marginTop: '26px' }}>
                  <h5>
                    <small>
                      Percentage values when all responses are aggregated, ranging from:<br /><br />
              0 meaning respondent did not feel impacted for question asked <br />
              10 meaning respondent felt most possible impact for question asked
                    </small>
                  </h5>
                </div>

              </div>


              <a href="" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  globalID: PropTypes.string.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

Graph.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

