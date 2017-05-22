import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { InternationalSupport } from '@pearson-incubator/aquila-js-core';
import ComponentOwner from './src/js/component-owner';
import './main.scss';
import msgObject from './translations';


export default class TableOfContentsDemo {
  constructor(config) {
    this.init(config);
  }

  init(config) {
    this.intlObj = new InternationalSupport(msgObject, config.locale);

    ReactDOM.render(
      <IntlProvider locale={this.intlObj.getLocale()} messages={this.intlObj.getMessages()}>
        <ComponentOwner
          data={config}
          locale={config.locale}
        />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

export { TableOfContentsComponent } from './src/js/TableOfContentsComponent';

document.body.addEventListener('o.InitToc', e => new TableOfContentsDemo(e.detail));
