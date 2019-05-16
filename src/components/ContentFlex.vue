<template>
  <nb-content :scrollEventThrottle="400" :onScroll="onScroll" :removeClippedSubviews="true" :scrollEnabled="scrollEnabled" >
     <view class="content-wrapper" :onLayout="onLayout">
        <slot></slot>
     </view>
     <nb-spinner style="flex-basis: 100%" v-if="loading" />
  </nb-content>
</template>

<script>
import { Dimensions } from 'react-native'
function _notnull(){}
export default {
    props: {
      loading: {
          type: Boolean,
          default: false
      },
      onFetchData: {
          type: Function,
          default: _notnull
      },
    },
    data() {
      return {
        scrollEnabled: true,
        pagesize: 5,
      }
    },
    methods: {
      setScrollEnabled(enable){
        this.scrollEnabled = enable
      },
      onScroll: function(e) {
        let scrollHeight = e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
        if(scrollHeight >= (e.nativeEvent.contentSize.height*4)/5){
          this.onFetchData(this.pagesize)
        }
      },
      onLayout: function(e) {
        const { height } = Dimensions.get('window');
        if(e.nativeEvent.layout.height <= height){
          this.pagesize *= 2;
          this.onFetchData(this.pagesize)
        }
      },
    }
  }
</script>

<style scoped>
.content-wrapper{
  flex : 1;
  flex-direction : row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-around;
}
</style>