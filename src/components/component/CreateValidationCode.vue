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
  <div class="create-validation-code">
    <form
      id="validate-code"
      @submit="checkForm"
    >
      <span class="title">{{ $t('WEB_CREATE_VALIDATION_CODE_TITLE') }}</span>
      <div class="date-and-time-content">
        <div class="date">
          <div class="div-input">
            <label for="startDate">{{ $t('WEB_CREATE_VALIDATION_CODE_START_DATE') }}</label>
            <date-picker @blur="setOnBlurDatePicker('startDate')" id="startDate" v-model="form.startDate" :lang="lang"
                         valueType="format" type="date" format="DD/MM/YYYY" placeholder="dd/mm/yyyy"
                         :disabled-date="setLimitationsOfFourteenDays">
              <i slot="icon-calendar">
                <img src="../../assets/images/date_icon.svg" alt="date_icon">
              </i>
            </date-picker>
            <div>
              <span class="error" v-if="validateForm.startDate === 'incorrect'">{{
                  $t('WEB_CREATE_VALIDATION_CODE_ERROR_START_DATE')
                }}</span>
            </div>
          </div>
          <div class="div-input">
            <label for="startTime">{{ $t('WEB_CREATE_VALIDATION_CODE_START_TIME') }}</label>
            <date-picker @blur="setOnBlurDatePicker('startTime')" id="startTime" v-model="form.startTime"
                         valueType="format"
                         type="time" format="HH:mm" placeholder="hh:mm">
              <i slot="icon-calendar">
                <img src="../../assets/images/clock_icon.svg" alt="clock_icon">
              </i>
            </date-picker>
            <div>
              <span class="error" v-if="validateForm.startTime === 'incorrect'">{{
                  $t('WEB_CREATE_VALIDATION_CODE_ERROR_START_TIME')
                }}</span>
            </div>
          </div>
        </div>
        <div class="date">
          <div class="div-input">
            <label for="endDate">{{ $t('WEB_CREATE_VALIDATION_CODE_END_DATE') }}</label>
            <date-picker @blur="setOnBlurDatePicker('endDate')" id="endDate" v-model="form.endDate" :lang="lang"
                         valueType="format" type="date" format="DD/MM/YYYY" placeholder="dd/mm/yyyy"
                         :disabled-date="setLimitationsOfFourteenDays">
              <i slot="icon-calendar">
                <img src="../../assets/images/date_icon.svg" alt="date_icon">
              </i>
            </date-picker>
            <div>
              <span class="error"
                    v-if="validateForm.endDate === 'incorrect'">{{
                  $t('WEB_CREATE_VALIDATION_CODE_ERROR_END_DATE')
                }}</span>
            </div>
          </div>
          <div class="div-input">
            <label for="endTime">{{ $t('WEB_CREATE_VALIDATION_CODE_END_TIME') }}</label>
            <date-picker @blur="setOnBlurDatePicker('endTime')" id="endTime" v-model="form.endTime" valueType="format"
                         type="time" format="HH:mm" placeholder="hh:mm">
              <i slot="icon-calendar">
                <img src="../../assets/images/clock_icon.svg" alt="clock_icon">
              </i>
            </date-picker>
            <div>
              <span class="error"
                    v-if="validateForm.endTime === 'incorrect'">{{
                  $t('WEB_CREATE_VALIDATION_CODE_ERROR_END_TIME')
                }}</span>
            </div>
          </div>
        </div>
        <div class="div-input">
          <label for="name">{{ $t('WEB_CREATE_VALIDATION_CODE_NAME') }}</label>
          <input @blur="setValidate('name')" id="name" v-model="form.name" type="text"
                 name="name" :placeholder="$t('WEB_CREATE_VALIDATION_CODE_NAME_PLACEHOLDER')" maxlength="200">
          <div>
            <span class="icon-check" :class="validateForm.name"></span>
            <span class="error" v-if="validateForm.name === 'incorrect'">{{
                $t('WEB_CREATE_VALIDATION_CODE_ERROR_NAME')
              }}</span>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button type="button" class="button-cancel" @click="setCancel">{{
            $t('WEB_CREATE_VALIDATION_CODE_BUTTON_CANCEL')
          }}
        </button>
        <button class="button-accept" type="submit">{{ $t('WEB_CREATE_VALIDATION_CODE_BUTTON_ACCEPT') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import {getDecodeToken} from '../../../services/settings';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/es';

export default {
  name: 'CreateValidationCode',
  components: {DatePicker},
  data () {
    return {
      form: {
        startDate: undefined,
        endDate: undefined,
        startTime: undefined,
        endTime: undefined,
        name: undefined
      },
      validateForm: {
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        name: ''
      },
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      }
    };
  },
  mounted () {
    if (!this.$store.getters.getToken && !this.$store.getters.getUserLogged) {
      this.$emit('notLogin');
      return;
    }
    this.setLimitationsOfFourteenDays();
  },
  methods: {
    checkForm (e) {
      if (e) e.preventDefault();
      let validate = true;
      for (let formKey in this.form) {
        if (!this.setValidate(formKey)) {
          validate = false;
        }
      }
      if (validate) {
        if (this.getStartDateLessThanEndDate()) {
          this.form = {
            startDate: undefined,
            endDate: undefined,
            startTime: undefined,
            endTime: undefined,
            name: this.form.name
          };
          this.checkForm();
          return false;
        }
        this.setCreateValidationCode();
        return true;
      } else {
        return false;
      }
    },
    setOnBlurDatePicker (key) {
      setTimeout(() => {
        this.setValidate(key);
      }, 100);
    },
    setValidate (key) {
      if (!this.form[key] || this.form[key].toString().trim() === '' || (key === 'name' && this.setValidateNameEstablishment())) {
        this.validateForm[key] = 'incorrect';
        return false;
      }
      this.validateForm[key] = 'correct';
      return true;
    },
    setValidateNameEstablishment () {
      const regExpStartWithSpace = /(^\s)/;
      const regExpSpecialCharacterFollowedBySymbol = /(\W[äÄëËïÏöÖüÜáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ])|([äÄëËïÏöÖüÜáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ]\W)/;
      const regExpDoubleFollowedSymbol = /(\W\W)/;
      const regExpSymbolFollowedSpaceFollowedSymbol = /(\W\s\W)/;
      if (!this.form.name || regExpStartWithSpace.test(this.form.name) || regExpSymbolFollowedSpaceFollowedSymbol.test(this.form.name)) return true;
      for (let intI = 0; intI < this.form.name.toString().length; intI++) {
        let validateText = this.form.name.toString().substr(intI, 2).trim();
        if (validateText.length > 1 && regExpDoubleFollowedSymbol.test(validateText) && !regExpSpecialCharacterFollowedBySymbol.test(validateText)) return true;
      }
      return false;
    },
    setCancel () {
      this.$emit('acceptOrCancelCreateValidationCode');
    },
    setCreateValidationCode () {
      const payload = {
        ccaa: getDecodeToken(this.$store.getters.getToken).ccaa,
        startTime: this.getDateTime(this.form.startDate, this.form.startTime),
        endTime: this.getDateTime(this.form.endDate, this.form.endTime),
        venue: this.form.name
      };
      this.$store.commit('setLoading', true);
      this.$store.dispatch('actionPostCaseCode', payload).then(resp => {
        let code;
        if (resp && resp.data) {
          code = resp.data.caseCode;
        }
        this.$emit('acceptOrCancelCreateValidationCode', code);
      }).catch(console.error).finally(() => {
        this.$store.commit('setLoading', false);
      });
    },
    setLimitationsOfFourteenDays (date) {
      const dateNow = new Date();
      const fourteenDaysInMilliseconds = 1000 * 60 * 60 * 24 * 14;
      const subtractFourteenDays = dateNow.getTime() - fourteenDaysInMilliseconds;
      const dateSubtractFourteenDays = new Date(subtractFourteenDays);

      return date < dateSubtractFourteenDays || date > dateNow;
    },
    getDateTime (date, time) {
      const dateSplit = date.split('/');
      const timeSplit = time.split(':');
      return new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[0]), parseInt(timeSplit[0]), parseInt(timeSplit[1])).getTime();
    },
    getStartDateLessThanEndDate () {
      return this.getDateTime(this.form.startDate, this.form.startTime) >= this.getDateTime(this.form.endDate, this.form.endTime);
    }
  }
};
</script>

