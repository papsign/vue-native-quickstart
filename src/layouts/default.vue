<template>
  <theme>
    <root>
      <spinner-overlay :visible="loading" />
      <app-navigation></app-navigation>
    </root>
  </theme>
</template>

<script>
import { Root } from "native-base";
import { AppNavigation } from "./AppNavigation";
import SpinnerOverlay from '../components/generic/SpinnerOverlay';
import Theme from "../styles/theme";

export default {
    props: {
        loading: Boolean,
    },
    components: { 
        Theme,
        Root, 
        SpinnerOverlay,
        AppNavigation 
    },
}
</script>