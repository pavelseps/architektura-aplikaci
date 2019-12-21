<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="3" v-for="plane in planes">
                    <v-card
                            class="text-center"
                            outlined
                            :color="idSelected.includes(plane.id) ? 'green lighten-5' : ''"
                            @click.prevent="toggle(plane.id)"
                    >
                        <v-card-title>{{plane.callsign}}</v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                            @click="back"
                    >
                        <v-icon>mdi-arrow-left</v-icon>
                        Zpět
                    </v-btn>
                </v-col>
                <v-col class="text-right">
                    <v-btn
                            color="teal accent-4"
                            @click.prevent="save"
                    >
                        <v-icon>mdi-content-save</v-icon>
                        Uložit
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {FlightDayControllerDI, PlaneControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import List from "@/view/components/List.vue";
    import IPlane from "@/lib/interfaces/IPlane";

    @Component({
        components: {List}
    })
    export default class FlightDayPlanes extends Vue {
        idSelected: number[] = [];
        planes: IPlane[] = [];

        created() {
            let flightDay = FlightDayControllerDI.getFlightDay(this.id);
            if (flightDay !== null) {
                this.idSelected = flightDay.planes.map(x => x.id);
            }

            this.planes = PlaneControllerDI.getAllPlanes();
        }

        get id() {
            return parseInt(this.$route.params.id);
        }

        back() {
            this.$router.push({name: "FlightDayDetail", params: {id: this.id.toString()}}).catch(err => {
            });
        }

        toggle(id : number){
            let index = this.idSelected.findIndex(x => x === id);

            if (index > -1) {
                this.idSelected.splice(index, 1);
            } else {
                this.idSelected.push(id);
            }
        }

        save() {
            FlightDayControllerDI.setPlanesToDay(this.id, this.planes.filter(x => this.idSelected.includes(x.id)));
            this.back();
        }
    }
</script>

<style scoped>

</style>