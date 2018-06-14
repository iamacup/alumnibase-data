
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { connect } from 'react-redux';

import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';

const dataStoreID = 'overview';
const FetchData = fetchDataBuilder(dataStoreID);

// eslint-disable-next-line react/prefer-stateless-function
class Page extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>This is a page</h1>

        <FetchData
          active
          fetchURL="api/analytics/overview"
          sendData={{ filterData: {} }}
        />
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
