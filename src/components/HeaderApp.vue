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
  <div class="header-app">
    <div class="header-app-content">
      <img class="img-logo-app" src="../assets/images/logo_app.svg" alt="logo">
      <div class="user-logged" v-if="mapGetUserLogged">
        <template v-if="nameUserLogged && shorNameUserLogged">
          <div class="avatar">
            <span>{{ shorNameUserLogged }}</span>
          </div>
          <span>{{ nameUserLogged }}</span>
          <span class="line"></span>
        </template>
        <span @click="setSignOut">{{ $t('WEB_HEADER_SIGN_OUT') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'HeaderApp',
  data () {
    return {
      nameUserLogged: undefined,
      shorNameUserLogged: undefined
    };
  },
  computed: {
    ...mapGetters({
      mapGetUserLogged: 'getUserLogged'
    })
  },
  watch: {
    mapGetUserLogged: function (value) {
      if (value) {
        this.setNameAndShortNameUserLogged(value);
      } else {
        this.nameUserLogged = undefined;
        this.shorNameUserLogged = undefined;
      }
    }
  },
  methods: {
    setNameAndShortNameUserLogged (user) {
      let name = '';
      let shorName = '';
      if (user.name) {
        name = user.name;
        shorName = user.name.charAt(0);
      }
      if (user.surname) {
        name += ' ' + user.surname;
        shorName += user.surname.charAt(0);
      }
      this.nameUserLogged = name;
      this.shorNameUserLogged = shorName;
    },
    setSignOut () {
      this.$store.commit('setUserLogged', undefined);
    }
  }
};
</script>

<style scoped>
.header-app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  background: linear-gradient(135deg, #8682C4 0%, #FAF9F7 100%);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.header-app .header-app-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 88%;
  overflow: hidden;
}

.header-app .header-app-content .user-logged {
  display: flex;
  align-items: center;
}

.header-app .header-app-content .user-logged .avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background-color: #65498D;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  margin-right: 16px;
}

.header-app .header-app-content .user-logged .avatar > span {
  position: relative;
  top: -1px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 13px;
  text-align: center;
}

.header-app .header-app-content .user-logged .line {
  box-sizing: border-box;
  height: 27px;
  width: 1px;
  border: 1px solid #000000;
  opacity: 0.5;
}

.header-app .header-app-content .user-logged > span {
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 20px;
  text-align: right;
  margin-right: 16px;
}

.header-app .header-app-content .user-logged > span:last-child {
  margin-right: 0;
}

.header-app .header-app-content .user-logged > span:last-child {
  cursor: pointer;
}

@media (min-width: 1024px) {
  .header-app .header-app-content {
    width: 90%;
  }
}

@media (min-width: 1280px) {
  .header-app .header-app-content {
    width: 85%;
  }

  .header-app .header-app-content .user-logged {
    margin-right: 58px;
  }
}

@media (min-width: 1440px) {
  .header-app .header-app-content {
    width: 75%;
  }

  .header-app .header-app-content .user-logged {
    margin-right: 32px;
  }
}

@media (min-width: 1920px) {
  .header-app .header-app-content {
    width: 53%;
  }

  .header-app .header-app-content .user-logged {
    margin-right: 0;
  }
}
</style>
