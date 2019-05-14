<template>
<nb-container>
  <nb-header>
    <nb-left>
      <nb-button
        transparent
        :onPress="() => navigation.openDrawer()"
      >
        <nb-icon :name="'menu'" />
      </nb-button>
    </nb-left>
    <nb-body>
      <nb-title>{{ $t('informations')}}</nb-title>
    </nb-body>
    <nb-right />
  </nb-header>
  <nb-content padder>
     <view>
        <text>{{ $t('informations')}}</text>
        <button
            :on-press="onPressAlert"
            title="Alert"
        />
     </view>
  </nb-content>
</nb-container>
</template>

<script>
import { Alert } from 'react-native';

export default {
  components: {
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
      onPressAlert: function() {
        Alert.alert(
          'Alert Title',
          'My Alert Msg',
          [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.navigation.goBack()},
          ],
          { cancelable: false }
        );
      }
  }
}
</script>

<style>
.container {
  background-color: transparent;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.content-wrapper{
  flex : 1;
  flex-direction : row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
}

</style>
