<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="4" >
                    <v-card
                            class="d-flex align-center"
                            outlined
                            height="150"
                            @click.prevent="click('FlightDayList')"
                    >
                        <div
                                class="display-1 flex-grow-1 text-center"
                        >
                            Letecké dny
                        </div>
                    </v-card>
                </v-col>
                <v-col md="4" >
                    <v-card
                            class="d-flex align-center"
                            outlined
                            height="150"
                            @click.prevent="click('PlaneList')"
                    >
                        <div
                                class="display-1 flex-grow-1 text-center"
                        >
                            Letadla
                        </div>
                    </v-card>
                </v-col>
                <v-col md="4" >
                    <v-card
                            class="d-flex align-center"
                            outlined
                            height="150"
                            @click.prevent="click('PersonList')"
                    >
                        <div
                                class="display-1 flex-grow-1 text-center"
                        >
                            Lidé
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class Home extends Vue {

        click(name : string){
            this.$router.push({name: name}).catch(err => {
            });
        }
    }
</script>

<style scoped>

</style>