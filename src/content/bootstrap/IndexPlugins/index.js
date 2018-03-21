
import React from 'react';

import { getEnvironment } from '../../../foundation/utils/utilityFunctions';

const result = {
  headTop: [],
  headBottom: [],
  bodyTop: [],
  bodyBottom: [],
};

/*
  HEAD TOP SCRIPTS
*/


// font
result.headTop.push(<link key="5" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=latin" rel="stylesheet" type="text/css" />);

// Bootstrap Stylesheets
result.headTop.push(<link key="6" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />);

// Select2 Stylesheets
result.headTop.push(<link key="25" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/css/select2.min.css" rel="stylesheet" />);

// Slider Stylesheets
result.headTop.push(<link key="9" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.9.0/css/bootstrap-slider.min.css" rel="stylesheet" />);


result.headTop.push(<link key="nn9" href="https://storage.googleapis.com/files.sliips.com/nifty-v2.9/demo/plugins/switchery/switchery.min.css" rel="stylesheet" />);

result.headTop.push(<link key="fa1" rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.0.8/css/solid.css" integrity="sha384-+iHwwKZGTdlVFbv4fsKmLkogfdKlp47zQGkSMDN3ANc8kXjyKudKvQwinI5VH+2C" crossorigin="anonymous" />);
result.headTop.push(<link key="fa2" rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.0.8/css/fontawesome.css" integrity="sha384-+5VkSw5C1wIu2iUZEfX77QSYRb5fhjmEsRn8u4r9Ma8mvu/GvTag4LDSEAw7RjXl" crossorigin="anonymous" />);




/*
  HEAD BOTTOM SCRIPTS
*/


/*
  BODY TOP SCRIPTS
*/

// We include a bunch of shim/sham for old browser support
result.bodyTop.push(<script key="11" src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js" />);
result.bodyTop.push(<script key="12" src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-sham.min.js" />);
result.bodyTop.push(<script key="13" src="https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js" />);
result.bodyTop.push(<script key="14" src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-shim.min.js" />);
result.bodyTop.push(<script key="15" src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-sham.min.js" />);

// eCharts uses INTL a lot and IE9 needs a pollyfill for it
result.bodyTop.push(<script key="16" src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en" />);

// Jquery CDN
result.bodyTop.push(<script key="17" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />);

/*
  BODY BOTTOM SCRIPTS
*/

// Select2 JS *
result.bodyBottom.push(<script key="24" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/js/select2.min.js" />);

// Slider JS
result.bodyBottom.push(<script key="19" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.9.0/bootstrap-slider.min.js" />);

// google charts JS
result.bodyBottom.push(<script key ="new" type="text/javascript" src="https://www.gstatic.com/charts/loader.js" />);
// <div id="sankey_basic" style="width: 900px; height: 300px;"></div>

//this does not work properly with the webpack config
//result.bodyBottom.push(<script key ="new2" type="text/javascript" src="https://files.alumnibaseapp.com/assets/dataTool.min.js" />);



result.bodyBottom.push(<script key="18" src="https://storage.googleapis.com/files.sliips.com/nifty-v2.9/get-started/js/nifty.min.js" />);

result.bodyBottom.push(<script key="20" src="https://storage.googleapis.com/files.sliips.com/nifty-v2.9/demo/plugins/flot-charts/jquery.flot.min.js" />);
result.bodyBottom.push(<script key="21" src="https://storage.googleapis.com/files.sliips.com/nifty-v2.9/demo/plugins/flot-charts/jquery.flot.resize.min.js" />);
result.bodyBottom.push(<script key="22" src="https://storage.googleapis.com/files.sliips.com/nifty-v2.9/demo/plugins/flot-charts/jquery.flot.tooltip.min.js" />);

result.bodyBottom.push(<script key="23" src="https://storage.googleapis.com/files.sliips.com/nifty-v2.9/demo/plugins/sparkline/jquery.sparkline.min.js" />);

result.bodyBottom.push(<script key="nn23" src="https://storage.googleapis.com/files.sliips.com/nifty-v2.9/demo/plugins/switchery/switchery.min.js" />);


//result.bodyBottom.push(<script key="nn223" src="https://storage.googleapis.com/files.alumnibaseapp.com/assets/echarts.min.js" />);

result.bodyBottom.push(<script key="new2" type="text/javascript" src="https://files.alumnibaseapp.com/assets/echarts-uk-map-data.js" />);


export default result;
