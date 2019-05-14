<template>
    <view class="box">
        <swipe :directionalDistanceChangeThreshold="15" :setScrollEnabled="onScrollEnabled" ref="swipe" >
          <nb-button info slot="left" :onPress="()=>console.log('infos')">
            <nb-icon active name="information-circle" />
          </nb-button>
          <nb-button danger slot="right" :onPress="()=>{$refs.swipe.close();onDelete();}">
            <nb-icon active name="trash" />
          </nb-button>
          <view style="width: 100%;height: 100;padding: 5;">
            <text>{{name}}</text>
            <button
                :on-press="(event) => { onPress(id, name) }"
                :title="description"
                accessibility-label="Learn more about this button"
            />
          </view>
        </swipe>
    </view>
</template>

<script>
import Swipe from "../components/Swipe";

function _notnull(){}
export default {
    components: {
      'swipe' : Swipe,
    },
    props: {
        id: Number,
        name: String,
        description: String,
        onDelete: {
            type: Function,
            default: _notnull
        },
        onPress: {
            type: Function,
            default: _notnull
        },
        onScrollEnabled: {
            type: Function,
            default: _notnull
        },
    },
    data() {
      return {
      }
    },
    updated() {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped>
.box{
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 300;
  margin: 2;
  border-bottom-color: rgba(0,0,0,0.12);
  border-bottom-width: 1;
  border-right-color: rgba(0,0,0,0.12);
  border-right-width: 1;
  border-width: 1;
  border-radius:0;
}
</style>