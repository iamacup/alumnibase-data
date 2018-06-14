
/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dNc, debounce, initialiseNonMobileSticky } from '../../../../content/scripts/custom/utilities';

import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';

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
      graduationRange: null,
      salaryRange: null,
      subject: null,
      degreeLevel: null,
      stem: null,
      polar: null,
      currency: ['options/42960339872'], // id for GBP, so that it's set as default.
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
      const countriesOfBirthNames = [];
      if (dNc(this.props.filterData) && dNc(this.props.filterData.countryOfBirth)) {
        this.props.filterData.countryOfBirth.forEach((option) => {
          this.props.reduxState_fetchDataTransaction.default.payload[0].countryOfBirth.forEach((element) => {
            if (element.optionID === option) countriesOfBirthNames.push(element.displayValue);
          });
        });
      }
      $('#sel1')
        .val(countriesOfBirthNames)
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
        const data = [];
        if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
          this.props.reduxState_fetchDataTransaction.default.payload[0].countryOfBirth.forEach((element) => {
            $('#sel1').val().forEach((value) => {
              if (element.displayValue === value) data.push(element.optionID);
            });
          });
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
      const currentCountriesNamesArr = [];
      if (dNc(this.props.filterData) && dNc(this.props.filterData.currentCountry)) {
        this.props.filterData.currentCountry.forEach((option) => {
          this.props.reduxState_fetchDataTransaction.default.payload[0].currentCountry.forEach((element) => {
            if (element.optionID === option) currentCountriesNamesArr.push(element.displayValue);
          });
        });
      }

      $('#sel2')
        .val(currentCountriesNamesArr)
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
        const data = [];
        if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
          this.props.reduxState_fetchDataTransaction.default.payload[0].currentCountry.forEach((element) => {
            $('#sel2').val().forEach((value) => {
              if (element.displayValue === value) data.push(element.optionID);
            });
          });
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
      const subjectNames = [];
      if (dNc(this.props.filterData) && dNc(this.props.filterData.subject)) {
        this.props.filterData.subject.forEach((option) => {
          this.props.reduxState_fetchDataTransaction.default.payload[0].subject.forEach((element) => {
            if (element.optionID === option) subjectNames.push(element.displayValue);
          });
        });
      }

      $('#sel3')
        .val(subjectNames)
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
        const data = [];
        if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
          this.props.reduxState_fetchDataTransaction.default.payload[0].subject.forEach((element) => {
            $('#sel3').val().forEach((value) => {
              if (element.displayValue === value) data.push(element.optionID);
            });
          });
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
      const degreeNames = [];
      if (dNc(this.props.filterData) && dNc(this.props.filterData.degreeLevel)) {
        this.props.filterData.degreeLevel.forEach((option) => {
          this.props.reduxState_fetchDataTransaction.default.payload[0].degreeLevel.forEach((element) => {
            if (element.optionID === option) degreeNames.push(element.displayValue);
          });
        });
      }

      $('#sel4')
        .val(degreeNames)
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
        const data = [];
        if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
          this.props.reduxState_fetchDataTransaction.default.payload[0].degreeLevel.forEach((element) => {
            $('#sel4').val().forEach((value) => {
              if (element.displayValue === value) data.push(element.optionID);
            });
          });
        }

        this.setStateWithValue('degreeLevel', data);
      });


      // set the placeholder to be whats selected in state
      let currencyName = { id: 1, text: "Filter by currency'" };
      if (dNc(this.props.filterData) && dNc(this.props.filterData.currency)) {
        this.props.filterData.currency.forEach((option) => {
          this.props.reduxState_fetchDataTransaction.default.payload[0].currency.forEach((element) => {
            if (element.optionID === option) currencyName = { id: option, text: element.displayValue };
          });
        });
      }


      $('#sel5').select2({
        width: '100%',
        multiple: false,
        allowClear: true,
        tags: true,
        placeholder: currencyName,
        // dropdownCssClass:
        // dropdownCssClass: "increasedzindexclass",
        // containerCssClass: "increasedzindexclass",
      });


      $('#sel5').on('change', () => {
        let data = [$('#sel5').val()];
        if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
          this.props.reduxState_fetchDataTransaction.default.payload[0].currency.forEach((element) => {
            if (element.displayValue === $('#sel5').val()) data = [element.optionID];
          });
        }
        this.setStateWithValue('currency', data);
      });


      // age slider
      let age = [18, 100];
      if (dNc(this.state.ageRange)) age = this.state.ageRange;
      $('#age-slider').slider({
        min: 18,
        max: 100,
        step: 1,
        // containerCssClass: "increasedzindexclass",
        // dropdownCssClass: "increasedzindexclass",
        value: [age[0], age[1]],
      });

      const executeFunction = debounce(() => {
        const value = $('#age-slider').val().split(',');
        const result = [+value[0], +value[1]];
        this.setStateWithValue('ageRange', result);
      }, 250);

      $('#age-slider').on('slideStop', executeFunction);


      // date slider
      let date = [1920, 2018];
      if (dNc(this.state.graduationRange)) date = this.state.graduationRange;

      $('#date-slider').slider({
        min: 1920,
        max: 2018,
        step: 1,
        value: [date[0], date[1]],
      });

      const executeFunction2 = debounce(() => {
        console.log('change 2');
        const value = $('#date-slider').val().split(',');
        const result = [+value[0], +value[1]];
        this.setStateWithValue('graduationRange', result);
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
      let genderArr = [];
      if (dNc(this.state.gender)) (genderArr = this.state.gender);

      if (dNc(this.props.filterData) && dNc(this.props.filterData.gender)) {
        if (this.props.filterData.gender.includes('options/42960330044')) $('#gender-Male').attr('checked', true);
        if (this.props.filterData.gender.includes('options/42960330043')) $('#gender-Female').attr('checked', true);
        if (this.props.filterData.gender.includes('options/42960330045')) $('#gender-Other').attr('checked', true);
      }

      $('#gender-boxes')
        .find('input')
        .on('click', (e) => {
          let data = e.target.value;
          // setting the state with the option IDs
          if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
            this.props.reduxState_fetchDataTransaction.default.payload[0].gender.forEach((element) => {
              if (element.displayValue === e.target.value) data = element.optionID;
            });
          }

          if (genderArr.includes(data)) {
            const index = genderArr.indexOf(data);
            genderArr.splice(index, 1);
          } else {
            genderArr.push(data);
          }

          if (genderArr.length === 0) {
            this.setStateWithValue('gender', null);
          } else {
            this.setStateWithValue('gender', genderArr);
          }
        });


      let ethnicityArr = [];
      if (dNc(this.state.ethnicity)) (ethnicityArr = this.state.ethnicity);

      if (dNc(this.props.filterData) && dNc(this.props.filterData.ethnicity)) {
        if (this.props.filterData.ethnicity.includes('options/42960331731')) $('#42960331731').attr('checked', true); // white
        if (this.props.filterData.ethnicity.includes('options/42960331732')) $('#42960331732').attr('checked', true); // mixed
        if (this.props.filterData.ethnicity.includes('options/42960331733')) $('#42960331733').attr('checked', true); // asian
        if (this.props.filterData.ethnicity.includes('options/42960331734')) $('#42960331734').attr('checked', true); // black
        if (this.props.filterData.ethnicity.includes('options/42960331735')) $('#42960331735').attr('checked', true); // other
        if (this.props.filterData.ethnicity.includes('options/42960331730')) $('#42960331730').attr('checked', true); // do not want to disclose
      }

      $('#ethnicity')
        .find('input')
        .on('click', (e) => {
          let data = e.target.value;

          if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
            this.props.reduxState_fetchDataTransaction.default.payload[0].ethnicity.forEach((element) => {
              if (element.displayValue === e.target.value) data = element.optionID;
            });
          }

          if (!ethnicityArr.includes(data)) {
            ethnicityArr.push(data);
          } else {
            const index = ethnicityArr.indexOf(data);
            ethnicityArr.splice(index, 1);
          }

          if (ethnicityArr.length === 0) {
            this.setStateWithValue('ethnicity', null);
          } else this.setStateWithValue('ethnicity', ethnicityArr);
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
    let val = value;
    if (value === null || value.length === 0) val = null;

    this.setState({
      [id]: val,
    });
  }

  handleSubmit() {
    this.props.reduxAction_doUpdate('filterData', {
      countryOfBirth: this.state.countryOfBirth,
      currentCountry: this.state.currentCountry,
      gender: this.state.gender,
      ethnicity: this.state.ethnicity,
      ageRange: this.state.ageRange,
      graduationRange: this.state.graduationRange,
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
    const data = {
      ethnicity: [], countryOfBirth: [], currentCountry: [], gender: [], degreeLevel: [], subject: [], currency: [],
    };

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        data[key] = this.props.reduxState_fetchDataTransaction.default.payload[0][key];
      });
    }

    let currencyName = 'GBP - Pound Sterling (£)';
    if (dNc(this.props.filterData) && dNc(this.props.filterData.currency)) {
      this.props.filterData.currency.forEach((option) => {
        this.props.reduxState_fetchDataTransaction.default.payload[0].currency.forEach((element) => {
          if (element.optionID === option) currencyName = element.displayValue;
        });
      });
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
                          <input id={'gender-' + element.displayValue} className="magic-checkbox" type="checkbox" value={element.displayValue} />
                          <label htmlFor={'gender-' + element.displayValue}>{element.displayValue}</label>
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
                          <input id={element.optionID.slice(8)} className="magic-checkbox" type="checkbox" value={element.displayValue} />
                          <label htmlFor={element.optionID.slice(8)}>{element.displayValue}</label>
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
                          <option id={element.optionID.slice(8)}>{element.displayValue}</option>
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
                          <option hidden>{currencyName}</option>
                          {data.currency.map(element => (
                            <option value={element.optionID}>{element.displayValue}</option>
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

