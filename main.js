import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Toc from './src/js/table-of-contents.js';

import {addLocaleData, IntlProvider} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import frJson from './translations/fr.json';
const translations = {
  'fr' : frJson
};

export default class MyComponent {

  constructor(config) {

    addLocaleData(frLocaleData);
    this.init(config);
  }

  init(config) {

    const locale = config.locale ? config.locale : 'en';

    ReactDOM.render(
      <IntlProvider locale={locale} messages={translations[locale]}>
        <Toc data={config} />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }

}

document.body.addEventListener('o.InitMyComponent', e => new MyComponent(e.detail));
