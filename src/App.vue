<!--/*-->
<!--* Copyright (c) 2021 Gobierno de España-->
<!--*-->
<!--* This Source Code Form is subject to the terms of the Mozilla Public-->
<!--* License, v. 2.0. If a copy of the MPL was not distributed with this-->
<!--* file, You can obtain one at https://mozilla.org/MPL/2.0/.-->
<!--*-->
<!--* SPDX-License-Identifier: MPL-2.0-->
<!--*/-->

<template>
  <div id="app">
    <header-app></header-app>
    <router-view/>
    <footer-app></footer-app>
  </div>
</template>

<script>
import HeaderApp from './components/HeaderApp';
import FooterApp from './components/FooterApp';

export default {
  name: 'App',
  components: {FooterApp, HeaderApp}
};
</script>

<style>
@font-face {
  font-family: "Muli";
  src: local("Muli"),
  url(./assets/fonts/Muli/Muli.ttf) format("truetype");
}

html,
body, #app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: "Muli", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-kerning: none;
  margin: 0;
  padding: 0;
}

form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.title {
  color: #65498D;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 36px;
}

form .div-input {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

form .div-input label {
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 24px;
  margin-bottom: 8px;
}

form .div-input input {
  height: 40px;
  border: 1px solid #65498D !important;
  border-radius: 8px;
  background-color: #FFFFFF;
  color: #575756;
  font-family: "Muli", sans-serif !important;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
  padding: 0 40px 0 12px;
  outline: none;
}

form .div-input .error {
  position: relative;
  top: -16px;
  color: #65498D;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 15px;
  white-space: nowrap;
}

form input[type="time"]::-webkit-calendar-picker-indicator {
  background: url('./assets/images/clock_icon.svg') no-repeat 2px;
  cursor: pointer;
}

form input[type="date"]::-webkit-calendar-picker-indicator {
  background: url('./assets/images/date_icon.svg') no-repeat 2px;
  cursor: pointer;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background 5000s ease-in-out 0s;
}

form .icon-check {
  position: relative;
  top: -31px;
  right: calc(-100% + 20px + 10px);
  display: none;
  height: 20px;
  width: 20px;
  background-color: transparent;
}

form .correct {
  display: flex;
  background: url('./assets/images/check.svg') no-repeat;
}

form .incorrect {
  display: flex;
  background: url('./assets/images/check_rejected.svg') no-repeat;
}

.button-accept {
  box-sizing: border-box;
  height: 40px !important;
  border: 1px solid #65498D;
  border-radius: 8px;
  background-color: #65498D !important;
  box-shadow: 0 2px 4px 0 rgba(124, 121, 121, 0.2);
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
  outline: none;
  cursor: pointer;
}

form .button-cancel {
  background-color: transparent !important;
  box-sizing: border-box;
  height: 40px;
  border: 1px solid #65498D;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(124, 121, 121, 0.2);
  color: #65498D;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
  outline: none;
  cursor: pointer;
}
</style>
