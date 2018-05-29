
import CampaignOverviewPage from '../../content/containers/Pages/CampaignOverview/main';

import NotFoundPage from '../../content/containers/Pages/NotFound';

import DHLE23Page from '../../content/containers/Pages/Analytics/DHLE/23';
import DHLE4Page from '../../content/containers/Pages/Analytics/DHLE/4';
import DHLE5Page from '../../content/containers/Pages/Analytics/DHLE/5';
import DHLE6Page from '../../content/containers/Pages/Analytics/DHLE/6';
import DHLE7Page from '../../content/containers/Pages/Analytics/DHLE/7';
import DHLE8Page from '../../content/containers/Pages/Analytics/DHLE/8';
import DHLE9Page from '../../content/containers/Pages/Analytics/DHLE/9';
import DHLE11Page from '../../content/containers/Pages/Analytics/DHLE/11';

import Views1PageA from '../../content/containers/Pages/Analytics/Views/1/1a';
import Views1PageB from '../../content/containers/Pages/Analytics/Views/1/1b';
import Views2Page from '../../content/containers/Pages/Analytics/Views/2';

import SplashPage from '../../content/containers/Pages/Splash';
// import LoginPage from '../../content/containers/Pages/Login';

import SalaryRangesPage from '../../content/containers/Pages/Analytics/Salary/Ranges';
import Salary2WorldPage from '../../content/containers/Pages/Analytics/Salary/GeographicalSalary/2a';
import Salary2UkPage from '../../content/containers/Pages/Analytics/Salary/GeographicalSalary/2b';
import SalaryOverview from '../../content/containers/Pages/Analytics/Salary/Overview';

import SubjectFirstYearPage from '../../content/containers/Pages/Analytics/Subjects/FirstYear';
import SubjectFirstJobPage from '../../content/containers/Pages/Analytics/Subjects/FirstJob';
import SubjectLongtermOutcomesPage from '../../content/containers/Pages/Analytics/Subjects/LongtermOutcomes';
import JobsFirstYearPage from '../../content/containers/Pages/Analytics/Jobs/FirstYear';
import JobsFirstJobPage from '../../content/containers/Pages/Analytics/Jobs/FirstJob';
import JobsOverviewPage from '../../content/containers/Pages/Analytics/Jobs/Overview';
import JobsEmployersPage from '../../content/containers/Pages/Analytics/Jobs/Employers';
import ValueForMoneyPage from '../../content/containers/Pages/Analytics/Subjects/ValueForMoney';
import StemOverviewPage from '../../content/containers/Pages/Analytics/STEM/Overview';
import StemDestinationsPage from '../../content/containers/Pages/Analytics/STEM/Destinations';
import PolarOverviewPage from '../../content/containers/Pages/Analytics/Polar/Overview';

import FurtherStudyOverviewPage from '../../content/containers/Pages/Analytics/FurtherStudy/Overview';

import WPBMEEPage from '../../content/containers/Pages/Analytics/WideningParticipation/BME-Economic';
import WPBMEPOLARPage from '../../content/containers/Pages/Analytics/WideningParticipation/BME-POLAR3';

import DataExportPage from '../../content/containers/Pages/DataControl/Export';

import TestsPage from '../../content/containers/Pages/Tests';

export default [
  {
    path: '/:university',
    exact: true,
    component: CampaignOverviewPage,
  },
  // {
  //   path: '/login',
  //   exact: true,
  //   component: LoginPage,
  // },
  {
    path: '/:university/data-control/export',
    exact: true,
    component: DataExportPage,
  },
  {
    path: '/:university/splash',
    exact: true,
    component: SplashPage,
  },
  {
    path: '/:university/tests',
    exact: true,
    component: TestsPage,
  },
  {
    path: '/:university/analytics/views/1',
    exact: true,
    component: Views1PageA,
  },
  {
    path: '/:university/analytics/views/1/direct-university-impact',
    exact: true,
    component: Views1PageA,
  },
  {
    path: '/:university/analytics/views/1/views-on-education',
    exact: true,
    component: Views1PageB,
  },
  {
    path: '/:university/analytics/views/2',
    exact: true,
    component: Views2Page,
  },
  {
    path: '/:university/analytics/salary/ranges',
    exact: true,
    component: SalaryRangesPage,
  },
  {
    path: '/:university/analytics/salary/overview',
    exact: true,
    component: SalaryOverview,
  },
  {
    path: '/:university/analytics/subjects/first-year',
    exact: true,
    component: SubjectFirstYearPage,
  },
  {
    path: '/:university/analytics/subjects/first-job',
    exact: true,
    component: SubjectFirstJobPage,
  },
  {
    path: '/:university/analytics/subjects/3',
    exact: true,
    component: SubjectLongtermOutcomesPage,
  },
  {
    path: '/:university/analytics/jobs/first-job',
    exact: true,
    component: JobsFirstJobPage,
  },
  {
    path: '/:university/analytics/jobs/first-year',
    exact: true,
    component: JobsFirstYearPage,
  },
  {
    path: '/:university/analytics/jobs/overview',
    exact: true,
    component: JobsOverviewPage,
  },
  {
    path: '/:university/analytics/jobs/employers',
    exact: true,
    component: JobsEmployersPage,
  },
  {
    path: '/:university/analytics/subjects/vfm',
    exact: true,
    component: ValueForMoneyPage,
  },
  {
    path: '/:university/analytics/polar',
    exact: true,
    component: PolarOverviewPage,
  },
  {
    path: '/:university/analytics/stem/overview',
    exact: true,
    component: StemOverviewPage,
  },
  {
    path: '/:university/analytics/stem/destinations',
    exact: true,
    component: StemDestinationsPage,
  },
  {
    path: '/:university/analytics/destination/1',
    exact: true,
    component: Salary2WorldPage,
  },
  {
    path: '/:university/analytics/destination/2',
    exact: true,
    component: Salary2UkPage,
  },
  {
    path: '/:university/campaign/overview',
    exact: true,
    component: CampaignOverviewPage,
  },
  {
    path: '/:university/analytics/dlhe-like/2-3',
    exact: true,
    component: DHLE23Page,
  },
  {
    path: '/:university/analytics/dlhe-like/4',
    exact: true,
    component: DHLE4Page,
  },
  {
    path: '/:university/analytics/dlhe-like/5',
    exact: true,
    component: DHLE5Page,
  },
  {
    path: '/:university/analytics/dlhe-like/6',
    exact: true,
    component: DHLE6Page,
  },
  {
    path: '/:university/analytics/dlhe-like/7',
    exact: true,
    component: DHLE7Page,
  },
  {
    path: '/:university/analytics/dlhe-like/8',
    exact: true,
    component: DHLE8Page,
  },
  {
    path: '/:university/analytics/dlhe-like/9',
    exact: true,
    component: DHLE9Page,
  },
  {
    path: '/:university/analytics/dlhe-like/11',
    exact: true,
    component: DHLE11Page,
  },
  {
    path: '/:university/analytics/further-study/overview',
    exact: true,
    component: FurtherStudyOverviewPage,
  },
  {
    path: '/:university/analytics/widening-participation/bme-economic-achievement',
    exact: true,
    component: WPBMEEPage,
  },
  {
    path: '/:university/analytics/widening-participation/improving-technical-pathways',
    exact: true,
    component: WPBMEPOLARPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

