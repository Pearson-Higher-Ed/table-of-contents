import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import tsLocaleData from 'react-intl/locale-data/ts';

const localeData = {
  en: enLocaleData,
  fr: frLocaleData,
  ts: tsLocaleData
};

function init() {
  const sampleList = {};
  sampleList.author = 'Charles Dickens';
  sampleList.mainTitle = 'Tree View';
  sampleList.thumbnail = 'http://content.stg-openclass.com/eps/pearson-reader/api/item/4eaf188e-1798-446b-b382-90a0c6da6629/1/file/cover_thumbnail.jpg';
  sampleList.list = [{
    'id':'p-1',
    'href': 'OPS/xhtml/file_0003.html',
    'title': 'Parent-1',
    children:[
      {
        'id':'c-1',
        'href': 'OPS/xhtml/file_0003_1.html',
        'title': 'child-1',
        children:[
          {
            'id':'c-1-1',
            'href': 'OPS/xhtml/file_0003_1-1.html',
            'title': 'grandchild-1',
            children:[
              {
                'id':'c-1-1-1',
                'href': 'OPS/xhtml/file_0003_1-1-1.html',
                'title': 'great-grandchild-1',
                children:[
                  {
                    'id':'c-1-1-1-1',
                    'href': 'OPS/xhtml/file_0003_1-1-1-1.html',
                    'title': 'great-great-grandchild-1'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'id':'c-2',
        'href': 'OPS/xhtml/file_0003_2.html',
        'title': 'Child-2'
      }
    ]
  }, {
    'id':'p-2',
    'href': 'OPS/xhtml/file_0005.html',
    'title': 'Parent-2',
    children:[]
  }];

  function getParam(item) {
    const svalue = location.search.match(new RegExp('[\?\&]' + item + '=([^\&]*)(\&?)', 'i'));
    return svalue ? svalue[1] : svalue;
  }

  function clickHandler() {
    alert();
  }
  const locale = getParam('lang') || 'en';
  addLocaleData(localeData[locale]);
  // Demo eventing API
  document.body.dispatchEvent(new CustomEvent('o.InitToc', {
    detail: {
      elementId: 'demo-target1',
      depth: 5,
      content: sampleList,
      childField: 'children',
      cbk: clickHandler,
      showDuplicateTitle:false,
      separateToggleIcon: true,
      locale
    }
  }));
}

window.onload = init();
