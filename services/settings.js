/*
 * Copyright (c) 2021 Gobierno de España
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export const HTTP = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function getBasicAuthorization () {
  return 'Basic ' + btoa(process.env.AUTHORIZATION);
}

export function getDecodeToken (token) {
  return jwt_decode(token);
}
