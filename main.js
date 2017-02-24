import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import enLocaleData from 'react-intl/locale-data/en';
import tsLocaleData from 'react-intl/locale-data/ts';
import frJson from './translations/fr.json';
import enJson from './translations/en.json';
import tsJson from './translations/pseudo.json';
 //import TableOfContents from './src/js/TableOfContents';
import ComponentOwner from './src/js/component-owner';
import './main.scss';

const translations = {
  'fr': frJson,
  'en': enJson,
  'ts': tsJson
};

export default class TableOfContentsComponent {
  constructor(config) {
    addLocaleData(frLocaleData);
    addLocaleData(enLocaleData);
    addLocaleData(tsLocaleData);
    this.init(config);
  }

  init(config) {
    const locale = config.locale ? config.locale : 'en';

    ReactDOM.render(
      <IntlProvider locale={locale} messages={translations[locale]}>
        <ComponentOwner data={config} />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

export TableOfContents from './src/js/TableOfContents';

document.body.addEventListener('o.InitToc', e => new TableOfContentsComponent(e.detail));
