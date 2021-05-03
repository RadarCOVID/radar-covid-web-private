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
  <div class="information-box" :class="{'information-box-close': !isOpenInformationBox}">
    <div class="title">
      <span>{{ $t(`WEB_INFORMATION_BOX_${tagInformationBox}_TITLE`) }}</span>
      <img src="../../assets/images/dropdown.svg" alt="dropdown" v-if="isOrientationPortrait" @click="isOpenInformationBox = !isOpenInformationBox">
    </div>
    <div class="list" :class="{'list-login': step === 1}" v-if="isOpenInformationBox && arrayInformationBox.length > 0">
      <div class="item" v-for="(text, index) of arrayInformationBox" :key="index">
        <div class="icon">
          <img src="../../assets/images/fill_ball.svg" alt="icon">
          <span>{{ index + 1 }}</span>
        </div>
        <span>{{ $t(`WEB_INFORMATION_BOX_${text}`) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  props: ['step'],
  name: 'InformationBox',
  data () {
    return {
      tagInformationBox: 'LOGIN',
      arrayInformationBox: [],
      isOrientationPortrait: false,
      isOpenInformationBox: true
    };
  },
  mounted () {
    this.setInfo(1);
  },
  computed: {
    ...mapGetters({
      mapGetIsMobileOrTabletOrientationPortrait: 'getIsMobileOrTabletOrientationPortrait'
    })
  },
  watch: {
    'step': function (value) {
      this.setInfo(value);
    },
    mapGetIsMobileOrTabletOrientationPortrait: function (value) {
      this.getOrientation(value);
    }
  },
  methods: {
    setInfo (value) {
      switch (value) {
      case 2: case 3:// Create validation code
        this.tagInformationBox = 'CREATE_VALIDATION_CODE';
        this.arrayInformationBox = [`${this.tagInformationBox}_TEXT1`, `${this.tagInformationBox}_TEXT2`, `${this.tagInformationBox}_TEXT3`, `${this.tagInformationBox}_TEXT4`];
        break;
      default: // Login
        this.tagInformationBox = 'LOGIN';
        this.arrayInformationBox = [`${this.tagInformationBox}_TEXT1`, `${this.tagInformationBox}_TEXT2`, `${this.tagInformationBox}_TEXT3`, `${this.tagInformationBox}_TEXT4`];
        break;
      }
    },
    getOrientation (value) {
      this.isOrientationPortrait = value;
      this.isOpenInformationBox = true;
    }
  }
};
</script>

<style scoped>
.information-box {
  width: 96%;
  height: 92%;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.18);
  justify-self: flex-end;
  z-index: 3;
  overflow: hidden;
}

.information-box .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 47px;
  margin: 16px 32px 0 32px;
}

.information-box .list {
  height: calc(100% - 48px - 94px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 16px 32px;
  overflow: auto;
}

.information-box .list-login {
  height: calc(100% - 48px - 47px);
}

.information-box .list .item {
  display: flex;
  align-items: center;
}

.information-box .list .item .icon {
  height: 30px;
  width: 30px;
  min-width: 30px;
  margin-right: 32px;
  overflow: hidden;
}

.information-box .list .item .icon >span {
  position: relative;
  top: -32px;
  left: 11px;
  color: #F8F7FA;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
}

.information-box .list .item >span {
  color: #000000;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 20px;
}

@media (min-width: 1024px) {
  .information-box .title {
    margin: 32px 32px 0 32px;
  }

  .information-box .list {
    height: calc(100% - 64px - 47px - 32px);
    margin: 32px;
    overflow: hidden;
  }
}

@media (min-width: 1280px) {
  .information-box {
    height: 73%;
    width: 89%;
  }
}

@media (min-width: 1280px) and (max-height: 610px){
  .information-box {
    height: 98%;
    width: 92%;
  }
}

@media (min-width: 1440px) {
  .information-box {
    height: 78%;
    width: 78%;
  }
}

@media (min-width: 1920px) {
  .information-box {
    height: 68.5%;
    width: 56.5%;
  }
}

@media (max-height: 675px) {
  .information-box .list {
    overflow: auto;
  }
}

@media (orientation: portrait) {
  .information-box {
    height: 97%;
    width: 97%;
    margin: 5px 0 32px 0;
  }

  .information-box .list {
    height: calc(100% - 48px - 47px);
  }

  .information-box-close {
    height: 82px !important;
  }

  .information-box-close img{
    transform: rotate(180deg);
  }

  @media (min-width: 768px) {
    .information-box {
      height: 55%;
      margin: 5px 0 40px 0;
    }

    .information-box .list {
      height: calc(100% - 78px - 47px);
      margin: 24px 32px;
      overflow: hidden;
    }
  }

  @media (min-width: 1024px) {
    .information-box {
      height: 40%;
    }

    .information-box-close {
      height: 90px !important;
    }

    .information-box .list {
      margin: 32px;
    }

    .information-box .title {
      margin: 20px 32px 0 32px;
    }
  }
}
</style>
