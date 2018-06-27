
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { dNc } from '../../../../content/scripts/custom/utilities';

class Sidebar extends React.PureComponent {
  classNameBasedOnLocation(startsWith, className) {
    if (dNc(this.props.theLocation) && dNc(this.props.theLocation.pathname) && this.props.theLocation.pathname.startsWith(startsWith)) {
      return className;
    }

    return '';
  }

  handleLogout() {
    const Cookies = require('js-cookie');
    Cookies.remove('authentication');

    this.context.router.history.push('/');
  }

  render() {
    let profileImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASEAAAEfCAIAAACBD+eRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAC+1JREFUeNrsne9rGkkYgHu6rQHFhRVSKigoCAoKCfT//9SP/VBowECoAQNChQiGBrRVuLexJF4uaYzu7M687/N8KHcHd5wz88z7Y2Z3//n06dMbAHBGgSEAwDEAHAMAHAPAMQAcAwAcA8AxABwDABwDwDEAwDEAHAPAMQDAMQAcA8AxAMAxABwDwDEAwDEAHAMAHAPAMQAcAwAcA8AxABwDABwDwDEAHAMAHAPAMQDAMQAcA8AxAMAxABwDwDEAwDEAHAMwR8QQeDoxUVQulzd/yt+W7vj7v3JzcyN/LhaL5XK5+ZNhxDF4oLxFpVIpFouv/S/Ecfzon9xuMZ/PGWQcs+iViJEkyX5S7ejttnJimoS76+trBh/HNFOr1cQrsevF9M+FcvV6Xf56NpuJafLnarViRnBMCSLV8fGxCOYiZL2W5I572abTKROEYwF3L0QtiR4ZR61XydZut8W08XhMpwTHQkKkajabIpj//6sSWo/vkILt6uqKBgmOBZAWSuDaJGPB/Z8LEs0kppFA4pinsUvyrhDtevQrOp2OBOHLy0uakDjmUd3VarWCyAx3N63b7ZI94pgXSGYou74PDUNH2aPkjRLTaPTjWA6Uy2VJq7aPelWyOXUYjUYUaTiWKZIcbo50LSBRWnYTke3i4oIW/+5w737/8HVycmJHsO3U8fT0VGIaa4A45rb6kghm9udLQOt2u1RoOOZmvNQ1Dw+p0CSYS954e3vLaJArpkOpVOr3+wi2nTAPBgPyRhxLbT1JHaK+f7hf3miwLiVXTD8v6nQ6jMNzSP68yRsZCuIYgjFKOMbSCXmspF6NIpIjHNsZKTMQ7FXEcYxmOPaKXdnyIdjeSGEmmjEOOEaK6FYzRg/HEIwxxDH24PA1azabjAOO/YdSqTQYDBiHtGg0GlyLwbEHoijq9Xoqn7PMkXa7bfxyDI49sLmswDiki+xZsnNZ7ubj2B/q9TpZjbsM3HKJi2O/kfDFUZhTkiQxe28Yx35DI5FUHMeYe/YyHAs2S+TZpyxH2+CJmXXHyBIzptFo+PltDRxzgkQwskT2NRxzRRRF3PTJhTiOTb0CxK5jrVaLKx05Dj6OKUdKAk6c8x1/O0mEUcfa7TYLPfdi2MgFK4uOST0Q+vfBFCCJupFTE4uOcSBGKMMxt5UAQcyfUGahKjbnGP16cgocc4hkJrQTfUsr1M+ILccQjEnBMTITc8RxrPsGY4G5BPY+HCMnUY7u64sFJhJyR/ILxQ9AFOwIxg1gsgwccwjnzmQZOOaWOI5Zx6SLOOYKmTw6ioQyHCOIWadareIYxRiwFeLYU1QqFVYwmuGYw2KMrj2O4Zhbx1i7TBaOMW2AY0wbuEflEYt+x2h4UJLhmEOiKKLhQSjDMRJFeODo6AjHAotjrFriGI4RxwDHAADHjGyK6qGviGMAOAaAYwA4BgA4BoBjAIBjADgGgGMAgGMAOAaAY8Fxc3PDHIfF7e0tjgE4ZLVa4VhILBYLVm1YrNdrHAuJ5XLJqiVXxDHiGJArEseAOIZjduaM+cIx5gz2ZL1ekyviGDjkx48f+n4UjoFHqLwzoN+x+XzO2mVDxDFmDtRuiAVmDvzZCvU1PKw4xs1gtkIcc8v19TUrmK0Qx9wym81YxD6zXq+1boVWHCOUkSjiGHHMNIo3QSuOrVYrNPM5UVQ8O4aegyZd9HlqVHbtzTk2nU71PWOrZmoU/zpb7/MglHnIcrnUfUnAlmPj8Zg17RuTyUT3D7TlmPotMzgke9edKL4x+O63q6srVrZX2bvibodRxySO8ZIPsnccY15NIFmihf2uwNQCmx2Opc/l5SVLnJ0Ox9yW2jQYc2S9XtvZ5ux+U4IGY45MJhP17UQc+91gVH8y4yeSIqo/d8axh6qMG4y5DLudIGbdMZnp0WjEos+S2Wxm7dao9W/8SbpI8yMzJGu4uLiw9qv5juYbmXUyxsyG2lSWiGMPJbjBzTWXlMHms0U49huZe3qMrjcys+f+OPYHWQG8stsdw+HQYJaIY/9BVgCFmbsyzPL+hWMPyDqgMHNRhhnPw3HscWHGdeEUmc/nbFs49pjJZEL/I6284Pz8nHHAsafrBzQ7kOVyeXZ2ZrbPgWM7acb9j71Zr9eWG4k4tiuS59DN30+wr1+/MnQ49jKyDUu2w1pBMBxzrhm12e41GIL9n4gheFGzTff5+PiY0fgLohZNDuLY/ohmvJvgL8zncwQjjh3KeDxeLBbtdrtYLDIa20guzUEzjqW2mCQj6vV6pVKJ0biP8NSr5IopVx1fvnzhk5xv7jocMhQIhmPpI1XHcDg0fq1R1BLBaCGSKzpkMplIod/pdMrlsqkfvnknB19LJI5llzea6jdKkvz582cEI45lyng8/v79uwS0OI4V/8xfv359+/YNu4hjuVX/Z2dn5+fnP3/+1Pob375922g0OIgnjuWGBLEkSd69e6f4N0rlKeG62WxOp1NTL6zHsfztkg1ed6K4TalUkt9br9cnd2Aajrnd11utlh27tikWi5iGY273ckmZKE7uTRuNRhxG41hK4xVF9Tu4tbht2qZO4+FxHDuUWq0mySGXFZ+L7f1+fzabSUzjc9s4ts8CUn8ClgpJksgojcdjU1/xw7FDkcxQEiGSw91TR4n2Uqwafz3wPZxBv5z/yIpBsNdSLpdPTk5kb2IoiGPPIjsxT2QeSKPRqFarEtAsV2jEsac2nijq9XpSgCHY4Uh5dnp6avmcgzj2RJLDk86pV2ibjpG1r63j2NP5oawGxsHR2Mr+NRwOreWN5IoPdO5gHJzmCJI31mo1HLNYgJ2cnHA3Kpu8sdvt1ut1ckVbm+tgMKC9kSWtVkuG3cgb46w7JnkL/cMcyzMLbz4tGJ9myVsQLMcMot/vS6KOYzqRkoAOhw+affz4Ufe7vYw6JnZJScAS9wHJI6QeVqxZwaZgtBDRDMcQDM1wDMEAzXAMwdAMxxAMlGtmwrF6vY5gaIZjrhC7aNOHqJmkHjqOp5U7trkqxZINETW3QAq6JwnBmEEcc4Xsf9ymV0CSJKFrVtAqmKQZCKamog66ZaXTsc3jSaxONQT9TWCFjtGpV4lk/oH2P7Q5FscxnXqVSOYv+T+O5V+G9Xo9lqNWNh98w7E84aFm9UghENxrrfQ41mw2+a6KBTqdTlhvmFXimGQRjUaD9WekMAvrxEyDY5Rh1pCEJaAvwmhwTCIYr6e3hkx6KCdmwTsmW5qpl87CdmGGY1lkidz6NYvEsSAyxrAdI0skY/Q/YwzYMbJECCJjLDC4EHrG6PlWG6pjkoiTJUIQiyFIx2RAyRLhnmKx2G63cSxNZEC5lwjbJEni7U268ByToZQBZVXBI7y9kl9gKEEH5XLZz2dzA3Ns8/FF1hM8V0R4+Kx0SI7J8AV0ExSyR6p0D5thITkmw0e/Hl5cJL6FsmAck4GjXw+7hDLfKvZgHBPB6NfDjkW7V/lOGI4RxOBVeFW3h+EYQQzCDWUBOEYQg6BDWQCOEcQg6FDmu2MEMdib9+/f49jLJElCEIO9MyAfzsp8d4yLHbA3sjv7cIPRa8dqtRoXO+DAUIZjf+PDhw+sEjgE2aNzfz9+wefR4f31oGCn9tcxKjFIBdmp8604PHUsiqLgPoEDVGUhOUbLHlIk34MyTx3j3BlSJN8mvo+OSfbMCwUgXXIsPXx0jCAGLqqPvDofPjpGtwM0rSvvHMu90wpayaskKzAQYITyHThGogjadvCCb4JxLAbKdnC/HONF9uCUXI6FvItjrANwSvYXzT1yTDYYEkXQV5IVLP94MIhs5RkfDnnkGE+LgcqV5otj3FEErWW/L44RxIA4pmprAcsUi8UsNSOOAaHMgGN07SFjqtWqLccIYkAcwzFAMxwDwDGKMTBYknnhGPMN2VOpVHAMwCGSPWWz9vJ3jGIMdO/vxDHAMdWOEcQAx9zCa95A/Rafs2MkiqB+BeIYmObo6Ei5Y5mdUQBYjGNRFHHDA3CMRBE0k8Euj2Ngmgxaiznniswx5I7rA6Q8HcvyWVSA53DdWiwwxEAcU+sYF6mAOAZAHAvWMZqKYMSxfwUYAKdBpfkduNxpAAAAAElFTkSuQmCC';
    let fullName = '';
    let username = '';

    if (this.props.authenticationData.loggedIn === true) {
      ({ profileImage, fullName, username } = this.props.authenticationData);
    }

    return (
      <nav id="mainnav-container">
        <div id="mainnav">
          {/*  <!--OPTIONAL : ADD YOUR LOGO TO THE NAVIGATION--> */}
          {/*  <!--It will only appear on small screen devices.--> */}
          {/*  <!--================================
                      <div class="mainnav-brand">
                          <a href="index.html" class="brand">
                              <img src="img/logo.png" alt="Nifty Logo" class="brand-icon">
                              <span class="brand-text">Nifty</span>
                          </a>
                          <a href="#" class="mainnav-toggle"><i class="pci-cross pci-circle icon-lg"></i></a>
                      </div>
                      --> */}


          {/*  <!--Menu--> */}
          {/*  <!--================================--> */}
          <div id="mainnav-menu-wrap">
            <div className="nano">
              <div className="nano-content">

                {/*  <!--Profile Widget--> */}
                {/*  <!--================================--> */}
                <div id="mainnav-profile" className="mainnav-profile">
                  <div className="profile-wrap text-center">
                    <div className="pad-btm">
                      <img className="img-circle img-md" src={profileImage} alt="Profile" />


                    </div>
                    <a href="#profile-nav" className="box-block" data-toggle="collapse" aria-expanded="false">
                      <span className="pull-right dropdown-toggle">
                        <i className="dropdown-caret" />
                      </span>
                      <p className="mnp-name">{fullName}</p>
                      <span className="mnp-desc">{username}</span>
                    </a>
                  </div>
                  <div id="profile-nav" className="collapse list-group bg-trans">
                    <Link href="/profile/settings" to="/profile/settings" className="list-group-item">
                      <i className="far fa-cog" style={{ marginLeft: '5px', marginRight: '5px', fontSize: '1.333em' }} /> Settings
                    </Link>
                    <Link href="/help" to="/help" className="list-group-item">
                      <i className="far fa-question" style={{ marginLeft: '5px', marginRight: '5px', fontSize: '1.333em' }} /> Help
                    </Link>
                    <a href="#" className="list-group-item" onClick={() => this.handleLogout()}>
                      <i className="far fa-sign-out" style={{ marginLeft: '5px', marginRight: '5px', fontSize: '1.333em' }} /> Logout
                    </a>
                  </div>
                </div>


                <ul id="mainnav-menu" className="list-group">

                  <li className="list-divider" />

                  {/*  <!--Category name--> */}
                  <li className="list-header">Campaign</li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/campaign/overview', 'active-link')}>
                    <Link href="/campaign/overview" to="/campaign/overview">
                      <i className="far fa-binoculars" />
                      <span className="menu-title">Overview</span>
                    </Link>
                  </li>

                  {/*
                  <li className={this.classNameBasedOnLocation('/campaign/contacts', 'active-link')}>
                    <Link href="/campaign/contacts" to="/campaign/contacts">
                      <i className="far fa-address-card" />
                      <span className="menu-title">Contacts</span>
                    </Link>
                  </li>

                  <li className={this.classNameBasedOnLocation('/campaign/segmentation-and-phases', 'active-link')}>
                    <Link href="/campaign/segmentation-and-phases" to="/campaign/segmentation-and-phases">
                      <i className="far fa-cogs" />
                      <span className="menu-title">Segmentation & Phases</span>
                    </Link>
                  </li>
                  */}

                  <li className="list-divider" />

                  {/*  <!--Category name--> */}
                  <li className="list-header">Analytics</li>


                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/salary', 'active-sub')}>
                    <a href="#">
                      <i className="fas fa-money-bill-alt" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Salary Data</span>
                      <i className="arrow" />
                    </a>
                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/salary', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/salary/overview', 'active-link')}>
                        <Link href="/analytics/salary/overview" to="/analytics/salary/overview">Overview</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/salary/ranges', 'active-link')}>
                        <Link href="/analytics/salary/ranges" to="/analytics/salary/ranges">Ranges</Link>
                      </li>
                    </ul>
                  </li>


                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/jobs', 'active-sub')}>
                    <a href="#">
                      <i className="fas fa-user-md" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Jobs and Careers</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/jobs', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/jobs/overview', 'active-link')}>
                        <Link href="/analytics/jobs/overview" to="/analytics/jobs/overview">Overview</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/jobs/employers', 'active-link')}>
                        <Link href="/analytics/jobs/employers" to="/analytics/jobs/employers">Employers</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/jobs/first-year', 'active-link')}>
                        <Link href="/analytics/jobs/first-year" to="/analytics/jobs/first-year">First Year Salary</Link>
                      </li>
                      {/*     <li className={this.classNameBasedOnLocation('/analytics/jobs/first-job', 'active-link')}>
                                         <Link href={`/analytics/jobs/first-job" to={`/analytics/jobs/first-job">Time to First Job</Link>
                                       </li> */}
                    </ul>
                  </li>


                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/subjects', 'active-sub')}>
                    <a href="#">
                      <i className="fas fa-pen-square" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Subjects</span>
                      <i className="arrow" />
                    </a>
                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/subjects', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/subjects/vfm', 'active-link')}>
                        <Link href="/analytics/subjects/vfm" to="/analytics/subjects/vfm">Value For Money</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/subjects/3', 'active-link')}>
                        <Link href="/analytics/subjects/3" to="/analytics/subjects/3">Longterm Outcomes</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/subjects/first-year', 'active-link')}>
                        <Link href="/analytics/subjects/first-year" to="/analytics/subjects/first-year">First Year Salary</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/subjects/first-job', 'active-link')}>
                        <Link href="/analytics/subjects/first-job" to="/analytics/subjects/first-job">Time to First Job</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/stem', 'active-sub')}>
                    <a href="#">
                      <i className="fas fa-chart-line" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">STEM</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/stem', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/stem/overview', 'active-link')}>
                        <Link href="/analytics/stem/overview" to="/analytics/stem/overview">Overview</Link>
                      </li>
                    </ul>
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/stem', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/stem/destinations', 'active-link')}>
                        <Link href="/analytics/stem/destinations" to="/analytics/stem/destinations">Destinations and Outcomes</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/polar', 'active-sub')}>
                    <a href="#">
                      <i className="fas fa-address-book" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">POLAR</span>
                      <i className="arrow" />
                    </a>
                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/polar', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/polar', 'active-link')}>
                        <Link href="/analytics/polar" to="/analytics/polar">Outcomes</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/further-study', 'active-sub')}>
                    <a href="#">
                      <i className="fas fa-chevron-double-up" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Further Study</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/further-study', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/further-study/overview', 'active-link')}>
                        <Link href="/analytics/further-study/overview" to="/analytics/further-study/overview">Overview</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/views', 'active-sub')}>
                    <a href="#">
                      <i className="fas fa-eye" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Respondant Views</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/views', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/views/1', 'active-link')}>
                        <Link href="/analytics/views/1" to="/analytics/views/1">Views on Education Impact</Link>
                      </li>
                    </ul>
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/views', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/views/2', 'active-link')}>
                        <Link href="/analytics/views/2" to="/analytics/views/2">Views on Overall Happiness</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/destination', 'active-sub')}>
                    <a href="#">
                      <i className="fas fa-map" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Geographic Data</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/destination', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/destination/1', 'active-link')}>
                        <Link href="/analytics/destination/1" to="/analytics/destination/1">Global</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/destination/2', 'active-link')}>
                        <Link href="/analytics/destination/2" to="/analytics/destination/2">Local</Link>
                      </li>
                    </ul>
                  </li>


                  <li className="list-divider" />

                  {/*  <!--Category name--> */}
                  <li className="list-header">Regulatory Outputs</li>


                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/dlhe-like', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#ab47bc' }} />
                      <span className="menu-title">DLHE-Like</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/dlhe-like', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/2-3', 'active-link')}>
                        <Link href="/analytics/dlhe-like/2-3" to="/analytics/dlhe-like/2-3">RQ 2/3 - Graduates and What they Are Doing</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/4', 'active-link')}>
                        <Link href="/analytics/dlhe-like/4" to="/analytics/dlhe-like/4">RQ 4 - Full Time Graduate Destinations</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('{/analytics/dlhe-like/5', 'active-link')}>
                        <Link href="/analytics/dlhe-like/5" to="/analytics/dlhe-like/5">RQ 5 - Destination, Employment and Earnings</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/6', 'active-link')}>
                        <Link href="/analytics/dlhe-like/6" to="/analytics/dlhe-like/6">RQ 6 - Employment Outcomes</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/7', 'active-link')}>
                        <Link href="/analytics/dlhe-like/7" to="/analytics/dlhe-like/7">RQ 7 - UK Domicilied Graduates</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/8', 'active-link')}>
                        <Link href="/analytics/dlhe-like/7" to="/analytics/dlhe-like/8">RQ 8 - Graduates in Employment</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/9', 'active-link')}>
                        <Link href="/analytics/dlhe-like/9" to="/analytics/dlhe-like/9">RQ 9 - Geographical Destinations of Employment</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/11', 'active-link')}>
                        <Link href="/analytics/dlhe-like/11" to="/analytics/dlhe-like/11">RQ 11 - First Time Graduates in full time work</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/widening-participation', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#ab47bc' }} />
                      <span className="menu-title">Widening Participation</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/widening-participation', 'in')}>
                      <li className={this.classNameBasedOnLocation('/analytics/widening-participation/bme-economic-achievement', 'active-link')}>
                        <Link href="/analytics/widening-participation/bme-economic-achievement" to="/analytics/widening-participation/bme-economic-achievement">BME Economic Achievement</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/widening-participation/improving-technical-pathways', 'active-link')}>
                        <Link href="/analytics/widening-participation/improving-technical-pathways" to="/analytics/widening-participation/improving-technical-pathways">Improving Technical Pathways of BME and POLAR3</Link>
                      </li>
                    </ul>
                  </li>


                  <li className="list-divider" />

                  {/*  <!--Category name--> */}
                  <li className="list-header">Data Control</li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/data-control/export', 'active-link')}>
                    <Link href="/data-control/export" to="/data-control/export">
                      <i className="far fa-upload" />
                      <span className="menu-title">Export</span>
                    </Link>
                  </li>


                </ul>


              </div>
            </div>
          </div>
          {/*  <!--================================--> */}
          {/*  <!--End menu--> */}

        </div>
      </nav>
    );
  }
}

