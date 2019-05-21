<template>
<nb-container>
    <navigation-events
      :onWillBlur="() => tasks.stop()"
    />
  <nb-header>
    <nb-left>
        <nb-button
            transparent
            :onPress="() => {if(hasDrawer){navigation.openDrawer()}else{navigation.goBack()}}"
        >
            <nb-icon v-if="hasDrawer" name="menu" />
            <nb-icon v-else name="arrow-back" />
        </nb-button>
    </nb-left>
    <nb-body>
      <nb-title>{{ $t('streamlist') }}</nb-title>
    </nb-body>
    <nb-right />
  </nb-header>
  <safe-area-view style="flex:1">
  <content-flex :onFetchData="onFetchData" :loading="tasks.isRunning()" ref="content">
    <view v-for="(item, i) in items" :key="i" class="box">
        <text>{{ item.name }}</text>
    </view>
  </content-flex>
  </safe-area-view>
</nb-container>
</template>

<script>
import { NavigationEvents, SafeAreaView } from 'react-navigation'
import ContentFlex from "../components/generic/ContentFlex";
import { TaskManager } from "../class/TaskManager";

export default {
  components: {
    NavigationEvents,
    SafeAreaView,
    ContentFlex,
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data: function() {
      return {
        tasks: new TaskManager(),
        scrollEnabled: true,
        offset:0,
        items: [],
      }
  },
  computed: {
    hasDrawer(){
      return (typeof this.navigation.openDrawer === "function")
    },
  },
  methods: {
      async onFetchData(size){
        if(this.tasks.isRunning() == false){
          this.tasks.addTask(() => {return this.axios.get("https://pokeapi.co/api/v2/pokemon/?offset="+this.offset+"&limit="+size)})
          .then((response) => {
            let lists = response.data.results
            if(Array.isArray(lists) == false || lists.length == 0){
                this.tasks.stop()
            }else{
              let i = 0;
              lists.forEach(element => {
                this.items.push(element)
                this.offset++
              });
            }
          })
        }
      },
  }
};
</script>
 <style scoped>
.box{
  padding: 2;
  margin: 5;
  border-bottom-color: rgba(0,0,0,0.12);
  border-bottom-width: 1;
  border-right-color: rgba(0,0,0,0.12);
  border-right-width: 1;
  border-width: 0;
  border-radius:0;
}
</style>
