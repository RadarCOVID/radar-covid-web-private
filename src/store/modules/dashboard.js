/*
 * Copyright (c) 2021 Gobierno de España
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import {getBasicAuthorization, HTTP} from '../../../services/settings';

// state
const state = {
  loading: false,
  token: undefined,
  userLogged: undefined,
  isMobileOrTabletOrientationPortrait: false,
  textNotification: undefined
};

// getters
const getters = {
  getLoading: (state) => {
    return state.loading;
  },
  getToken: (state) => {
    return state.token;
  },
  getUserLogged: (state) => {
    return state.userLogged;
  },
  getIsMobileOrTabletOrientationPortrait: (state) => {
    return state.isMobileOrTabletOrientationPortrait;
  },
  getTextNotification: (state) => {
    return state.textNotification;
  }
};

// actions
const actions = {
  actionGetTexts ({commit}, data) {
    let url = `configuration/texts?locale=${data.locale}&platform=Web&version=1.0.0&application=PrivateQR`;
    return HTTP.get(url);
  },
  actionGetLocaleTexts () {
    let url = 'configuration/masterData/locales?locale=es-ES&platform=Web&version=1.0.0';
    return HTTP.get(url);
  },
  actionPostLogin ({commit}, data) {
    let header = {Authorization: getBasicAuthorization()};
    let url = 'authentication/login';
    return HTTP.post(url, data, {headers: header});
  },
  actionPostForgot ({commit}, data) {
    let header = {Authorization: getBasicAuthorization()};
    let url = 'authentication/forgot';
    return HTTP.post(url, data, {headers: header});
  },
  actionPostCaseCode ({commit}, data) {
    let header = {Authorization: 'Bearer ' + state.token};
    let url = 'notifyme/v1/casecode';
    return HTTP.post(url, data, {headers: header});
  }
};

// mutations
const mutations = {
  setLoading (state, payload) {
    state.loading = payload;
  },
  setToken (state, payload) {
    state.token = payload;
  },
  setUserLogged (state, payload) {
    state.userLogged = payload;
  },
  setIsMobileOrTabletOrientationPortrait (state, payload) {
    state.isMobileOrTabletOrientationPortrait = payload;
  },
  setTextNotification (state, payload) {
    state.textNotification = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
