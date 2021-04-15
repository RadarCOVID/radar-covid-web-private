/*
 * Copyright (c) 2021 Gobierno de España
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    /* 2-space indentation: https://eslint.org/docs/rules/indent */
    'indent': [
      'error',
      2
    ],
    /* UNIX end of lines: https://eslint.org/docs/rules/linebreak-style */
    'linebreak-style': [
      'error',
      'unix'
    ],
    /* Using single quotes for strings: https://eslint.org/docs/rules/quotes */
    'quotes': [
      'error',
      'single'
    ],
    /* Mandatory semicolon use: https://eslint.org/docs/rules/semi */
    'semi': [
      'error',
      'always'
    ]
  }
}
