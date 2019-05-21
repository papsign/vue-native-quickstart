# Vue Native Quickstart Template

## Installed Features :
- Vue Native (.vue file support)
- Internationalisation / I18n
- Native Base (with added configurable custom theme)
- Stack Navigation (react-navigation 3.0)
- Sqlite database (sqlite-storage)
- Axios https request

## Install 
`sh create.sh <ProjectName>`

### !!! Android users !!!
react-native-sqlite-storage must be installed manually, see https://github.com/andpor/react-native-sqlite-storage

## Android execution
```sh
react-native run-android
npm start -- --reset-cache
```

## Android build (unsigned)
```sh
cd android
./gradlew assembleRelease
```

## Tested versions
```json
{
  "dependencies": {
    "@types/react-native-sqlite-storage": "^3.3.1",
    "axios": "^0.18.0",
    "i18n-js": "^3.2.2",
    "native-base": "^2.12.1",
    "react": "16.8.3",
    "react-native": "0.59.8",
    "react-native-gesture-handler": "^1.2.1",
    "react-native-sqlite-storage": "^3.3.10",
    "react-navigation": "^3.9.1",
    "vue-axios": "^2.1.4",
    "vue-native-core": "0.0.8",
    "vue-native-helper": "0.0.11",
    "vue-native-router": "0.0.1-alpha.3",
    "vue-native-scripts": "0.0.15"
  },
  "devDependencies": {
    "@babel/core": "^7.4.4",
    "@babel/runtime": "^7.4.4",
    "babel-jest": "^24.8.0",
    "jest": "^24.8.0",
    "metro-react-native-babel-preset": "^0.54.1",
    "react-test-renderer": "16.8.3"
  },
}
```
