
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

import Salary1Page from '../../content/containers/Pages/Analytics/Salary/1';
import Salary2Page from '../../content/containers/Pages/Analytics/Salary/2';
import Salary2WorldPage from '../../content/containers/Pages/Analytics/Salary/2/2a';
import Salary2UkPage from '../../content/containers/Pages/Analytics/Salary/2/2b';

import FurtherStudy105Page from '../../content/containers/Pages/Analytics/FurtherStudy/105';
import FurtherStudyMultiPage from '../../content/containers/Pages/Analytics/FurtherStudy/10-6-7-8-9';

import WPBMEEPage from '../../content/containers/Pages/Analytics/WideningParticipation/BME-Economic';
import WPBMEPOLARPage from '../../content/containers/Pages/Analytics/WideningParticipation/BME-POLAR3';

export default [
  {
    path: '/',
    exact: true,
    component: CampaignOverviewPage,
  },
  {
    path: '/analytics/views/1',
    exact: true,
    component: Views1PageA,
  },
  {
    path: '/analytics/views/1/direct-university-impact',
    exact: true,
    component: Views1PageA,
  },
  {
    path: '/analytics/views/1/views-on-education',
    exact: true,
    component: Views1PageB,
  },
  {
    path: '/analytics/views/2',
    exact: true,
    component: Views2Page,
  },
  {
    path: '/analytics/salary/1',
    exact: true,
    component: Salary1Page,
  },
  {
    path: '/analytics/salary/2',
    exact: true,
    component: Salary2Page,
  },
  {
    path: '/analytics/destination/1',
    exact: true,
    component: Salary2WorldPage,
  },
  {
    path: '/analytics/destination/2',
    exact: true,
    component: Salary2UkPage,
  },
  {
    path: '/campaign/overview',
    exact: true,
    component: CampaignOverviewPage,
  },
  {
    path: '/analytics/dlhe-like/2-3',
    exact: true,
    component: DHLE23Page,
  },
  {
    path: '/analytics/dlhe-like/4',
    exact: true,
    component: DHLE4Page,
  },
  {
    path: '/analytics/dlhe-like/5',
    exact: true,
    component: DHLE5Page,
  },
  {
    path: '/analytics/dlhe-like/6',
    exact: true,
    component: DHLE6Page,
  },
  {
    path: '/analytics/dlhe-like/7',
    exact: true,
    component: DHLE7Page,
  },
  {
    path: '/analytics/dlhe-like/8',
    exact: true,
    component: DHLE8Page,
  },
  {
    path: '/analytics/dlhe-like/9',
    exact: true,
    component: DHLE9Page,
  },
  {
    path: '/analytics/dlhe-like/11',
    exact: true,
    component: DHLE11Page,
  },
  {
    path: '/analytics/further-study/105',
    exact: true,
    component: FurtherStudy105Page,
  },
  {
    path: '/analytics/further-study/106-109',
    exact: true,
    component: FurtherStudyMultiPage,
  },
  {
    path: '/analytics/widening-participation/bme-economic-achievement',
    exact: true,
    component: WPBMEEPage,
  },
  {
    path: '/analytics/widening-participation/improving-technical-pathways',
    exact: true,
    component: WPBMEPOLARPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

