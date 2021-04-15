/*
 * Copyright (c) 2021 Gobierno de España
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store.js';
import VueI18n from 'vue-i18n';
import esLocale from './locale/es';

Vue.config.productionTip = false;

Vue.use(VueI18n);

let arrayLocaleBack;
let messagesBack = {};
let localeParam = 'es-ES';
let locationParam = '';

store.dispatch('actionGetLocaleTexts').then(resp => {
  if (resp && resp.data) {
    arrayLocaleBack = resp.data;
  }
}).finally(() => {
  if (!arrayLocaleBack || arrayLocaleBack.length === 0) {
    configDefault();
    return;
  }
  if (location && location.search !== '' && location.search.split('?')[1] !== '' && location.search.split('?')[1].split('=')[1]) {
    locationParam = location.search.split('?')[1].split('=')[1];
  }
  const locale = (arrayLocaleBack.find(l => l.id.toLowerCase() === locationParam.toLowerCase())) ? arrayLocaleBack.find(l => l.id.toLowerCase() === locationParam.toLowerCase()) : arrayLocaleBack.find(l => l.id.toLowerCase() === localeParam.toLowerCase());
  if (!locale) {
    configDefault();
    return;
  }
  const id = locale.id;
  store.dispatch('actionGetTexts', {locale: id}).then(resp => {
    if (resp && resp.data) {
      messagesBack[id.split('-')[0]] = resp.data;
    }
  }).finally(() => {
    if (Object.keys(messagesBack).length > 0) {
      localeParam = id.split('-')[0];
      initApp(messagesBack);
    } else {
      initApp({es: esLocale});
    }
  });
});

function configDefault () {
  localeParam = 'es';
  initApp({es: esLocale});
}

function initApp (messages) {
  // Create VueI18n instance with options
  const i18n = new VueI18n({
    locale: localeParam, // set locale
    messages // set locale messages
  });
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: {App},
    template: '<App/>'
  });
}
