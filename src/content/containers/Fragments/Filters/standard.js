
/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import { connect } from 'react-redux';

import { dNc, debounce, initialiseNonMobileSticky } from '../../../../content/scripts/custom/utilities';

class Graph extends React.PureComponent {
  componentDidMount() {
    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
      // make the checkbox look nice with switchery
      const elem = document.querySelector('#demo-sw-unchecked1');
      // eslint-disable-next-line no-undef, no-unused-vars
      const init = new Switchery(elem);
      elem.onchange = () => {
        // this.clickShowNationalAverage();
      };
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
      // make the checkbox look nice with switchery
      const elem2 = document.querySelector('#demo-sw-unchecked2');
      // eslint-disable-next-line no-undef, no-unused-vars
      const init2 = new Switchery(elem2);
      elem2.onchange = () => {
        // this.clickShowNationalAverage();
      };

      $('#sel1').select2({
        width: '100%',
        multiple: true,
        allowClear: true,
        tags: true,
        tokenSeparators: [',', ' '],
        placeholder: 'Using all locations...',
      });

      // remove the empty option
      $('#sel1')
        .find('option')
        .each((index, vertex) => {
          if (!dNc($(vertex).text())) {
            $(vertex).remove();
          }
        });

      $('#sel2').select2({
        width: '100%',
        multiple: true,
        allowClear: true,
        tags: true,
        tokenSeparators: [',', ' '],
        placeholder: 'Using all locations',
      });

      // remove the empty option
      $('#sel2')
        .find('option')
        .each((index, vertex) => {
          if (!dNc($(vertex).text())) {
            $(vertex).remove();
          }
        });

      $('#sel3').select2({
        width: '100%',
        multiple: true,
        allowClear: true,
        tags: true,
        tokenSeparators: [',', ' '],
        placeholder: 'Filter by Subject',
      });

      // remove the empty option
      $('#sel3')
        .find('option')
        .each((index, vertex) => {
          if (!dNc($(vertex).text())) {
            $(vertex).remove();
          }
        });

      $('#sel4').select2({
        width: '100%',
        multiple: true,
        allowClear: true,
        tags: true,
        tokenSeparators: [',', ' '],
        placeholder: 'Filter by Subject',
      });

      // remove the empty option
      $('#sel4')
        .find('option')
        .each((index, vertex) => {
          if (!dNc($(vertex).text())) {
            $(vertex).remove();
          }
        });

      // age slider
      $('#age-slider').slider({
        min: 18,
        max: 85,
        step: 1,
        value: [
          18,
          85,
        ],
      });

      const executeFunction = debounce(() => {
        console.log('change 1');
      }, 250);

      $('#age-slider').on('slideStop', executeFunction);

      // age slider
      $('#date-slider').slider({
        min: 1920,
        max: 2018,
        step: 1,
        value: [
          1920,
          2018,
        ],
      });

      const executeFunction2 = debounce(() => {
        console.log('change 2');
      }, 250);

      $('#date-slider').on('slideStop', executeFunction2);


      // salary slider
      $('#salary-slider').slider({
        min: 0,
        max: 1000000,
        step: 1,
        value: [
          0,
          1000000,
        ],
      });

      const executeFunction3 = debounce(() => {
        console.log('change 3');
      }, 250);

      $('#salary-slider').on('slideStop', executeFunction3);

      this.initSticky();
    });
  }

  initSticky() {
    initialiseNonMobileSticky(this.parentContainer, {});
  }

  render() {
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
                        <option>United Kingdom of Great Britain and Northern Ireland (the)</option>
                        <option>Afghanistan</option>
                        <option>Åland Islands</option>
                        <option>Albania</option>
                        <option>Algeria</option>
                        <option>American Samoa</option>
                        <option>Andorra</option>
                        <option>Angola</option>
                        <option>Anguilla</option>
                        <option>Antarctica</option>
                        <option>Antigua and Barbuda</option>
                        <option>Argentina</option>
                        <option>Armenia</option>
                        <option>Aruba</option>
                        <option>Australia</option>
                        <option>Austria</option>
                        <option>Azerbaijan</option>
                        <option>Bahamas (the)</option>
                        <option>Bahrain</option>
                        <option>Bangladesh</option>
                        <option>Barbados</option>
                        <option>Belarus</option>
                        <option>Belgium</option>
                        <option>Belize</option>
                        <option>Benin</option>
                        <option>Bermuda</option>
                        <option>Bhutan</option>
                        <option>Bolivia (Plurinational State of)</option>
                        <option>Bonaire, Sint Eustatius and Saba</option>
                        <option>Bosnia and Herzegovina</option>
                        <option>Botswana</option>
                        <option>Bouvet Island</option>
                        <option>Brazil</option>
                        <option>British Indian Ocean Territory (the)</option>
                        <option>Brunei Darussalam</option>
                        <option>Bulgaria</option>
                        <option>Burkina Faso</option>
                        <option>Burundi</option>
                        <option>Cabo Verde</option>
                        <option>Cambodia</option>
                        <option>Cameroon</option>
                        <option>Canada</option>
                        <option>Cayman Islands (the)</option>
                        <option>Central African Republic (the)</option>
                        <option>Chad</option>
                        <option>Chile</option>
                        <option>China</option>
                        <option>Christmas Island</option>
                        <option>Cocos (Keeling) Islands (the)</option>
                        <option>Colombia</option>
                        <option>Comoros (the)</option>
                        <option>Congo (the Democratic Republic of the)</option>
                        <option>Congo (the)</option>
                        <option>Cook Islands (the)</option>
                        <option>Costa Rica</option>
                        <option>Côte d'Ivoire</option>
                        <option>Croatia</option>
                        <option>Cuba</option>
                        <option>Curaçao</option>
                        <option>Cyprus</option>
                        <option>Czechia</option>
                        <option>Denmark</option>
                        <option>Djibouti</option>
                        <option>Dominica</option>
                        <option>Dominican Republic (the)</option>
                        <option>Ecuador</option>
                        <option>Egypt</option>
                        <option>El Salvador</option>
                        <option>Equatorial Guinea</option>
                        <option>Eritrea</option>
                        <option>Estonia</option>
                        <option>Ethiopia</option>
                        <option>Falkland Islands (the) [Malvinas]</option>
                        <option>Faroe Islands (the)</option>
                        <option>Fiji</option>
                        <option>Finland</option>
                        <option>France</option>
                        <option>French Guiana</option>
                        <option>French Polynesia</option>
                        <option>French Southern Territories (the)</option>
                        <option>Gabon</option>
                        <option>Gambia (the)</option>
                        <option>Georgia</option>
                        <option>Germany</option>
                        <option>Ghana</option>
                        <option>Gibraltar</option>
                        <option>Greece</option>
                        <option>Greenland</option>
                        <option>Grenada</option>
                        <option>Guadeloupe</option>
                        <option>Guam</option>
                        <option>Guatemala</option>
                        <option>Guernsey</option>
                        <option>Guinea</option>
                        <option>Guinea-Bissau</option>
                        <option>Guyana</option>
                        <option>Haiti</option>
                        <option>Heard Island and McDonald Islands</option>
                        <option>Holy See (the)</option>
                        <option>Honduras</option>
                        <option>Hong Kong</option>
                        <option>Hungary</option>
                        <option>Iceland</option>
                        <option>India</option>
                        <option>Indonesia</option>
                        <option>Iran (Islamic Republic of)</option>
                        <option>Iraq</option>
                        <option>Ireland</option>
                        <option>Isle of Man</option>
                        <option>Israel</option>
                        <option>Italy</option>
                        <option>Jamaica</option>
                        <option>Japan</option>
                        <option>Jersey</option>
                        <option>Jordan</option>
                        <option>Kazakhstan</option>
                        <option>Kenya</option>
                        <option>Kiribati</option>
                        <option>Korea (the Democratic People's Republic of)</option>
                        <option>Korea (the Republic of)</option>
                        <option>Kuwait</option>
                        <option>Kyrgyzstan</option>
                        <option>Lao People's Democratic Republic (the)</option>
                        <option>Latvia</option>
                        <option>Lebanon</option>
                        <option>Lesotho</option>
                        <option>Liberia</option>
                        <option>Libya</option>
                        <option>Liechtenstein</option>
                        <option>Lithuania</option>
                        <option>Luxembourg</option>
                        <option>Macao</option>
                        <option>Macedonia (the former Yugoslav Republic of)</option>
                        <option>Madagascar</option>
                        <option>Malawi</option>
                        <option>Malaysia</option>
                        <option>Maldives</option>
                        <option>Mali</option>
                        <option>Malta</option>
                        <option>Marshall Islands (the)</option>
                        <option>Martinique</option>
                        <option>Mauritania</option>
                        <option>Mauritius</option>
                        <option>Mayotte</option>
                        <option>Mexico</option>
                        <option>Micronesia (Federated States of)</option>
                        <option>Moldova (the Republic of)</option>
                        <option>Monaco</option>
                        <option>Mongolia</option>
                        <option>Montenegro</option>
                        <option>Montserrat</option>
                        <option>Morocco</option>
                        <option>Mozambique</option>
                        <option>Myanmar</option>
                        <option>Namibia</option>
                        <option>Nauru</option>
                        <option>Nepal</option>
                        <option>Netherlands (the)</option>
                        <option>New Caledonia</option>
                        <option>New Zealand</option>
                        <option>Nicaragua</option>
                        <option>Niger (the)</option>
                        <option>Nigeria</option>
                        <option>Niue</option>
                        <option>Norfolk Island</option>
                        <option>Northern Mariana Islands (the)</option>
                        <option>Norway</option>
                        <option>Oman</option>
                        <option>Pakistan</option>
                        <option>Palau</option>
                        <option>Palestine, State of</option>
                        <option>Panama</option>
                        <option>Papua New Guinea</option>
                        <option>Paraguay</option>
                        <option>Peru</option>
                        <option>Philippines (the)</option>
                        <option>Pitcairn</option>
                        <option>Poland</option>
                        <option>Portugal</option>
                        <option>Puerto Rico</option>
                        <option>Qatar</option>
                        <option>Réunion</option>
                        <option>Romania</option>
                        <option>Russian Federation (the)</option>
                        <option>Rwanda</option>
                        <option>Saint Barthélemy</option>
                        <option>Saint Helena, Ascension and Tristan da Cunha</option>
                        <option>Saint Kitts and Nevis</option>
                        <option>Saint Lucia</option>
                        <option>Saint Martin (French part)</option>
                        <option>Saint Pierre and Miquelon</option>
                        <option>Saint Vincent and the Grenadines</option>
                        <option>Samoa</option>
                        <option>San Marino</option>
                        <option>Sao Tome and Principe</option>
                        <option>Saudi Arabia</option>
                        <option>Senegal</option>
                        <option>Serbia</option>
                        <option>Seychelles</option>
                        <option>Sierra Leone</option>
                        <option>Singapore</option>
                        <option>Sint Maarten (Dutch part)</option>
                        <option>Slovakia</option>
                        <option>Slovenia</option>
                        <option>Solomon Islands</option>
                        <option>Somalia</option>
                        <option>South Africa</option>
                        <option>South Georgia and the South Sandwich Islands</option>
                        <option>South Sudan</option>
                        <option>Spain</option>
                        <option>Sri Lanka</option>
                        <option>Sudan (the)</option>
                        <option>Suriname</option>
                        <option>Svalbard and Jan Mayen</option>
                        <option>Swaziland</option>
                        <option>Sweden</option>
                        <option>Switzerland</option>
                        <option>Syrian Arab Republic</option>
                        <option>Taiwan (Province of China)</option>
                        <option>Tajikistan</option>
                        <option>Tanzania, United Republic of</option>
                        <option>Thailand</option>
                        <option>Timor-Leste</option>
                        <option>Togo</option>
                        <option>Tokelau</option>
                        <option>Tonga</option>
                        <option>Trinidad and Tobago</option>
                        <option>Tunisia</option>
                        <option>Turkey</option>
                        <option>Turkmenistan</option>
                        <option>Turks and Caicos Islands (the)</option>
                        <option>Tuvalu</option>
                        <option>Uganda</option>
                        <option>Ukraine</option>
                        <option>United Arab Emirates (the)</option>
                        <option>United States Minor Outlying Islands (the)</option>
                        <option>United States of America (the)</option>
                        <option>Uruguay</option>
                        <option>Uzbekistan</option>
                        <option>Vanuatu</option>
                        <option>Venezuela (Bolivarian Republic of)</option>
                        <option>Viet Nam</option>
                        <option>Virgin Islands (British)</option>
                        <option>Virgin Islands (U.S.)</option>
                        <option>Wallis and Futuna</option>
                        <option>Western Sahara*</option>
                        <option>Yemen</option>
                        <option>Zambia</option>
                        <option>Zimbabwe</option>
                      </select>
                    </div>

                  </div>

                  <div className="col-sm-6">

                    <div className="form-group">
                      <label htmlFor="sel2">Domicile Now:</label>
                      <select className="form-control" name="sel2" id="sel2">
                        <option />
                        <option>United Kingdom of Great Britain and Northern Ireland (the)</option>
                        <option>Afghanistan</option>
                        <option>Åland Islands</option>
                        <option>Albania</option>
                        <option>Algeria</option>
                        <option>American Samoa</option>
                        <option>Andorra</option>
                        <option>Angola</option>
                        <option>Anguilla</option>
                        <option>Antarctica</option>
                        <option>Antigua and Barbuda</option>
                        <option>Argentina</option>
                        <option>Armenia</option>
                        <option>Aruba</option>
                        <option>Australia</option>
                        <option>Austria</option>
                        <option>Azerbaijan</option>
                        <option>Bahamas (the)</option>
                        <option>Bahrain</option>
                        <option>Bangladesh</option>
                        <option>Barbados</option>
                        <option>Belarus</option>
                        <option>Belgium</option>
                        <option>Belize</option>
                        <option>Benin</option>
                        <option>Bermuda</option>
                        <option>Bhutan</option>
                        <option>Bolivia (Plurinational State of)</option>
                        <option>Bonaire, Sint Eustatius and Saba</option>
                        <option>Bosnia and Herzegovina</option>
                        <option>Botswana</option>
                        <option>Bouvet Island</option>
                        <option>Brazil</option>
                        <option>British Indian Ocean Territory (the)</option>
                        <option>Brunei Darussalam</option>
                        <option>Bulgaria</option>
                        <option>Burkina Faso</option>
                        <option>Burundi</option>
                        <option>Cabo Verde</option>
                        <option>Cambodia</option>
                        <option>Cameroon</option>
                        <option>Canada</option>
                        <option>Cayman Islands (the)</option>
                        <option>Central African Republic (the)</option>
                        <option>Chad</option>
                        <option>Chile</option>
                        <option>China</option>
                        <option>Christmas Island</option>
                        <option>Cocos (Keeling) Islands (the)</option>
                        <option>Colombia</option>
                        <option>Comoros (the)</option>
                        <option>Congo (the Democratic Republic of the)</option>
                        <option>Congo (the)</option>
                        <option>Cook Islands (the)</option>
                        <option>Costa Rica</option>
                        <option>Côte d'Ivoire</option>
                        <option>Croatia</option>
                        <option>Cuba</option>
                        <option>Curaçao</option>
                        <option>Cyprus</option>
                        <option>Czechia</option>
                        <option>Denmark</option>
                        <option>Djibouti</option>
                        <option>Dominica</option>
                        <option>Dominican Republic (the)</option>
                        <option>Ecuador</option>
                        <option>Egypt</option>
                        <option>El Salvador</option>
                        <option>Equatorial Guinea</option>
                        <option>Eritrea</option>
                        <option>Estonia</option>
                        <option>Ethiopia</option>
                        <option>Falkland Islands (the) [Malvinas]</option>
                        <option>Faroe Islands (the)</option>
                        <option>Fiji</option>
                        <option>Finland</option>
                        <option>France</option>
                        <option>French Guiana</option>
                        <option>French Polynesia</option>
                        <option>French Southern Territories (the)</option>
                        <option>Gabon</option>
                        <option>Gambia (the)</option>
                        <option>Georgia</option>
                        <option>Germany</option>
                        <option>Ghana</option>
                        <option>Gibraltar</option>
                        <option>Greece</option>
                        <option>Greenland</option>
                        <option>Grenada</option>
                        <option>Guadeloupe</option>
                        <option>Guam</option>
                        <option>Guatemala</option>
                        <option>Guernsey</option>
                        <option>Guinea</option>
                        <option>Guinea-Bissau</option>
                        <option>Guyana</option>
                        <option>Haiti</option>
                        <option>Heard Island and McDonald Islands</option>
                        <option>Holy See (the)</option>
                        <option>Honduras</option>
                        <option>Hong Kong</option>
                        <option>Hungary</option>
                        <option>Iceland</option>
                        <option>India</option>
                        <option>Indonesia</option>
                        <option>Iran (Islamic Republic of)</option>
                        <option>Iraq</option>
                        <option>Ireland</option>
                        <option>Isle of Man</option>
                        <option>Israel</option>
                        <option>Italy</option>
                        <option>Jamaica</option>
                        <option>Japan</option>
                        <option>Jersey</option>
                        <option>Jordan</option>
                        <option>Kazakhstan</option>
                        <option>Kenya</option>
                        <option>Kiribati</option>
                        <option>Korea (the Democratic People's Republic of)</option>
                        <option>Korea (the Republic of)</option>
                        <option>Kuwait</option>
                        <option>Kyrgyzstan</option>
                        <option>Lao People's Democratic Republic (the)</option>
                        <option>Latvia</option>
                        <option>Lebanon</option>
                        <option>Lesotho</option>
                        <option>Liberia</option>
                        <option>Libya</option>
                        <option>Liechtenstein</option>
                        <option>Lithuania</option>
                        <option>Luxembourg</option>
                        <option>Macao</option>
                        <option>Macedonia (the former Yugoslav Republic of)</option>
                        <option>Madagascar</option>
                        <option>Malawi</option>
                        <option>Malaysia</option>
                        <option>Maldives</option>
                        <option>Mali</option>
                        <option>Malta</option>
                        <option>Marshall Islands (the)</option>
                        <option>Martinique</option>
                        <option>Mauritania</option>
                        <option>Mauritius</option>
                        <option>Mayotte</option>
                        <option>Mexico</option>
                        <option>Micronesia (Federated States of)</option>
                        <option>Moldova (the Republic of)</option>
                        <option>Monaco</option>
                        <option>Mongolia</option>
                        <option>Montenegro</option>
                        <option>Montserrat</option>
                        <option>Morocco</option>
                        <option>Mozambique</option>
                        <option>Myanmar</option>
                        <option>Namibia</option>
                        <option>Nauru</option>
                        <option>Nepal</option>
                        <option>Netherlands (the)</option>
                        <option>New Caledonia</option>
                        <option>New Zealand</option>
                        <option>Nicaragua</option>
                        <option>Niger (the)</option>
                        <option>Nigeria</option>
                        <option>Niue</option>
                        <option>Norfolk Island</option>
                        <option>Northern Mariana Islands (the)</option>
                        <option>Norway</option>
                        <option>Oman</option>
                        <option>Pakistan</option>
                        <option>Palau</option>
                        <option>Palestine, State of</option>
                        <option>Panama</option>
                        <option>Papua New Guinea</option>
                        <option>Paraguay</option>
                        <option>Peru</option>
                        <option>Philippines (the)</option>
                        <option>Pitcairn</option>
                        <option>Poland</option>
                        <option>Portugal</option>
                        <option>Puerto Rico</option>
                        <option>Qatar</option>
                        <option>Réunion</option>
                        <option>Romania</option>
                        <option>Russian Federation (the)</option>
                        <option>Rwanda</option>
                        <option>Saint Barthélemy</option>
                        <option>Saint Helena, Ascension and Tristan da Cunha</option>
                        <option>Saint Kitts and Nevis</option>
                        <option>Saint Lucia</option>
                        <option>Saint Martin (French part)</option>
                        <option>Saint Pierre and Miquelon</option>
                        <option>Saint Vincent and the Grenadines</option>
                        <option>Samoa</option>
                        <option>San Marino</option>
                        <option>Sao Tome and Principe</option>
                        <option>Saudi Arabia</option>
                        <option>Senegal</option>
                        <option>Serbia</option>
                        <option>Seychelles</option>
                        <option>Sierra Leone</option>
                        <option>Singapore</option>
                        <option>Sint Maarten (Dutch part)</option>
                        <option>Slovakia</option>
                        <option>Slovenia</option>
                        <option>Solomon Islands</option>
                        <option>Somalia</option>
                        <option>South Africa</option>
                        <option>South Georgia and the South Sandwich Islands</option>
                        <option>South Sudan</option>
                        <option>Spain</option>
                        <option>Sri Lanka</option>
                        <option>Sudan (the)</option>
                        <option>Suriname</option>
                        <option>Svalbard and Jan Mayen</option>
                        <option>Swaziland</option>
                        <option>Sweden</option>
                        <option>Switzerland</option>
                        <option>Syrian Arab Republic</option>
                        <option>Taiwan (Province of China)</option>
                        <option>Tajikistan</option>
                        <option>Tanzania, United Republic of</option>
                        <option>Thailand</option>
                        <option>Timor-Leste</option>
                        <option>Togo</option>
                        <option>Tokelau</option>
                        <option>Tonga</option>
                        <option>Trinidad and Tobago</option>
                        <option>Tunisia</option>
                        <option>Turkey</option>
                        <option>Turkmenistan</option>
                        <option>Turks and Caicos Islands (the)</option>
                        <option>Tuvalu</option>
                        <option>Uganda</option>
                        <option>Ukraine</option>
                        <option>United Arab Emirates (the)</option>
                        <option>United States Minor Outlying Islands (the)</option>
                        <option>United States of America (the)</option>
                        <option>Uruguay</option>
                        <option>Uzbekistan</option>
                        <option>Vanuatu</option>
                        <option>Venezuela (Bolivarian Republic of)</option>
                        <option>Viet Nam</option>
                        <option>Virgin Islands (British)</option>
                        <option>Virgin Islands (U.S.)</option>
                        <option>Wallis and Futuna</option>
                        <option>Western Sahara*</option>
                        <option>Yemen</option>
                        <option>Zambia</option>
                        <option>Zimbabwe</option>
                      </select>
                    </div>

                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <label className="col-sm-2 control-label">Gender</label>
                    <div className="col-sm-10">
                      <input id="gender-male" className="magic-checkbox" type="checkbox" />
                      <label htmlFor="gender-male">Male</label>
                      <input id="gender-female" className="magic-checkbox" type="checkbox" />
                      <label htmlFor="gender-female">Female</label>
                      <input id="gender-other" className="magic-checkbox" type="checkbox" />
                      <label htmlFor="gender-other">Other</label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <label className="col-sm-2 control-label">Ethnicity</label>
                    <div className="col-sm-10">
                      <div className="checkbox">
                        <input id="eth-1" className="magic-checkbox" type="checkbox" />
                        <label htmlFor="eth-1">White</label>
                      </div>
                      <div className="checkbox">
                        <input id="eth-2" className="magic-checkbox" type="checkbox" />
                        <label htmlFor="eth-2">Mixed / Multiple ethnic groups</label>
                      </div>
                      <div className="checkbox">
                        <input id="eth-3" className="magic-checkbox" type="checkbox" />
                        <label htmlFor="eth-3">Asian / Asian British</label>
                      </div>
                      <div className="checkbox">
                        <input id="eth-4" className="magic-checkbox" type="checkbox" />
                        <label htmlFor="eth-4">Black / African / Caribbean / Black British</label>
                      </div>
                      <div className="checkbox">
                        <input id="eth-5" className="magic-checkbox" type="checkbox" />
                        <label htmlFor="eth-5">Other ethnic group</label>
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
                        <option>Agriculture</option>
                        <option>Anthropology</option>
                        <option>Archaeology</option>
                        <option>Art and Design</option>
                        <option>Biosciences</option>
                        <option>Business</option>
                        <option>Chemistry</option>
                        <option>Classics & Ancient History</option>
                        <option>Clinical Medicine</option>
                        <option>Communication, Cultural and Media Studies</option>
                        <option>Computer Science</option>
                        <option>Economics</option>
                        <option>Education</option>
                        <option>Engineering</option>
                        <option>English Language and Literature</option>
                        <option>Geography</option>
                        <option>History</option>
                        <option>Leisure and Tourism</option>
                        <option>Law</option>
                        <option>Mathematical Sciences</option>
                        <option>Modern Languages and Linguistics</option>
                        <option>Music, Drama, Dance and Performing Arts</option>
                        <option>Natural Sciences</option>
                        <option>Philosophy</option>
                        <option>Physics</option>
                        <option>Politics</option>
                        <option>Psychology</option>
                        <option>Social Sciences</option>
                        <option>Sociology</option>
                        <option>Sport and Exercise Sciences</option>
                        <option>Law</option>
                        <option>Theology & Religion</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="sel4">Degree Type:</label>
                      <select className="form-control" name="sel3" id="sel4">
                        <option />
                        <option>Undergraduate Bachelors Degree</option>
                        <option>Undergraduate Masters Degree</option>
                        <option>Masters</option>
                        <option>Doctorate</option>
                        <option>Other Degree</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <p className="text-main text-bold">Other Options</p>
                      <div className="col-sm-10 col-sm-push-1">
                        <div className="col-sm-8">
                          <label htmlFor="stem-1">STEM subjects only</label>
                        </div>
                        <div className="col-sm-4">
                          <input id="demo-sw-unchecked1" type="checkbox" />
                        </div>
                        <div className="col-sm-8">
                          <label htmlFor="polar-2">POLAR areas only</label>
                        </div>
                        <div className="col-sm-4">
                          <input id="demo-sw-unchecked2" type="checkbox" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

