
/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dNc, debounce, initialiseNonMobileSticky } from '../../../../content/scripts/custom/utilities';

import currencyData from './currencyData';
import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';
import BasicPanel from '../../../../content/components/BasicPanel';
import Wrapper from '../../../../content/containers/Fragments/Template/wrapper';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

const dataStoreID = 'filter';
const FetchData = fetchDataBuilder(dataStoreID);

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = ({
      countryOfBirth: null,
      currentCountry: null,
      gender: null,
      ethnicity: null,
      ageRange: null,
      graduactionRange: null,
      salaryRange: null,
      subject: null,
      degreeLevel: null,
      stem: null,
      polar: null,
      currency: 'GBP',
    });
  }

  componentDidMount() {
    if (dNc(this.props.filterData)) {
      Object.keys(this.props.filterData).forEach((filter) => {
        if (dNc(this.props.filterData[filter])) {
          this.setState({
            [filter]: this.props.filterData[filter],
          });
        }
      });
    }

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
      // make the checkbox look nice with switchery
      const elem = document.querySelector('#demo-sw-unchecked1');
      // eslint-disable-next-line no-undef, no-unused-vars
      const init = new Switchery(elem);
      // elem.onchange = () => {
      // this.clickShowNationalAverage();
      // };
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
      // make the checkbox look nice with switchery
      const elem2 = document.querySelector('#demo-sw-unchecked2');
      // eslint-disable-next-line no-undef, no-unused-vars
      const init2 = new Switchery(elem2);
      // elem2.onchange = () => {
      // this.clickShowNationalAverage();
      // };


      $('#sel1').select2({
        width: '100%',
        multiple: true,
        allowClear: true,
        tags: true,
        tokenSeparators: [',', ' '],
        placeholder: 'Using all locations...',
      });

      // set the input box to hold whats already in the state.
      $('#sel1')
        .val(this.state.countryOfBirth)
        .trigger('paste');

      // remove the empty option
      $('#sel1')
        .find('option')
        .each((index, vertex) => {
          if (!dNc($(vertex).text())) {
            $(vertex).remove();
          }
        });
      // set in state
      $('#sel1').on('change', () => {
        let data = [];
        if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])){
          this.props.reduxState_fetchDataTransaction.default.payload[0].countryOfBirth.forEach(element => {
            $('#sel1').val().forEach(value => {
            if (element.displayValue === value) data.push(element.optionID)
            })
          })
        }
        this.setStateWithValue('countryOfBirth', data);
      });

      $('#sel2').select2({
        width: '100%',
        multiple: true,
        allowClear: true,
        tags: true,
        tokenSeparators: [',', ' '],
        placeholder: 'Using all locations',
      });

      // set the input box to hold whats already in the state.
      $('#sel2')
        .val(this.state.currentCountry)
        .trigger('paste');

      // remove the empty option
      $('#sel2')
        .find('option')
        .each((index, vertex) => {
          if (!dNc($(vertex).text())) {
            $(vertex).remove();
          }
        });

      $('#sel2').on('change', () => {
        let data = [];
        if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])){
          this.props.reduxState_fetchDataTransaction.default.payload[0].currentCountry.forEach(element => {
            $('#sel2').val().forEach(value => {
            if (element.displayValue === value) data.push(element.optionID)
            })
          })
        }

        this.setStateWithValue('currentCountry', data);
      });

      $('#sel3').select2({
        width: '100%',
        multiple: true,
        allowClear: true,
        tags: true,
        tokenSeparators: [',', ' '],
        placeholder: 'Filter by Subject',
      });

      // set the input box to hold whats already in the state.
      $('#sel3')
        .val(this.state.subject)
        .trigger('paste');

      // remove the empty option
      $('#sel3')
        .find('option')
        .each((index, vertex) => {
          if (!dNc($(vertex).text())) {
            $(vertex).remove();
          }
        });

      $('#sel3').on('change', () => {
        let data = [];
        if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])){
          this.props.reduxState_fetchDataTransaction.default.payload[0].subject.forEach(element => {
            $('#sel3').val().forEach(value => {
            if (element.displayValue === value) data.push(element.optionID)
            })
          })
        }

        this.setStateWithValue('subject', data);
      });

      $('#sel4').select2({
        width: '100%',
        multiple: true,
        allowClear: true,
        tags: true,
        tokenSeparators: [',', ' '],
        placeholder: 'Filter by Degree',
      });

      // set the input box to hold whats already in the state.
      $('#sel4')
        .val(this.state.degreeLevel)
        .trigger('paste');

      // remove the empty option
      $('#sel4')
        .find('option')
        .each((index, vertex) => {
          if (!dNc($(vertex).text())) {
            $(vertex).remove();
          }
        });


      $('#sel4').on('change', () => {
                let data = [];
        if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])){
          this.props.reduxState_fetchDataTransaction.default.payload[0].degreeLevel.forEach(element => {
            $('#sel4').val().forEach(value => {
            if (element.displayValue === value) data.push(element.optionID)
            })
          })
        }

        this.setStateWithValue('degreeLevel', data);
      });

        $('#sel5').select2({
        width: '100%',
        multiple: false,
        allowClear: true,
        tags: true,
        placeholder: 'Filter by currency',
      });

      $('#sel5').on('change', () => {
        this.setStateWithValue('currency', $('#sel5').val());
      });

      // age slider
      let age = [18, 100];
      if (dNc(this.state.ageRange)) age = this.state.ageRange;
      $('#age-slider').slider({
        min: 18,
        max: 100,
        step: 1,
        value: [age[0], age[1]],
      });

      const executeFunction = debounce(() => {
        const value = $('#age-slider').val().split(',')
        const result = [+value[0], +value[1]]
        this.setStateWithValue('ageRange', result);
      }, 250);

      $('#age-slider').on('slideStop', executeFunction);


      // date slider
      let date = [1920, 2018];
      if (dNc(this.state.graduactionRange)) date = this.state.graduactionRange;

      $('#date-slider').slider({
        min: 1920,
        max: 2018,
        step: 1,
        value: [date[0], date[1]],
      });

      const executeFunction2 = debounce(() => {
        console.log('change 2');
        const value = $('#date-slider').val().split(',');
        const result = [+value[0], +value[1]]
        this.setStateWithValue('graduactionRange', result);
      }, 250);

      $('#date-slider').on('slideStop', executeFunction2);


      // salary slider
      let salary = [0, 1000000];
      if (dNc(this.state.salaryRange)) salary = this.state.salaryRange;

      $('#salary-slider').slider({
        min: 0,
        max: 1000000,
        step: 1,
        value: [salary[0], salary[1]],
      });

      const executeFunction3 = debounce(() => {
        console.log('change 3');
        const value = $('#salary-slider').val().split(',');
        const result = [+value[0], +value[1]];
        this.setStateWithValue('salaryRange', result);
      }, 250);

      $('#salary-slider').on('slideStop', executeFunction3);

      // setting state for gender, ethnicity, polar and stem.
      let gender = [];
      console.log(this.state)
      if (dNc(this.state.gender)) ({ gender } = this.state);

      if (gender.includes('male')) $('#gender-male').attr('checked', true);
      if (gender.includes('female')) $('#gender-female').attr('checked', true);
      if (gender.includes('other')) $('#gender-other').attr('checked', true);

      $('#gender-boxes')
      .find('input')
      .on('click', (e) => {
          let data = e.target.value;
          // setting the state with the option IDs
          if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
            this.props.reduxState_fetchDataTransaction.default.payload[0].gender.forEach(element => {
              if (element.displayValue === e.target.value) data = element.optionID
            })
          }

          if (gender.includes(data)) {
            const index = gender.indexOf(data);
            gender.splice(index, 1);
          } else {
            gender.push(data);
          }

          if (gender.length === 0) {
            this.setStateWithValue('gender', null);
          } else {
            this.setStateWithValue('gender', gender);
          }
        });


      let ethnicity = [];
      if (dNc(this.state.ethnicity)) ({ ethnicity } = this.state);

      if (ethnicity.includes('white')) $('#eth-1').attr('checked', true);
      if (ethnicity.includes('mixed')) $('#eth-2').attr('checked', true);
      if (ethnicity.includes('asian')) $('#eth-3').attr('checked', true);
      if (ethnicity.includes('black')) $('#eth-4').attr('checked', true);
      if (ethnicity.includes('other')) $('#eth-5').attr('checked', true);


      $('#ethnicity')
      .find('input')
      .on('click', (e) => {
          let data = e.target.value;

            if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
            this.props.reduxState_fetchDataTransaction.default.payload[0].ethnicity.forEach(element => {
              if (element.displayValue === e.target.value) data = element.optionID
            })
          }

          if (!ethnicity.includes(data)) {
            ethnicity.push(data);
          } else {
            const index = ethnicity.indexOf(data);
            ethnicity.splice(index, 1);
          }

          if (ethnicity.length === 0) {
            this.setStateWithValue('ethnicity', null);
          } else this.setStateWithValue('ethnicity', ethnicity);
        });


      $('#switches')
        .find('input')
        .on('change', (e) => {
          const data = e.target.value;

          if (this.state[data] === true) this.setStateWithValue(data, null);
          else this.setStateWithValue(data, true);
        });

      this.initSticky();

    });
  }

  setStateWithValue(id, value) {
    console.log('setting local state')
    
    let val = value;
    if (value === null || value.length === 0) val = null;

    // console.log(id, value);
    this.setState({
      [id]: val,
    });
  }

  handleSubmit() {
    console.log('setting global state')

    this.props.reduxAction_doUpdate('filterData', {
      countryOfBirth: this.state.countryOfBirth,
      currentCountry: this.state.currentCountry,
      gender: this.state.gender,
      ethnicity: this.state.ethnicity,
      ageRange: this.state.ageRange,
      graduactionRange: this.state.graduactionRange,
      salaryRange: this.state.salaryRange,
      subject: this.state.subject,
      degreeLevel: this.state.degreeLevel,
      stem: this.state.stem,
      polar: this.state.polar,
      currency: this.state.currency,
    });
  }


  initSticky() {
    initialiseNonMobileSticky(this.parentContainer, {});
  }

  render() {
    let polarChecked = false;
    let stemChecked = false;
    if (this.state.polar === true) polarChecked = true;
    if (this.state.stem === true) stemChecked = true;
    let data = { ethnicity: [], countryOfBirth: [], currentCountry: [], gender: [], degreeLevel: [], subject: [] }

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach(key => {
        data[key] = this.props.reduxState_fetchDataTransaction.default.payload[0][key];
      })
    }

    return (
      <div className="row" ref={(div) => { this.parentContainer = div; }}>
        <div className="col-sm-8 col-sm-push-2">
          <div className="panel panel-sliips-purple sticky-effects">
            <div className="panel-heading">
              <div className="panel-control">
                <button className="btn btn-default" data-panel="minmax"><i className="far fa-chevron-up" /></button>
              </div>
              <h3 className="panel-title"> Filters </h3>
            </div>
            <div className="collapse">
              <div className="panel-body">

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="sel1">Domicile When Applying:</label>
                      <select className="form-control" name="sel1" id="sel1">
                        <option />
                        {data.countryOfBirth.map(element => (
                        <option>{element.displayValue}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="sel2">Domicile Now:</label>
                      <select className="form-control" name="sel2" id="sel2">
                        <option />
                        {data.currentCountry.map(element => (
                          <option>{element.displayValue}</option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <label className="col-sm-2 control-label">Gender</label>
                    <div className="col-sm-10" id="gender-boxes">
                    {data.gender.map(element => (
                      <div>
                      <input id={"gender-" + element.displayValue} className="magic-checkbox" type="checkbox" value={element.displayValue} />
                      <label htmlFor={"gender-" + element.displayValue}>{element.displayValue}</label>
                      </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row" id="ethnicity">
                    <label className="col-sm-2 control-label">Ethnicity</label>
                    <div className="col-sm-10">
                    {data.ethnicity.map((element, i) => (
                        <div className="checkbox">
                        <input id={"eth-" + i} className="magic-checkbox" type="checkbox" value={element.displayValue} />
                        <label htmlFor={"eth-" + i}>{element.displayValue}</label>
                      </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pad-ver">
                  <div className="row">
                    <div className="col-sm-3">
                    Age Range
                    </div>
                    <div className="col-sm-9">
                      <input
                        style={{ width: '100%' }}
                        type="text"
                        value=""
                        id="age-slider"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                    Graduation Date Range
                    </div>
                    <div className="col-sm-9">
                      <input
                        style={{ width: '100%' }}
                        type="text"
                        value=""
                        id="date-slider"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                    Salary Range
                    </div>
                    <div className="col-sm-9">
                      <input
                        style={{ width: '100%' }}
                        type="text"
                        value=""
                        id="salary-slider"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="sel3">Subjects:</label>
                      <select className="form-control" name="sel3" id="sel3">
                        <option />
                        {data.subject.map(element => (
                            <option>{element.displayValue}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="sel4">Degree Type:</label>
                      <select className="form-control" name="sel4" id="sel4">
                        <option />
                        {data.degreeLevel.map(element => (
                        <option>{element.displayValue}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row justify-content-between">
                    <div className="col-md-6">
                      <p className="text-main text-bold">Other Options</p>
                      <div className="col-sm-10 col-sm-push-1" id="switches">
                        <div className="col-sm-8">
                          <label htmlFor="stem-1">STEM subjects only</label>
                        </div>
                        <div className="col-sm-4">
                          <input id="demo-sw-unchecked1" type="checkbox" value="stem" checked={stemChecked} />
                        </div>
                        <div className="col-sm-8">
                          <label htmlFor="polar-2">POLAR areas only</label>
                        </div>
                        <div className="col-sm-4">
                          <input id="demo-sw-unchecked2" type="checkbox" value="polar" checked={polarChecked} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6" style={{ paddingTop: '20px' }}>
                      <div className="col-sm-8">
                        <label htmlFor="sel5">Currency:</label>
                      </div>
                      <div className="col-sm-12">
                        <select data-placeholder="Filter by currency" className="form-control" id="sel5" name="sel5" style={{ width: '100%', height: '30px' }}>
                          <option />
                          <option value="GDP">UK £</option>
                          {currencyData.map(element => (
                            <option value={element.currency}>{element.country + ' ' + element.symbol}</option>
                        ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="panel-control" style={{ width: '100%' }}>
                    <button className="btn btn-primary" data-panel="minmax" onClick={e => this.handleSubmit(e)} style={{ width: '100%' }}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <FetchData
            active
            fetchURL="/api/filters/getFilters"
          />
      </div>
    );
  }
}

Graph.propTypes = {
  reduxAction_doUpdate: PropTypes.func,
  filterData: PropTypes.object,
  reduxState_fetchDataTransaction: PropTypes.object,
};

Graph.defaultProps = {
  reduxAction_doUpdate: () => {},
  reduxState_fetchDataTransaction: { default: {} },
  filterData: {},
};

const mapStateToProps = state => ({
  reduxState_fetchDataTransaction: state.dataTransactions[dataStoreID],
  filterData: state.dataStoreSingle.filterData,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

