
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
      stem: false,
      polar: false,
      currency: ['options/42960339872'],
    });
  }

  componentDidMount() {
    this.checkBoxesInFilterData();
    this.setStateWithFilterData();

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');

      // Select2 input boxes.
      this.handleSelectBox('countryOfBirth', 'Filter by Country');
      this.handleSelectBox('currentCountry', 'Filter by Country');
      this.handleSelectBox('subject', 'Filter by Subject');
      this.handleSelectBox('degreeLevel', 'Filter by Degree');
      // Sliders.
      this.handleSliders('ageRange');
      this.handleSliders('graduationRange');
      this.handleSliders('salaryRange');
      // Dropdown select2.
      this.handleCurrency('currency');

      this.initSticky();
    });
  }

  componentDidUpdate() {
    this.checkBoxesInFilterData();
  }

  setStateWithValue(id, value) {
    // Setting the local state with the data, to set global state later.
    let val = value;
    if (value === null || value.length === 0) val = null;

    this.setState({
      [id]: val,
    });
  }

  setStateWithFilterData() {
    Object.keys(this.props.filterData).forEach((key) => {
      this.setState({
        [key]: this.props.filterData[key],
      });
    });
  }

  initSticky() {
    initialiseNonMobileSticky(this.parentContainer, {});
  }

  // If the id is in filter data, then the checkbox will display checked.
  checkBoxesInFilterData() {
    Object.keys(this.props.filterData).forEach((key) => {
      if ((key === 'ethnicity' || key === 'gender') && dNc(this.props.filterData[key])) {
        this.props.filterData[key].forEach((element) => {
          $(this[element]).attr('checked', true);
        });
      } else if (key === 'stem' || key === 'polar') {
        $(this[key]).attr('checked', this.props.filterData[key]);
      }
    });
  }

  handleSelectBox(value, placeholder) {
    let reference = null;
    if (value === 'countryOfBirth') reference = this.countryOfBirth;
    if (value === 'currentCountry') reference = this.currentCountry;
    if (value === 'subject') reference = this.subject;
    if (value === 'degreeLevel') reference = this.degreeLevel;

    // The input box settings.
    $(reference).select2({
      width: '100%',
      multiple: true,
      allowClear: true,
      tags: true,
      tokenSeparators: [',', ' '],
      placeholder,
    });

    // The placeholder, setting it to have whats in state pre selected.
    const optionIDNames = [];
    if (dNc(this.props.filterData) && dNc(this.props.filterData[value])) {
      this.props.filterData[value].forEach((option) => {
        this.props.reduxState_fetchDataTransaction.default.payload[0][value].forEach((element) => {
          if (element.optionID === option) optionIDNames.push(element.displayValue);
        });
      });
    }
    $(reference)
      .val(optionIDNames)
      .trigger('paste');

    // Removing the empty option
    $(reference)
      .find('option')
      .each((index, vertex) => {
        if (!dNc($(vertex).text())) {
          $(vertex).remove();
        }
      });

    // Finding the optionID for the data submitted, and setting the local state with them.
    $(reference).on('change', () => {
      const data = [];
      if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
        this.props.reduxState_fetchDataTransaction.default.payload[0][value].forEach((element) => {
          $(reference).val().forEach((elem) => {
            if (element.displayValue === elem) data.push(element.optionID);
          });
        });
      }
      this.setStateWithValue(value, data);
    });
  }

  handleSliders(value) {
    let reference = null;
    let data = null;
    let min = 0;
    let max = 0;

    if (value === 'ageRange') {
      reference = this.ageRange;
      min = 18;
      max = 100;
      data = [18, 100];
    } else if (value === 'graduationRange') {
      reference = this.graduationRange;
      min = 1920;
      max = 2018;
      data = [1920, 2018];
    } else if (value === 'salaryRange') {
      reference = this.salaryRange;
      max = 1000000;
      data = [0, 1000000];
    }

    // if the data has been set before, use this as the new data, so that the slider will be pre-set to these values, before changed.
    if (dNc(this.state[value])) data = Object.values(Object.assign({}, this.state[value]));
    // setting the slider values.
    $(reference).slider({
      min,
      max,
      step: 1,
      value: [data[0], data[1]],
    });
    const executeFunction = debounce(() => {
      const valueData = $(reference).val().split(',');
      const result = [+valueData[0], +valueData[1]];
      // setting the state with the new values inputted.
      this.setStateWithValue(value, result);
    }, 250);

    $(reference).on('slideStop', executeFunction);
  }

  handleCurrency() {
    let currencyName = { id: 1, text: "GBP - Pound Sterling (£)'" };

    // set the placeholder to be whats selected in state
    if (dNc(this.props.filterData) && dNc(this.props.filterData.currency)) {
      this.props.filterData.currency.forEach((option) => {
        this.props.reduxState_fetchDataTransaction.default.payload[0].currency.forEach((element) => {
          if (element.optionID === option) currencyName = { id: option, text: element.displayValue };
        });
      });
    }
    // setting up the select 2.
    $(this.currency).select2({
      width: '100%',
      multiple: false,
      allowClear: true,
      tags: true,
      placeholder: currencyName,
      // dropdownCssClass: "increasedzindexclass",
    });

    $(this.currency).on('change', () => {
      let data = [$(this.currency).val()];
      if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
        this.props.reduxState_fetchDataTransaction.default.payload[0].currency.forEach((element) => {
          if (element.displayValue === $(this.currency).val()) data = [element.optionID];
        });
      }
      this.setStateWithValue('currency', data);
    });
  }

  handleSubmit() {
    // Setting global state with the save button.
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


  handleCheckboxes(value, id) {
    let dataArr = [];
    if (dNc(this.state[value])) {
      const data = Object.assign({}, this.state[value]);
      dataArr = Object.values(data);
    }

    if (dataArr.includes(id)) {
      // if it's already in filter data, remove it from dataArr.
      dataArr.splice(dataArr.indexOf(id), 1);
    } else {
      // else add it to dataArr.
      dataArr.push(id);
    }
    // making sure an empty array doesn't go into the state - this helps the refresh thing.
    if (dataArr.length === 0) dataArr = null;

    // Set the state with the new dataArr.
    // However if the state is currently an array and it gets replaced by another array it doesn't refresh the page.
    this.setStateWithValue(value, dataArr);
  }

  handleOther(value) {
    this.setState(prevState => ({
      [value]: !prevState[value],
    }));
  }


  render() {
    const data = {
      ethnicity: [], countryOfBirth: [], currentCountry: [], gender: [], degreeLevel: [], subject: [], currency: [],
    };

    // Pulling out the fetch data to use in the html.
    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        data[key] = this.props.reduxState_fetchDataTransaction.default.payload[0][key];
      });
    }

    // Sets the first currency option to be the one in the state, GBP as default
    let currencyName = 'GBP - Pound Sterling (£)';
    if (dNc(this.props.filterData) && dNc(this.props.filterData.currency)) {
      this.props.filterData.currency.forEach((option) => {
        this.props.reduxState_fetchDataTransaction.default.payload[0].currency.forEach((element) => {
          if (element.optionID === option) currencyName = element.displayValue;
        });
      });
    }

    return (
      <div className="row">
        <div className="col-sm-8 col-sm-push-2">

          <div className="panel panel-sliips-purple">

            <div className="panel-heading">
              <div className="panel-control">
                <button className="btn btn-default" data-panel="minmax"><i className="far fa-chevron-up" /></button>
              </div>
              <h3 className="panel-title">Filters</h3>
            </div>

            <div className="collapse">
              <div className="panel-body">

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="countryOfBirth">Country When Applying:</label>
                      <select className="form-control" name="countryOfBirth" id="countryOfBirth" ref={(div) => { this.countryOfBirth = div; }}>
                        <option />
                        {data.countryOfBirth.map(element => (
                          <option key={element.optionID}>{element.displayValue}</option>
                           ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="currentCountry">Country Currently Living In:</label>
                      <select className="form-control" name="currentCountry" id="currentCountry" ref={(div) => { this.currentCountry = div; }}>
                        <option />
                        {data.currentCountry.map(element => (
                          <option key={element.optionID}>{element.displayValue}</option>
                           ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <div className="col-sm-2">
                        <label className="control-label">Gender</label>
                      </div>
                      <div className="col-sm-10" ref={(div) => { this.gender = div; }}>
                        {data.gender.map(elem => (
                          <div key={elem.optionID}>
                            <input onClick={() => this.handleCheckboxes('gender', elem.optionID)} id={elem.optionID} value={elem.optionID} ref={(div) => { this[elem.optionID] = div; }} className="magic-checkbox" type="checkbox" />
                            <label htmlFor={elem.optionID}>{elem.displayValue}</label>
                          </div>
                                  ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <div className="col-sm-2">
                        <label className="control-label">Ethnicity</label>
                      </div>
                      <div className="col-sm-10" ref={(div) => { this.ethnicity = div; }}>
                        {data.ethnicity.map(elem => (
                          <div key={elem.optionID}>
                            <input onClick={() => this.handleCheckboxes('ethnicity', elem.optionID)} id={elem.optionID} value={elem.optionID} ref={(div) => { this[elem.optionID] = div; }} className="magic-checkbox" type="checkbox" />
                            <label htmlFor={elem.optionID}>{elem.displayValue}</label>
                          </div>
                               ))}
                      </div>
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
                        ref={(div) => { this.ageRange = div; }}
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
                        ref={(div) => { this.graduationRange = div; }}
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
                        ref={(div) => { this.salaryRange = div; }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select className="form-control" name="subject" id="subject" ref={(div) => { this.subject = div; }}>
                        <option />
                        {data.subject.map(element => (
                          <option key={element.optionID}>{element.displayValue}</option>
                            ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="degreeLevel">Degree</label>
                      <select className="form-control" name="degreeLevel" id="degreeLevel" ref={(div) => { this.degreeLevel = div; }}>
                        <option />
                        {data.degreeLevel.map(element => (
                          <option key={element.optionID}>{element.displayValue}</option>
                            ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group">

                    <div className="row">
                      <div className="col-2">
                        <label className="control-label">Other</label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="col-6">
                          <input id="polar" className="magic-checkbox" type="checkbox" ref={(div) => { this.polar = div; }} onClick={() => this.handleOther('polar')} />
                          <label htmlFor="polar">POLAR</label>
                        </div>
                        <div className="col-6">
                          <input id="stem" className="magic-checkbox" ref={(div) => { this.stem = div; }} type="checkbox" onClick={() => this.handleOther('stem')} />
                          <label htmlFor="stem">STEM</label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="currency">Currency</label>
                        <select className="form-control" id="currency" ref={(div) => { this.currency = div; }}>
                          <option hidden>{currencyName}</option>
                          {data.currency.map(element => (
                            <option key={element.optionID}>{element.displayValue}</option>
                             ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <button className="btn btn-primary" data-panel="minmax" onClick={e => this.handleSubmit(e)} style={{ width: '100%' }}>Save</button>
                </div>

              </div>
            </div>

          </div>
        </div>
        <FetchData
          active
          fetchURL="api/filters/getFilters"
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