/*

old advanced analytics

<li className="list-divider" />


<li className="list-header">Advanced Analytics</li>


<li className={this.classNameBasedOnLocation('/analytics/employment-outcomes', 'active-sub')}>
  <a href="#">
    <i className="far fa-adjust" style={{ color: '#ffb300' }} />
    <span className="menu-title">Employment Outcomes</span>
    <i className="arrow" />
  </a>


  <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/employment-outcomes', 'in')} >
    <li className={this.classNameBasedOnLocation('/analytics/employment-outcomes/employment-destinations', 'active-link')}>
      <Link href="/analytics/employment-outcomes/employment-destinations" to="/analytics/employment-outcomes/employment-destinations">Employment Destinations</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/employment-outcomes/earning-trends', 'active-link')}>
      <Link href="/analytics/employment-outcomes/earning-trends" to="/analytics/employment-outcomes/earning-trends">Earning Trends</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/employment-outcomes/impact-on-career', 'active-link')}>
      <Link href="/analytics/employment-outcomes/impact-on-career" to="/analytics/employment-outcomes/impact-on-career">Impact on Career</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/employment-outcomes/student-voice', 'active-link')}>
      <Link href="/analytics/employment-outcomes/student-voice" to="/analytics/employment-outcomes/student-voice">Student Voice</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/employment-outcomes/carrer-advice', 'active-link')}>
      <Link href="/analytics/employment-outcomes/carrer-advice" to="/analytics/employment-outcomes/carrer-advice">Career Advice</Link>
    </li>
  </ul>
</li>


<li className={this.classNameBasedOnLocation('/analytics/higher-education-trends', 'active-sub')}>
  <a href="#">
    <i className="far fa-adjust" style={{ color: '#ffb300' }} />
    <span className="menu-title">HE Trends</span>
    <i className="arrow" />
  </a>


  <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/higher-education-trends', 'in')} >
    <li className={this.classNameBasedOnLocation('/analytics/higher-education-trends/further-study-outcomes', 'active-link')}>
      <Link href="/analytics/higher-education-trends/further-study-outcomes" to="/analytics/higher-education-trends/further-study-outcomes">Further Study Outcomes</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/higher-education-trends/full-time-part-time-trends', 'active-link')}>
      <Link href="/analytics/higher-education-trends/full-time-part-time-trends" to="/analytics/higher-education-trends/full-time-part-time-trends">Full Time / Part Time Trends</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/higher-education-trends/uk-eu-non-eu', 'active-link')}>
      <Link href="/analytics/higher-education-trends/uk-eu-non-eu" to="/analytics/higher-education-trends/uk-eu-non-eu">UK / EU / Non-EU</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/higher-education-trends/mature-students', 'active-link')}>
      <Link href="/analytics/higher-education-trends/mature-students" to="/analytics/higher-education-trends/mature-students">Mature Students</Link>
    </li>
  </ul>
</li>


<li className={this.classNameBasedOnLocation('/analytics/dlhe-plus', 'active-sub')}>
  <a href="#">
    <i className="far fa-adjust" style={{ color: '#ffb300' }} />
    <span className="menu-title">DLHE+</span>
    <i className="arrow" />
  </a>

  <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/dlhe-plus', 'in')} >
    <li className={this.classNameBasedOnLocation('/analytics/dlhe-plus/soon', 'active-link')}>
      <Link href="/analytics/dlhe-plus/soon" to="/analytics/dlhe-plus/soon">Coming Soon</Link>
    </li>
  </ul>
</li>


<li className={this.classNameBasedOnLocation('/analytics/widening-participation-2', 'active-sub')}>
  <a href="#">
    <i className="far fa-adjust" style={{ color: '#ffb300' }} />
    <span className="menu-title">Widening Pariticpation</span>
    <i className="arrow" />
  </a>

  <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/widening-participation-2', 'in')} >
    <li className={this.classNameBasedOnLocation('/analytics/widening-participation-2/students-with-disabilities', 'active-link')}>
      <Link href="/analytics/widening-participation-2/students-with-disabilities" to="/analytics/widening-participation-2/students-with-disabilities">Students with Disabilities</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/widening-participation-2/ethnicity-and-socio-economic-background', 'active-link')}>
      <Link href="/analytics/widening-participation-2/ethnicity-and-socio-economic-background" to="/analytics/widening-participation-2/ethnicity-and-socio-economic-background">Ethnicity & Socio-economic background</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/widening-participation-2/part-time-and-mature-students', 'active-link')}>
      <Link href="/analytics/widening-participation-2/part-time-and-mature-students" to="/analytics/widening-participation-2/part-time-and-mature-students">Part Time & Mature Students </Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/widening-participation-2/government-opportunity-areas', 'active-link')}>
      <Link href="/analytics/widening-participation-2/government-opportunity-areas" to="/analytics/widening-participation-2/government-opportunity-areas">Government Opportunity Areas</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/widening-participation-2/ncop', 'active-link')}>
      <Link href="/analytics/widening-participation-2/ncop" to="/analytics/widening-participation-2/ncop">NCOP</Link>
    </li>
  </ul>
</li>


<li className={this.classNameBasedOnLocation('/analytics/student-satisfaction', 'active-sub')}>
  <a href="#">
    <i className="far fa-adjust" style={{ color: '#ffb300' }} />
    <span className="menu-title">Student Satisfaction</span>
    <i className="arrow" />
  </a>

  <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/student-satisfaction', 'in')} >
    <li className={this.classNameBasedOnLocation('/analytics/student-satisfaction/recent-graduates-teaching-satisfaction', 'active-link')}>
      <Link href="/analytics/student-satisfaction/recent-graduates-teaching-satisfaction" to="/analytics/student-satisfaction/recent-graduates-teaching-satisfaction">Recent Graduates Teaching Satisfaction</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/student-satisfaction/welfare-provision', 'active-link')}>
      <Link href="/analytics/student-satisfaction/welfare-provision" to="/analytics/student-satisfaction/welfare-provision">Welfare Provision</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/student-satisfaction/degree-worth-it', 'active-link')}>
      <Link href="/analytics/student-satisfaction/degree-worth-it" to="/analytics/student-satisfaction/degree-worth-it">Degree worth it?</Link>
    </li>
  </ul>
</li>

*/

Sidebar.contextTypes = {
  router: PropTypes.object,
};

Sidebar.propTypes = {
  theLocation: PropTypes.object.isRequired,
  authenticationData: PropTypes.object,
};

Sidebar.defaultProps = {
  authenticationData: {
    loggedIn: false,
  },
};

// we have to bind the location to the state of this component so navigation updates work properly (i.e. so it detects a change in the location props and thus re renderds the app)
const mapStateToProps = state => ({
  authenticationData: state.dataStoreSingle.authentication,
});

const mapDispatchToProps = null;


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
