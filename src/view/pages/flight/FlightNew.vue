<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="3" v-for="person in persons">
                    <v-card
                            class="text-center"
                            outlined
                            :color="idSelectedPerson === person.id ? 'green lighten-5' : ''"
                            @click.prevent="togglePerson(person.id)"
                    >
                        <v-card-title>{{person.name}} {{person.surname}}</v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="3" v-for="plane in planes">
                    <v-card
                            class="text-center"
                            outlined
                            :color="idSelectedPlane === plane.id ? 'green lighten-5' : ''"
                            @click.prevent="togglePlane(plane.id)"
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
    import {Component} from "vue-property-decorator";
    import {FlightControllerDI, FlightDayControllerDI, PlaneControllerDI} from "@/lib/injection/Factory";
    import IPlane from "@/lib/interfaces/IPlane";
    import IPerson from "@/lib/interfaces/IPerson";

    @Component({
        components: {}
    })
    export default class FlightNew extends Vue {
        planes: IPlane[] = [];
        persons: IPerson[] = [];

        idSelectedPlane: number | null = null;
        idSelectedPerson: number | null = null;

        created() {
            let flightDay = FlightDayControllerDI.getFlightDay(this.id);
            if (flightDay !== null) {
                this.planes = flightDay.planes; //TODO add olny aviable
                this.persons = flightDay.persons;  //TODO add olny aviable
            }
        }

        togglePlane(id: number) {
            this.idSelectedPlane = id;
        }

        togglePerson(id: number) {
            this.idSelectedPerson = id;
        }

        get id() {
            return parseInt(this.$route.params.id);
        }

        back() {
            this.$router.push({name: "FlightDayDetail", params: {id: this.id.toString()}}).catch(err => {
            });
        }

        save() {

            if (this.idSelectedPlane !== null && this.idSelectedPerson){
                let captain = this.persons.find(x => x.id === this.idSelectedPerson);
                let plane = this.planes.find(x => x.id === this.idSelectedPlane);

                if (captain !== undefined && plane !== undefined){
                    let flight = FlightControllerDI.addFlight(new Date(), captain, [], plane);

                    if (flight !== null) {
                        FlightControllerDI.setFlightReady(flight.id);
                        FlightDayControllerDI.setFlight(this.id, flight);

                        this.back();
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>