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
  <div class="verification-code-created">
    <div class="content" :style="{'justify-content': !verificationCode ? 'center' : 'space-between'}">
      <template v-if="verificationCode">
        <span class="title">{{ $t('WEB_VERIFICATION_CODE_CREATED_TITLE') }}</span>
        <div class="code-box">
          <span class="code-box-title">{{ $t('WEB_VERIFICATION_CODE_CREATED_CODE_BOX_TITLE') }}</span>
          <div class="code-copy">
            <span id="text-code">{{ verificationCode }}</span>
            <button class="button-copy-text" @click="setCopyToClipboard"><img src="../../assets/images/copy.svg" alt="icon copy"></button>
          </div>
          <span class="code-box-msg">{{ $t('WEB_VERIFICATION_CODE_CREATED_CODE_BOX_MESSAGE') }}</span>
        </div>
      </template>
      <button class="button-accept" @click="setCreateNewCode">{{
          $t('WEB_VERIFICATION_CODE_CREATED_BUTTON_ACCEPT')
        }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerificationCodeCreated',
  props: ['verificationCode'],
  data () {
    return {};
  },
  mounted () {
    if (!this.$store.getters.getToken && !this.$store.getters.getUserLogged) {
      this.$emit('notLogin');
    }
  },
  methods: {
    setCreateNewCode () {
      this.$emit('acceptCreateNewCode');
    },
    setCopyToClipboard () {
      const codeCopy = document.getElementById('text-code');
      const selection = document.createRange();
      if (codeCopy && selection) {
        selection.selectNodeContents(codeCopy);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(selection);
        document.execCommand('copy');
        window.getSelection().removeRange(selection);
        this.setNotification();
      }
    },
    setNotification () {
      const notification = document.getElementById('notification');
      if (notification) {
        notification.style.display = 'flex';
        setTimeout(() => {
          notification.style.display = 'none';
        }, 500);
      }
    }
  }
};
</script>

<style scoped>
.verification-code-created {
  width: 100%;
  height: 92%;
  z-index: 3;
  overflow: hidden;
}

.verification-code-created .content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.verification-code-created .content .code-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 55%;
  width: 100%;
  border-radius: 8px;
  background-color: #EAE8F0;
}

.verification-code-created .content .code-box .code-box-title {
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
  text-align: center;
}

.verification-code-created .content .code-box .code-copy {
  display: flex;
  align-items: center;
  justify-content: center;
}

.verification-code-created .content .code-box .code-copy > span {
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 35px;
  text-align: center;
  margin-right: 12px;
}

.verification-code-created .content .code-box .code-copy > img {
  cursor: pointer;
}

.verification-code-created .content .code-box .code-copy .button-copy-text {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent !important;
  border: none !important;
}

.verification-code-created .content .code-box .code-box-msg {
  max-width: 240px;
  color: #000000;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 20px;
  text-align: center;
}

@media (min-width: 1024px) {
  .verification-code-created {
    width: 89%;
    height: 75.5%;
    margin-top: 50px;
  }
}

@media (min-width: 1280px) {
  .verification-code-created {
    height: 63%;
    width: 73%;
    margin-top: 36px;
  }
}

@media (min-width: 1280px) and (max-height: 610px) {
  .verification-code-created {
    height: 88%;
  }
}

@media (min-width: 1440px) {
  .verification-code-created {
    height: 67%;
    width: 64%;
  }
}

@media (min-width: 1920px) {
  .verification-code-created {
    height: 59%;
    width: 46.5%;
  }
}

@media (orientation: portrait) {
  .verification-code-created {
    height: 97%;
    width: 97%;
  }

  @media (min-width: 768px) {
    .verification-code-created {
      height: 57%;
    }

    .verification-code-created .content .code-box, .button-accept {
      width: 70%;
      align-self: center;
    }
  }

  @media (min-width: 1024px) {
    .verification-code-created {
      height: 40%;
      margin: 0;
    }
  }
}
</style>
