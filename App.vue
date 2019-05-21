<template>
  <default-layout :loading="status.loading" />
</template>

<script>
import React from "react";
import { AppState , Platform , NativeModules } from 'react-native';
import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";

import { Database } from "./src/class/Database";
import { TaskManager } from "./src/class/TaskManager";

import DefaultLayout from "./src/layouts/default";

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(VueNativeBase);

//inject locales
let langRegionLocale = "en_US";
if (Platform.OS === "android") {
  langRegionLocale = NativeModules.I18nManager.localeIdentifier || "en_US";
} else if (Platform.OS === "ios") {
  langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "en_US";
}
let locale = langRegionLocale.substring(0, 2);
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
_handleAppStateChange("initialize")
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
