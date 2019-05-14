<template>
  <theme>
    <root>
      <spinner-overlay :visible="loading" />
      <app-navigation></app-navigation>
    </root>
  </theme>
</template>

<script>
import SpinnerOverlay from './SpinnerOverlay';
import { Root } from "native-base";

import { AppNavigation } from "./AppNavigation";
import Theme from "./Theme";

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