<style scoped>
.create-validation-code {
  width: 100%;
  height: 92%;
  z-index: 3;
  overflow: hidden;
}

.create-validation-code form .date-and-time-content {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 50%;
  overflow: auto;
}

.create-validation-code form .date-and-time-content > .div-input input {
  min-width: 315px;
}

.create-validation-code form .date, .buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 21px;
}

.create-validation-code form .date .div-input {
  display: grid;
  grid-template-rows: auto auto 16px;
  justify-content: normal;
}

.create-validation-code form .date .div-input input {
  padding: 0 5px 0 12px;
  min-width: 155px;
}

.create-validation-code form .date .div-input .error {
  top: -5px;
}

.create-validation-code form .date .div-input .mx-datepicker {
  width: auto;
}

@media (min-width: 1024px) {
  .create-validation-code {
    height: 85.5%;
    width: 95%;
    margin-top: 50px;
  }

  .create-validation-code form .date-and-time-content {
    height: auto;
    overflow: hidden;
  }
}

@media (min-width: 1280px) {
  .create-validation-code {
    height: 67.5%;
    width: 76%;
    margin-top: 36px;
  }
}

@media (min-width: 1280px) and (max-height: 610px) {
  .create-validation-code {
    height: 97%;
    width: 80%;
    margin-top: 0
  }

  .create-validation-code form .date-and-time-content {
    height: 72%;
    overflow: auto;
  }
}

@media (min-width: 1440px) {
  .create-validation-code {
    height: 72.5%;
    width: 67%;
  }
}

@media (min-width: 1920px) {
  .create-validation-code {
    height: 63.5%;
    width: 48%;
  }
}

@media (max-height: 675px) {
  .create-validation-code form .date-and-time-content {
    overflow: auto;
  }
}

@media (orientation: portrait) {
  .create-validation-code {
    height: 85%;
    width: 97%;
  }

  .create-validation-code form .date-and-time-content, .buttons {
    width: 70%;
    align-self: center;
  }

  @media (min-width: 768px) {
    .create-validation-code {
      height: 60%;
    }

    .create-validation-code form .date-and-time-content {
      height: 70%;
      overflow: hidden;
    }
  }

  @media (min-width: 1024px) {
    .create-validation-code {
      height: 45%;
      margin: 0;
    }
  }
}
</style>
