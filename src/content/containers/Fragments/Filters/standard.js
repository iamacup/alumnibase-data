
/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import { drawComparisonChart } from '../../../../content/scripts/custom/echarts/generators';
import { dNc, debounce } from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Graph extends React.PureComponent {
  componentDidMount() {
    $(() => {
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

      const executeFunction = debounce((e) => {
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

      const executeFunction2 = debounce((e) => {
        console.log('change 2');
      }, 250);

      $('#date-slider').on('slideStop', executeFunction2);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-8 col-sm-push-2">
          <div className="panel panel-sliips-purple">
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

                <div className="pad-ver">
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

