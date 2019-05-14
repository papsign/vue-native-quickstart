<template>
<nb-container>
  <nb-content class="sbcontent" :bounces="false">
    <nb-list class="list">
        <nb-list-item 
            v-for="(data,i) in src"
            :key="i"
            button
            noBorder
            style="marginLeft: 0; paddingLeft: 17"
            :onPress="() => navigateToScreen(data.route)"
            :class="(navigation.state && navigation.state.index == i) ? 'active' : ''"
        >
            <nb-left>
                <nb-icon
                    :name="data.icon"
                    class="lefticon"
                />
                <nb-text>
                    {{ data.name }}
                </nb-text>
            </nb-left>
        </nb-list-item>
    </nb-list>
  </nb-content>
</nb-container>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data() {
    return {
      src: [
          {
              name: this.$t('home'),
              route: "Home",
              icon: "home",
          },
          {
              name: this.$t('informations'),
              route: "Infos",
              icon: "information",
          },
      ],
    }
  },
  methods: {
    navigateToScreen(route){
      this.navigation.navigate(route);
      this.navigation.closeDrawer();
    }

  }
}
</script>

<style scoped>
.active{
  background-color: #CCC;
}
.sbcontent{
  flex : 1;
  top: -1;
}
.lefticon{
  color: #777;
  font-size: 26;
  width: 30;
}
</style>
