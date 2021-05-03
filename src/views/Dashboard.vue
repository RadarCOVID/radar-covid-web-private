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
  <div class="dashboard">
    <div class="content">
      <information-box :step="step"></information-box>
      <login v-if="step === 1" @loginAccept="step = 2"></login>
      <create-validation-code v-if="step === 2"
                              @acceptOrCancelCreateValidationCode="setAcceptOrCancelCreateValidationCode"
                              @notLogin="setNoLogin"></create-validation-code>
      <verification-code-created v-if="step === 3" :verificationCode="verificationCode" :nameEstablishment="nameEstablishment"
                                 @acceptCreateNewCode="setAcceptCreateNewCode"
                                 @notLogin="setNoLogin"></verification-code-created>
    </div>
    <div class="background"></div>
    <div v-if="mapGetLoading" id="loading"></div>
    <div class="notification" v-if="mapGetTextNotification">
      <span>{{ mapGetTextNotification }}</span>
      <img id="notification-close" src="../assets/images/close.svg" alt="close" @click="closedNotification">
    </div>
  </div>
</template>

<script>
import InformationBox from '../components/component/InformationBox';
import Login from '../components/component/Login';
import CreateValidationCode from '../components/component/CreateValidationCode';
import VerificationCodeCreated from '../components/component/VerificationCodeCreated';
import {mapGetters} from 'vuex';

export default {
  name: 'Dashboard',
  components: {VerificationCodeCreated, CreateValidationCode, Login, InformationBox},
  data () {
    return {
      step: 1,
      verificationCode: undefined,
      nameEstablishment: undefined,
      isOrientationPortrait: false
    };
  },
  mounted () {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);
  },
  computed: {
    ...mapGetters({
      mapGetLoading: 'getLoading',
      mapGetUserLogged: 'getUserLogged',
      mapGetTextNotification: 'getTextNotification'
    })
  },
  watch: {
    mapGetUserLogged: function (value) {
      if (!value) {
        this.step = 1;
      }
    },
    mapGetTextNotification: function (value) {
      if (value) {
        setTimeout(() => {
          this.closedNotification();
        }, 3000);
      }
    }
  },
  methods: {
    setAcceptOrCancelCreateValidationCode (value) {
      if (value) {
        this.verificationCode = value.verificationCode;
        this.nameEstablishment = value.nameEstablishment;
      }
      this.step = 3;
    },
    setAcceptCreateNewCode () {
      this.verificationCode = undefined;
      this.nameEstablishment = undefined;
      this.step = 2;
    },
    setNoLogin () {
      this.verificationCode = undefined;
      this.nameEstablishment = undefined;
      this.step = 1;
    },
    windowResize () {
      setTimeout(() => {
        const body = document.querySelector('body');
        const windowHeight = window.innerHeight + 'px';
        const windowWidth = window.innerWidth + 'px';
        this.isOrientationPortrait = ('orientation' in screen) ? !window.screen.orientation.angle : Math.abs(window.orientation) !== 90;
        if (body) {
          body.style.minHeight = (this.getIsMobileOrTablet() && body.style.minWidth === windowWidth) ? body.style.minHeight : windowHeight;
          body.style.minWidth = windowWidth;
        }
        this.$store.commit('setIsMobileOrTabletOrientationPortrait', this.getIsMobileOrTablet() && this.isOrientationPortrait);
      }, 100);
    },
    getIsMobileOrTablet () {
      let userAgent = (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i))
      );
      return (userAgent !== undefined && userAgent !== null);
    },
    closedNotification () {
      this.$store.commit('setTextNotification', undefined);
    }
  },
  destroyed () {
    this.showNotification = false;
    window.removeEventListener('resize', this.windowResize);
  }
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: calc(100% - 80px - 63px);
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.dashboard .background {
  position: absolute;
  width: 100%;
  top: 80px;
  height: calc(100% - 80px - 63px);
  background-image: url("../assets/images/background_img_app.svg");
  background-size: 112%;
  background-repeat: no-repeat;
  background-position: center;
  background-position-y: 30.3px;
  overflow: hidden;
  z-index: 1;
}

.dashboard .content {
  width: calc(100% - 64px);
  height: calc(100% - 64px);
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  grid-gap: 32px;
  margin: 32px;
  align-items: center;
  overflow: hidden;
  z-index: 2;
}

#loading {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgba(192, 192, 192, 0.5);
}

.notification {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  align-items: center;
  grid-template-columns: auto 40px;
  height: 45px;
  background-color: #000000;
  color: #FFFFFF;
  font-weight: 600;
  text-align: center;
  z-index: 3;
}

.notification img {
  cursor: pointer;
}

@media screen and (min-width: 1024px) {
  .dashboard .content {
    grid-gap: 82px;
  }
}

@media screen and (min-width: 1280px) {
  .dashboard .content {
    grid-gap: 115px;
  }
}

@media (orientation: portrait) {
  .dashboard .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    grid-gap: 0;
  }
}
</style>
