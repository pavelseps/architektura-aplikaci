<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="3" v-for="person in persons">
                    <v-card
                            class="d-flex align-center"
                            outlined
                            height="150"
                            :color="idSelectedPerson === person.id ? 'green lighten-5' : ''"
                            @click.prevent="togglePerson(person.id)"
                    >
                        <v-scroll-y-transition>
                            <div
                                    class="display-1 flex-grow-1 text-center"
                            >
                                {{person.name}} {{person.surname}}
                            </div>
                        </v-scroll-y-transition>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="3" v-for="plane in planes">
                    <v-card
                            class="d-flex align-center"
                            outlined
                            height="150"
                            :color="idSelectedPlane === plane.id ? 'green lighten-5' : ''"
                            @click.prevent="togglePlane(plane.id)"
                    >
                        <v-scroll-y-transition>
                            <div
                                    class="display-1 flex-grow-1 text-center"
                            >
                                {{plane.callsign}}
                            </div>
                        </v-scroll-y-transition>
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
            this.planes = FlightDayControllerDI.onGroundPlanes(this.id);
            this.persons = FlightDayControllerDI.onGroundPersons(this.id);
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