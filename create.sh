#!/bin/bash
if [ $# -eq 0 ]
  then
    echo "Need <ProjectName>"
    exit;
fi
react-native init $1
cd $1
npm install --save vue-native-core vue-native-helper
npm install --savedev vue-native-scripts
npm add @babel/runtime
npm install
npm install --save vue-native-router
npm install --save native-base
npm install --save react-native-gesture-handler
npm install --save i18n-js
npm install --save react-native-sqlite-storage
npm install --save @types/react-native-sqlite-storage
npm install --save react-navigation
rm -rf node_modules/@react-navigation/native/node_modules/react-native-safe-area-view/.git
rm -rf node_modules/react-native-safe-area-view/.git
react-native link
mv ./App.vue ./$1
mv ./src ./$1
mv ./native-base-theme ./$1
mv ./rn-cli.config.js ./$1
mv ./tsconfig.json ./$1
mv ./vueTransformerPlugin.js ./$1
mv ./metro.config.js ./$1
rm $1/App.js
