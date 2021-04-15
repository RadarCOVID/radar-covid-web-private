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
  <div class="footer-app">
    <span class="span-info">{{ $t('WEB_FOOTER_COPYRIGHT') }}</span>
  </div>
</template>

<script>
export default {
  name: 'FooterApp'
};
</script>

<style scoped>
.footer-app {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 63px;
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}

.footer-app .span-info {
  margin-left: 82px;
  color: #000000;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 18px;
}
</style>
