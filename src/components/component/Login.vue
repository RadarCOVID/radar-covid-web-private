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
  <div class="login">
    <form
      id="login"
      @submit="checkForm"
    >
      <span class="title">{{ $t('WEB_LOGIN_TITLE') }}</span>
      <div class="user-and-password-content">
        <div class="div-input"
             :style="{'margin-bottom': (validateForm.classEmail === 'incorrect') ? '0' : (validateForm.classEmail === 'correct') ? '12px' : '32px'}">
          <label for="email">{{ $t('WEB_LOGIN_EMAIL') }}</label>
          <input @blur="setValidate('email')" id="email" v-model="valueEmail" type="email" name="email"
                 :placeholder="$t('WEB_LOGIN_EMAIL_PLACEHOLDER')">
          <span class="icon-check" :class="validateForm.classEmail"></span>
          <span class="error" v-if="validateForm.classEmail === 'incorrect'">{{ $t('WEB_LOGIN_ERROR_EMAIL') }}</span>
        </div>
        <div class="div-input">
          <label for="password">{{ $t('WEB_LOGIN_PASSWORD') }}</label>
          <input @blur="setValidate('password')" id="password" v-model="valuePassword" type="password" name="password"
                 :placeholder="$t('WEB_LOGIN_PASSWORD_PLACEHOLDER')">
          <span class="icon-check" :class="validateForm.classPassword"></span>
          <span class="error"
                v-if="validateForm.classPassword === 'incorrect'">{{ $t('WEB_LOGIN_ERROR_PASSWORD') }}</span>
        </div>
      </div>
      <button class="button-accept" type="submit">{{ $t('WEB_LOGIN_BUTTON_ACCEPT') }}</button>
      <!--      <span class="forgot" @click="setForgotPassword">{{ $t('WEB_LOGIN_FORGOT_PASSWORD') }}</span>-->
    </form>
  </div>
</template>

<script>
import {getDecodeToken} from '../../../services/settings';

export default {
  name: 'Login',
  data () {
    return {
      valueEmail: undefined,
      valuePassword: undefined,
      validateForm: {
        classEmail: '',
        classPassword: ''
      }
    };
  },
  methods: {
    checkForm (e) {
      e.preventDefault();
      const validateEmail = this.setValidate('email');
      const validatePassword = this.setValidate('password');
      if (validateEmail && validatePassword) {
        this.setLogin();
        return true;
      }
    },
    setValidate (key) {
      switch (key) {
      case 'email':
        if (!/^([\da-z_.-]+)@([\da-z.-]+)\.([a-z]{2,6})$/.test(this.valueEmail)) {
          this.validateForm.classEmail = 'incorrect';
          return false;
        }
        this.validateForm.classEmail = 'correct';
        return true;
      case 'password':
        if (!this.valuePassword || this.valuePassword.trim() === '') {
          this.validateForm.classPassword = 'incorrect';
          return false;
        }
        this.validateForm.classPassword = 'correct';
        return true;
      }
    },
    setLogin () {
      this.$store.commit('setLoading', true);
      this.$store.dispatch('actionPostLogin', {email: this.valueEmail, password: this.valuePassword}).then(resp => {
        if (resp && resp.data && resp.data.token) {
          this.$store.commit('setToken', resp.data.token);
          this.$store.commit('setUserLogged', getDecodeToken(resp.data.token));
          this.setDisconnectionTime();
          this.$emit('loginAccept');
        }
      }).catch(() => {
        this.validateForm.classEmail = 'incorrect';
        this.validateForm.classPassword = 'incorrect';
      }).finally(() => {
        this.$store.commit('setLoading', false);
      });
    },
    setForgotPassword () {
      if (this.setValidate('email')) {
        this.$store.commit('setLoading', true);
        this.$store.dispatch('actionPostForgot', {email: this.valueEmail}).then().catch(() => {
          this.validateForm.classEmail = 'incorrect';
        }).finally(() => {
          this.$store.commit('setLoading', false);
        });
      }
    },
    setDisconnectionTime () {
      const msExp = 6 * 3.6e+6;
      setTimeout(() => {
        this.$store.commit('setUserLogged', undefined);
      }, msExp);
    }
  }
};
</script>

<style scoped>
.login {
  width: 97%;
  height: 90%;
  z-index: 3;
  overflow: hidden;
}

.login form .user-and-password-content {
  height: 45%;
  overflow: auto;
}

.login form .button-accept {
  margin-top: 16px;
}

.login form .forgot {
  color: #65498D;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 20px;
  text-align: right;
  cursor: pointer;
  text-decoration: underline;
}

@media (min-width: 1024px) {
  .login {
    height: 74%;
    width: 89%;
    margin: 50px 0;
  }

  .login form .user-and-password-content {
    height: auto;
    overflow: hidden;
  }
}

@media (min-width: 1280px) {
  .login {
    height: 63%;
    width: 73%;
    margin: 36px 0;
  }
}

@media (min-width: 1280px) and (max-height: 610px) {
  .login {
    height: 90%;
    width: 73%;
    margin: 0;
  }

  .login form .user-and-password-content {
    height: 60%;
  }
}

@media (min-width: 1440px) {
  .login {
    height: 66%;
    width: 63.5%;
  }
}

@media (min-width: 1920px) {
  .login {
    height: 58%;
    width: 46%;
  }
}

@media (max-height: 675px) {
  .login form .user-and-password-content {
    overflow: auto;
  }
}

@media (orientation: portrait) {
  .login {
    height: 70%;
    width: 97%;
  }

  .login form .user-and-password-content {
    height: auto;
    width: 70%;
    align-self: center;
  }

  .login form .user-and-password-content, .button-accept {
    width: 70%;
    align-self: center;
  }

  @media (min-width: 768px) {
    .login {
      height: 50%;
    }

    .login form .user-and-password-content {
      height: auto;
      overflow: hidden;
    }
  }

  @media (min-width: 1024px) {
    .login {
      height: 35%;
      margin: 0;
    }
  }
}
</style>
