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
                            <h1 class="text-2xl font-semibold">Opération</h1>
                        </div>

                        <div class="mt-5 w-80">
                            <div class="flex flex-col my-4">
                                <strong>Carte</strong>
                                <span>{{ carte }}</span>
                            </div>

                            <div class="flex flex-col my-4">
                                <strong>Montant</strong>
                                <span>{{ montant }} XOF</span>
                            </div>

                            <div class="flex flex-col my-4">
                                <strong>Frais</strong>
                                <span>{{ frais }}</span>
                            </div>

                            <div class="flex flex-col my-4">
                                <strong>Date & Heure</strong>
                                <span>{{ date }}</span>
                            </div>

                            <div class="flex flex-col my-4">
                                <strong>Transaction ID</strong>
                                <span>{{ transaction_id }}</span>
                            </div>

                            <div class="flex flex-col my-4">
                                <strong>Statut</strong>
                                <span>{{ statut }}</span>
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
        carte: '',
        montant: '',
        frais: '',
        date: '',
        transaction_id: '',
        statut: '',
      }
  },
  components: {
    IonContent,
    IonPage,
    IonCard, 
    IonCardContent,
  },

  mounted(){
    this.getUserOperation();
  },

  methods: {
    async getUserOperation(){

        let slug = this.$route.params.slug;
        
        await axios
        .get(`/api/v1/user/operations/${slug}/`)
        .then((response) => {
            console.log(response.data)
            
            const options = {
                year: "numeric",  month: 'short', day: 'numeric',
                hour: "2-digit", minute: "2-digit", hourCycle: "h24"
            }

            this.carte = response.data.operation.carte.carte_num;
            this.montant = response.data.operation.montant_operation;
            this.frais = response.data.frais;
            this.date = new Date(response.data.operation.date_demande).toLocaleDateString('fr-FR', options);
            this.transaction_id = String(response.data.operation.slug).slice(0, 8);
            this.statut = String(response.data.operation.status_operation).toLowerCase();

        })
        .catch((error) => {
            console.log(error)
        })

      }
  }

});
</script>