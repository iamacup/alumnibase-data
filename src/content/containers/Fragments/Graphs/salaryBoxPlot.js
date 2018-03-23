
/* eslint-disable jsx-a11y/anchor-is-valid, no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderChartToTarget, redrawCharts, updateChartOptions } from '../../../../content/scripts/custom/echarts/utilities';
import drawBoxplotChart from '../../../../content/scripts/custom/echarts/drawBoxPlotChart';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
      panel2ID: this.props.globalID + '2',
      panel3ID: this.props.globalID + '3',
      panel4ID: this.props.globalID + '4',
    };
  }

  componentDidMount() {
    $(() => {
      const { data } = this.props;

      const colours = [['#ff7311', '#ffbb7d'], ['#d02224', '#ff8d8b'], ['#11293b', '#0b6623'], ['#1c6cab', '#a4c0e5']];

      const option1 = drawBoxplotChart(data[1].values, data[1].categories, 10000, colours[0]);
      const option2 = drawBoxplotChart(data[2].values, data[2].categories, 10000, colours[1]);
      const option3 = drawBoxplotChart(data[3].values, data[3].categories, 10000, colours[2]);
      const option4 = drawBoxplotChart(data[4].values, data[4].categories, 10000, colours[3]);

      renderChartToTarget(this.graphTarget1, option1);
      renderChartToTarget(this.graphTarget2, option2);
      renderChartToTarget(this.graphTarget3, option3);
      renderChartToTarget(this.graphTarget4, option4);
    });
  }

  // we have to do this again here because of the 'national average' button
  componentDidUpdate() {
    const { data } = this.props;

    const option1 = drawBoxplotChart(data.values, data.categories, 10000);

    updateChartOptions(this.graphTarget1, option1);
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
          <div className="panel-body">
            <div className="panel">


              <div className="panel-heading">
                <div className="panel-control">

                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a data-toggle="tab" href={'#' + this.state.panel1ID}>
                  First Year
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href={'#' + this.state.panel2ID} onClick={() => { this.clickGraph(); }}>
                  5 Years
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href={'#' + this.state.panel3ID} onClick={() => { this.clickGraph(); }}>
                  10 Years
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href={'#' + this.state.panel4ID} onClick={() => { this.clickGraph(); }}>
                  15 Years
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

              </div>

              <div className="panel-body" style={{ paddingBottom: '0' }}>
                <div className="tab-content">
                  <div id={this.state.panel1ID} className="tab-pane fade in active">
                    <div className="pad-all">
                      <div
                        className="echarts-graph"
                        style={{ width: '100%', height: '360px' }}
                        ref={(graphTarget1) => { this.graphTarget1 = graphTarget1; }}
                      />
                    </div>
                  </div>
                  <div id={this.state.panel2ID} className="tab-pane fade">
                    <div className="pad-all">
                      <div
                        className="echarts-graph"
                        style={{ width: '100%', height: '360px' }}
                        ref={(graphTarget2) => { this.graphTarget2 = graphTarget2; }}
                      />
                    </div>
                  </div>

                  <div id={this.state.panel3ID} className="tab-pane fade">
                    <div className="pad-all">
                      <div
                        className="echarts-graph"
                        style={{ width: '100%', height: '360px' }}
                        ref={(graphTarget3) => { this.graphTarget3 = graphTarget3; }}
                      />
                    </div>
                  </div>
                  <div id={this.state.panel4ID} className="tab-pane fade">
                    <div className="pad-all">
                      <div
                        className="echarts-graph"
                        style={{ width: '100%', height: '360px' }}
                        ref={(graphTarget4) => { this.graphTarget4 = graphTarget4; }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-right" style={{ marginTop: '26px' }}>
                  <h5>
                    <small>
                      Salary values when all responses are aggregated
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
  data: PropTypes.any.isRequired,
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
