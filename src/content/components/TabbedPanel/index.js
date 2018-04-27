
/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { dNc } from '../../../content/scripts/custom/utilities';

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
        <div key={index + 'tab'} id={'tab-factory-id-' + this.state.id + '-' + index} className={value.active === true ? 'tab-pane fade in active' : 'tab-pane fade'}>
          {value.content}
        </div>
      );

      result.push(tmp);
    });

    return result;
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

            <ul className="nav nav-tabs">
              {this.getTabTitles()}
            </ul>

          </div>
          <h3 className="panel-title">{title}</h3>
        </div>
        {seperatorContent}
        <div className="panel-body" style={{ paddingBottom: '15px' }}>

          <div className="tab-content">
            {this.getTabContent()}
          </div>
        </div>
      </div>
    );
  }
}

CollapsablePanel.propTypes = {
  content: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  seperator: PropTypes.bool,
};

CollapsablePanel.defaultProps = {
  seperator: true,
};

export default CollapsablePanel;
