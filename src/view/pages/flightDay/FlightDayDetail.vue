<template>
    <div>
        <v-container
                fluid
        >
            <v-row
                    align="center"
                    justify="center"
            >
                <v-col class="text-left">
                    <h1>Letecký den: {{getNice(flightDay.date)}}</h1>
                </v-col>
                <v-col class="text-right">
                    <v-btn
                            class="ml-2"
                            color="teal accent-4"
                            @click="generateReport"
                    >
                        <v-icon>mdi-content-save</v-icon>
                        Generovat Šmírku
                    </v-btn>
                    <v-btn
                            class="ml-2"
                            color="teal accent-4"
                            @click="editPlanes"
                    >
                        <v-icon>mdi-airplane</v-icon>
                        Upravit Letadla
                    </v-btn>
                    <v-btn
                            class="ml-2"
                            color="teal accent-4"
                            @click="editPersons"
                    >
                        <v-icon>mdi-account</v-icon>
                        Upravit Piloty
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <List
                @new="add"
        >
            <template v-slot:f-headline>Letecký den</template>
            <template v-slot:f-new-btn>
                <v-icon>mdi-plus</v-icon>
                Nový let
            </template>
            <template v-slot:f-body>
                <v-subheader inset>Připravená letadla</v-subheader>
                <template v-for="flight in preparedFlights">
                    <v-divider></v-divider>
                    <v-list-item
                            :key="'prepared-'+flight.id"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="flight.plane.callsign"></v-list-item-title>
                            <v-list-item-subtitle v-text="''"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn @click.prevent="start(flight.id)">
                                Odstartovat
                            </v-btn>
                            <v-btn>
                                Odebrat
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </template>


                <v-subheader inset>Letadla ve vzduchu</v-subheader>
                <template v-for="flight in inAirFlights">
                    <v-divider></v-divider>
                    <v-list-item
                            :key="'air-'+flight.id"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="flight.plane.callsign"></v-list-item-title>
                            <v-list-item-subtitle v-text="''"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn @click.prevent="land(flight.id)">
                                Přistání
                            </v-btn>
                            <v-btn>
                                Odebrat
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </template>


                <v-subheader inset>Letadla na zemi</v-subheader>
                <template v-for="plane in onGroundPlanes">
                    <v-divider></v-divider>
                    <v-list-item
                            :key="'ground-'+plane.id"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="plane.callsign"></v-list-item-title>
                            <v-list-item-subtitle v-text="''"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </template>
        </List>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {FlightControllerDI, FlightDayControllerDI, PersonControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import IFlightDay from "@/lib/interfaces/IFlightDay";
    import List from "@/view/components/List.vue";
    import IFlight from "@/lib/interfaces/IFlight";
    import IPlane from "@/lib/interfaces/IPlane";

    @Component({
        components: {
            List
        }
    })
    export default class FlightDayDetail extends Vue {
        flightDay: IFlightDay | null;
        inAirFlights: IFlight[];
        onGroundPlanes: IPlane[];
        preparedFlights: IFlight[];

        constructor() {
            super();
            this.flightDay = null;
            this.inAirFlights = [];
            this.onGroundPlanes = [];
            this.preparedFlights = [];
        }

        get id() {
            return parseInt(this.$route.params.id);
        }

        created() {
            this.updateData()
        }

        updateData(){
            let flightDay = FlightDayControllerDI.getFlightDay(this.id);
            if (flightDay !== null) {
                this.flightDay = flightDay;
            }

            this.inAirFlights = FlightDayControllerDI.inAirFlights(this.id);
            this.onGroundPlanes = FlightDayControllerDI.onGroundPlanes(this.id);
            this.preparedFlights = FlightDayControllerDI.preparedFlights(this.id);
        }

        generateReport() {
            //TODO generating report
        }

        editPlanes() {
            this.$router.push({name: 'FlightDayPlanes', params: {}}).catch(err => {
            })
        }

        editPersons() {
            this.$router.push({name: 'FlightDayPersons', params: {}}).catch(err => {
            });
        }

        add() {
            this.$router.push({name: 'FlightNew', params: {}}).catch(err => {
            });
        }

        getNice(date: Date) {
            return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
        }

        land(id: number) {
            FlightControllerDI.finishFlight(id, new Date());
            this.updateData();
        }

        start(id: number) {
            FlightControllerDI.startFlight(id, new Date());
            this.updateData();
        }
    }
</script>

<style scoped>

</style>