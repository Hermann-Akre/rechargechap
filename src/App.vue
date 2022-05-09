<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

import axios from 'axios';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },

  beforeCreate() {

    this.$store.commit('initializeStore')

    if(this.$store.state.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.state.token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }

  },
});
</script>