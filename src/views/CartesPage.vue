<template>
  <ion-page>
    <ion-content :fullscreen="true">

        <div class="relative">
            <div class="fixed top-0 left-0 right-0 z-10 animate__animated animate__fadeInRight">
                <ion-card class="bg-white">
                    <div class="flex justify-between p-2">
                        <div>
                            <router-link :to="{name: 'Dash'}">
                                <img src="assets/icon/back.png" class="w-10"/>
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{name: 'Home'}">
                                <img src="assets/icon/icon.png" class="w-10"/>
                            </router-link>
                        </div>
                    </div>
                </ion-card>
            </div>
            <div>
                <div>
                    <div class="mt-12"></div>
                    <div>
                        <ion-card class="flex justify-center items-center bg-white mt-24 z-0">

                        <ion-card-content class="">

                        <div class="mt-2 min-h-full text-center">
                            <h1 class="text-2xl font-semibold">Carte(s)</h1>
                            <span class="text-gray-400">Sélectionnez une carte pour la recharger !</span>
                        </div>

                        <div class="mt-5 w-80">

                            <div v-for="el in cartes" :key="el.id">
                                <router-link :to="{name: 'Recharger', params: {'slug': el.slug}}" 
                                class="flex justify-between items-center p-2 my-2 bg-gray-200 rounded">
                                <img :src="el.logo" class="w-8"/>
                                <p class="flex flex-col">
                                    <span>{{ el.carte }}</span>
                                    <small>{{ el.expire }}</small>
                                </p>
                                <p class="flex flex-col">
                                    <strong>{{ el.c_id }}</strong>
                                    <small>{{ el.name }}</small>
                                </p>
                                </router-link>
                            </div>

                        </div>

                        </ion-card-content>
                        </ion-card>
                    </div>

                </div>
            </div>
        </div>

    </ion-content>
  </ion-page>
</template>

<script>
import {IonContent, IonPage, IonCard,  IonCardContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'HomePage',
  data(){
      return {
          cartes: [],
          carteNum: "4577457745771234"
      }
  },
  components: {
    IonContent,
    IonPage,
    IonCard, 
    IonCardContent,
  },

  mounted(){
    this.userCartes()
  },

  methods: {

      async userCartes() {
        await axios
            .get('/api/v1/user/cartes/')
            .then((response) => {
                console.log(response.data)

                response.data.forEach((el) => {
                    var carte = String(el.carte_num);
                    this.cartes.push({
                        id: el.id,
                        slug: el.slug,
                        carte: carte,
                        c_id: el.carte_client_id,
                        expire: el.carte_exp_month + ' - ' + el.carte_exp_year,
                        name: el.type_carte.name,
                        logo: axios.defaults.baseURL + el.type_carte.logo,
                    });
                });

                console.log(this.cartes)
            })
            .catch((error) => {
                console.log(error)
            })
    },
  }

});
</script>