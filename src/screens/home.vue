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
      <nb-title>{{ $t('home') }}</nb-title>
    </nb-body>
    <nb-right>
      <nb-button
        transparent
        :onPress="() => add()"
      >
        <nb-icon :name="'add'" />
      </nb-button>
    </nb-right>
  </nb-header>
  <safe-area-view style="flex:1">
    <content-flex :onFetchData="onFetchData" :loading="loading" ref="content">
      <disp-box v-for="(item, i) in items" :key="i" :on-press="onPressLearnMore" :name="item.id+' '+item.title" :description="item.description" :onDelete="()=>onDelete(item)" :onScrollEnabled="(enable) => $refs.content.setScrollEnabled(enable)" />
      <view v-for="i in 9" :key="i" style="flex-grow: 1; flex-basis: 300; height: 1;margin-left: 2;margin-right: 2;" />
    </content-flex>
  </safe-area-view>
</nb-container>
</template>

<script>
import {SafeAreaView} from 'react-navigation'
import ContentFlex from "../components/ContentFlex";
import DispBox from "../components/DispBox";
import { Log } from "../dao/Log";

export default {
  components: {
    SafeAreaView,
    'content-flex' : ContentFlex,
    'disp-box' : DispBox
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data: function() {
      return {
        scrollEnabled: true,
        loading: true,
        inFetch: false,
        offset:0,
        items: [],
      }
  },
  mounted(){
  },
  methods: {
      async onFetchData(size){
        if(this.inFetch == false){
          this.loading = true
          this.inFetch = true;
          this.$db.getLog(this.offset, size)
          .then((lists) => {
            if(Array.isArray(lists) == false || lists.length == 0){
              this.loading = false
            }else{
              let i = 0;
              lists.forEach(element => {
                this.items.push(element)
                this.offset++
              });
            }
            this.inFetch = false;
          })
        }
      },
      onDelete(log) {
        this.loading = true;
        this.$tasks.addTask(() => {return this.$db.deleteLog(log)})
          .started(() => console.log("started delete"))
          .then((response) => {
            if(response){
              this.items.splice( this.items.indexOf(log), 1 );
              this.offset--
            }
          })
          .catch((error) => console.warn(error))
      },
      add() {
        this.loading = true;
        this.$tasks.addTask(() => {return this.$db.createLog("essai", "test")})
          .started(() => console.log("started"))
          .then((response) => {
            console.log("insert id "+response);
            this.onFetchData(1);
          })
          .catch((error) => console.warn(error))
      },
      onPressLearnMore: function(id, name) {
        this.navigation.navigate("Menu", {id, name});
      }
  }
}
</script>
