// eslint-disable jsx-a11y/anchor-is-valid

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import drawAreaChart from '../../../../content/scripts/custom/echarts/drawAreaChart';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
    };
  }

  componentDidMount() {
    let axis = false;
    if (this.props.axis.length > 1) axis = this.props.axis;

    const options = drawAreaChart(this.props.data, axis);

    renderChartToTarget(this.graphTarget1, options);
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
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
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
                      Destinations and corresponding age values when all responses are aggregated
              </small>
            </h5>
          </div>
        </div>
        <a href="£" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
      </div>


    );
  }
}

Graph.propTypes = {
  axis: PropTypes.array.isRequired,
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
