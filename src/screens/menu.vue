<template>
<nb-container>
  <nb-header>
    <nb-left>
        <nb-button
            transparent
            :onPress="() => this.props.navigation.goBack()"
        >
            <nb-icon name="arrow-back" />
        </nb-button>
    </nb-left>
    <nb-body>
      <nb-title>Menu {{name}}</nb-title>
    </nb-body>
    <nb-right />
  </nb-header>
  <nb-content padder>
     <view>
        <text>Test menu {{name}}</text>
        <button
            :on-press="onPressLearnMore"
            title="Learn More"
            accessibility-label="Learn more about this button"
        />
     </view>
  </nb-content>
</nb-container>
</template>

<script>
import { Platform, Linking } from 'react-native';

export default {
  components: {
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data: function() {
      return {
          id: 0,
          name: null,
      }
  },
  created(){
    const { params } = this.navigation.state;
    if(params){
        this.id = params.id;
        this.name = params.name;
    }else{
        this.navigation.goBack();
    }
  },
  beforeMount(){
  },
  methods: {
      onPressLearnMore: function() {
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
