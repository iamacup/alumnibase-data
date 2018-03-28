import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import drawBoxplotChart from '../../../../../../content/scripts/custom/echarts/drawBoxPlotChart';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showNationalAverage: false,
    };
  }

  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Graduate Salaries',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'Salary',
          link: '/analytics/salary',
        },
        {
          name: 'Graduate Salaries',
          link: '/analytics/salary/1',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');

      // make the checkbox look nice with switchery
      const elem = document.querySelector('#switchery-switch');

      // eslint-disable-next-line no-undef
      const init = new Switchery(elem);

      elem.onchange = () => {
        this.clickShowNationalAverage();
      };
    });
  }

  getBoxPlot(input, title, id) {
    // const colours = [['#ff7311', '#ffbb7d'], ['#d02224', '#ff8d8b'], ['#11293b', '#0b6623'], ['#1c6cab', '#a4c0e5']];

    const options = drawBoxplotChart(input.values, input.categories, 40000);

    const panel = (
      <TabbedGraphPanel
        title={title}
        globalID={id}
        content={[
            {
              title: '',
              active: true,
              postContent: <div className="pull-right"><p>Data is shown for all survery data with any filters applied.</p></div>,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: {
                  options,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  clickShowNationalAverage() {
    this.setState({ showNationalAverage: !this.state.showNationalAverage });
  }

  render() {
    console.log(this.state);

    const genderData = {
      categories: ['Female', 'Male'],
      values: [
        [28000, 200000],
        [26000, 250000],
      ],
    };

    const ethnicityData = {
      categories: ['White', 'Mixed', 'Asian', 'Black / African / Caribbean', 'Other'],
      values: [
        [29000, 250000],
        [26000, 240000],
        [26000, 230000],
        [26000, 240000],
        [29000, 230000],
      ],
    };

    const religionData = {
      categories: ['No Religion', 'Chrstian', 'Buddhist', 'Hindu', 'Jewish', 'Muslim', 'Sikh', 'Other'],
      values: [
        [29000, 250000],
        [29000, 250000],
        [26000, 240000],
        [26000, 250000],
        [29000, 230000],
        [29000, 250000],
        [26000, 240000],
        [26000, 250000],
      ],
    };

    if (this.state.showNationalAverage === true) {
      const nationalAverageSalaryData = [26000, 28700];

      genderData.categories.push('National Average');
      genderData.values.push(nationalAverageSalaryData);

      ethnicityData.categories.push('National Average');
      ethnicityData.values.push(nationalAverageSalaryData);

      religionData.categories.push('National Average');
      religionData.values.push(nationalAverageSalaryData);
    }

    const content = (
      <div id="page-content">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <BasicPanel
              content={

                <div>
                  <p>
                    This data displays the average pay gaps between <strong>gender, ethnicity and religion</strong>.<br /><br />
                    <strong>Remember</strong> to use the filters above to narrow your analytics to specific <strong>year groups, subjects, or other areas</strong>.<br /><br />
                  </p>

                  <div className="row">
                    <div className="col-sm-4 col-sm-push-4">
                      <div className="panel media middle">
                        <div className="media-left bg-primary pad-all">
                          <input id="switchery-switch" type="checkbox" />
                        </div>
                        <div className="media-body pad-lft bg-on-white">
                          <p className="text-muted mar-no">Show national average on graphs - <strong style={{ color: 'red' }}>NEED TO DISCUSS IF WE KEEP THIS</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            {this.getBoxPlot(genderData, 'Average pay, split by gender', 'salary-0-1')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            {this.getBoxPlot(ethnicityData, 'Average pay, split by ethnicity', 'salary-0-2')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            {this.getBoxPlot(religionData, 'Average pay, split by religion', 'salary-0-3')}
          </div>
        </div>

      </div>
    );

    const { location } = this.props;

    return (
      <Wrapper content={content} theLocation={location} />
    );
  }
}

Page.propTypes = {
  location: PropTypes.object.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
