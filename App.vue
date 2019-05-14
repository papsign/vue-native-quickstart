<template>
  <default-layout :loading="status.loading" />
</template>

<script>
import React from "react";
import { AppState , NativeModules } from 'react-native';
import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";

import { Database } from "./src/class/Database";
import { TaskManager } from "./src/class/TaskManager";

import DefaultLayout from "./src/layouts/default";


Vue.use(VueNativeBase);

//inject locales
let locale = 'en'
if (NativeModules.I18nManager.localeIdentifier) {
  const i18nLocale = NativeModules.I18nManager.localeIdentifier;
  locale = i18nLocale.split('_')[0];
}
var i18n = require("i18n-js");
import { languages , defaultLocale } from './src/locales/index.js'
i18n.locale = locale;
i18n.defaultLocale = defaultLocale;
i18n.translations = languages;
Vue.prototype.$t = function(){return i18n.t(...arguments)}

//inject database
const database = new Database();
Vue.prototype.$db = database
//inject tasks
const tasks = new TaskManager();
Vue.prototype.$tasks = tasks

const _status = {loading:true};
function _handleAppStateChange(nextAppState) {
  console.log("->state "+nextAppState)
  if (nextAppState.match(/inactive|background/)) {
      _status.loading = true;
      //Stop and clean task manager
      tasks.stop();
      //Stop database
      database.close();
      //Clean or stop some SDK
      //
  }else{
      _status.loading = true;
      //Start database
      database.open()
      .then(() => {
        _status.loading = false;
      })
      .catch((e) => {
        console.error("Database error (check linkage) "+e)
      })

  }
}
AppState.removeEventListener('change', _handleAppStateChange);
AppState.addEventListener('change', _handleAppStateChange);

export default {
  components: { 
    'default-layout' : DefaultLayout,
  },
  mounted(){
  },
  data: function() {
    return {
      status: _status
    }
  },
}
</script>
