
/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { dNc } from '../../../content/scripts/custom/utilities';
import { renderChartToTarget, redrawCharts } from '../../../content/scripts/custom/echarts/utilities';

import * as storeAction from '../../../foundation/redux/globals/DataStoreMulti/actions';


class CollapsablePanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: _.uniqueId(),
    };
  }

  getTabTitles() {
    const { content } = this.props;
    const result = [];

    content.forEach((value, index) => {
      const tmp = (
        <li className={value.active === true ? 'active' : ''} key={index + 'tab'}>
          <a data-toggle="tab" href={'#tab-factory-id-' + this.state.id + '-' + index} onClick={() => { if (dNc(value.clickCallback)) { value.clickCallback(); } }}>
            {value.title}
          </a>
        </li>
      );

      result.push(tmp);
    });

    return result;
  }

  getTabContent() {
    const { content } = this.props;
    const result = [];

    content.forEach((value, index) => {
      const tmp = (
        <div id={'tab-factory-id-' + this.state.id + '-' + index} className={value.active === true ? 'tab-pane fade in active' : 'tab-pane fade'}>
          {value.content}
        </div>
      );

      result.push(tmp);
    });

    return result;
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
    const { seperator, title } = this.props;

    let seperatorContent = null;

    if (seperator === true) {
      seperatorContent = <hr style={{ margin: '0px' }} />;
    }

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
                    {this.getTabTitles()}
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
                  {this.getTabContent()}
                </div>
              </div>

              <a href="#" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
            </div>


          </div>
        </div>
      </div>
    );
  }
}

CollapsablePanel.propTypes = {
  globalID: PropTypes.string.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired,
    active: PropTypes.bool.isRequired,
    clickCallback: PropTypes.func,
    type: PropTypes.string.isRequired,
    allowDownload: PropTypes.bool.isRequired,
    seeData: PropTypes.bool.isRequired,
    pinGraph: PropTypes.bool.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  seperator: PropTypes.bool,
  reduxAction_doUpdate: PropTypes.func,
};

CollapsablePanel.defaultProps = {
  seperator: true,
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollapsablePanel);


