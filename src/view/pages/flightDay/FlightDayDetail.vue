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
                <template v-if="preparedFlights.length > 0">
                    <v-divider color="#000000"/>
                    <v-divider color="#000000"/>
                    <v-subheader inset>Připravená letadla</v-subheader>
                </template>
                <template v-for="flight in preparedFlights">
                    <v-divider/>
                    <v-list-item
                            :key="'prepared-'+flight.id"
                    >
                        <v-list-item-avatar>
                            <v-icon>mdi-airplane-takeoff</v-icon>
                        </v-list-item-avatar>


                        <v-list-item-content>
                            <v-list-item-title v-text="flight.plane.callsign"/>
                            <v-list-item-subtitle v-text="flight.captain.surname"/>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn small color="teal accent-4" @click.prevent="start(flight.id)">
                                <v-icon>mdi-arrow-up</v-icon>
                                Odstartovat
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </template>


                <template v-if="inAirFlights.length > 0">
                    <v-divider color="#000000"/>
                    <v-divider color="#000000"/>
                    <v-subheader inset>Letadla ve vzduchu</v-subheader>
                </template>
                <template v-for="flight in inAirFlights">
                    <v-divider/>
                    <v-list-item
                            :key="'air-'+flight.id"
                    >
                        <v-list-item-avatar>
                            <v-icon>mdi-airplane-landing</v-icon>
                        </v-list-item-avatar>


                        <v-list-item-content>
                            <v-list-item-title v-text="flight.plane.callsign"/>
                            <v-list-item-subtitle
                                    v-text="`${flight.captain.surname} - ${getNiceTime(flight.startDate)}`"/>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn small color="teal accent-4" @click.prevent="land(flight.id)">
                                <v-icon>mdi-arrow-down</v-icon>
                                Přistání
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </template>


                <template v-if="onGroundPlanes.length > 0">
                    <v-divider color="#000000"/>
                    <v-divider color="#000000"/>
                    <v-subheader inset>Letadla na zemi</v-subheader>
                </template>
                <template v-for="plane in onGroundPlanes">
                    <v-divider/>
                    <v-list-item
                            :key="'ground-'+plane.id"
                    >
                        <v-list-item-avatar>
                            <v-icon>mdi-airport</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="plane.callsign"/>
                        </v-list-item-content>
                    </v-list-item>
                </template>


                <template v-if="flightDay.flights.length > 0">
                    <v-divider color="#000000"/>
                    <v-divider color="#000000"/>
                    <v-subheader inset>Celkové lety</v-subheader>
                </template>
                <template v-for="flight in flightDay.flights"
                          v-if="flight.startDate !== undefined && flight.finishDate !== undefined">
                    <v-divider/>
                    <v-list-item
                            :key="'total-flights-'+flight.id"
                    >
                        <v-list-item-avatar>
                            <v-icon>mdi-airplane</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title
                                    v-text="`${flight.captain.surname} ${flight.captain.name} - total: ${getNiceTimeTotal(flight.finishDate, flight.startDate)}`"/>
                            <v-list-item-subtitle
                                    v-text="`${flight.plane.callsign} - start: ${getNiceTime(flight.startDate)}; přistání: ${getNiceTime(flight.finishDate)} `"/>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </template>
        </List>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {FlightControllerDI, FlightDayControllerDI} from "@/lib/injection/Factory";
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

        updateData() {
            let flightDay = FlightDayControllerDI.getFlightDay(this.id);
            if (flightDay !== null) {
                this.flightDay = flightDay;
            }

            this.inAirFlights = FlightDayControllerDI.inAirFlights(this.id);
            this.onGroundPlanes = FlightDayControllerDI.onGroundPlanes(this.id);
            this.preparedFlights = FlightDayControllerDI.preparedFlights(this.id);
        }

        generateReport() {
            if (this.flightDay !== null) {
                let data = FlightDayControllerDI.generateReport(this.id);
                let csvContent = "data:text/csv;charset=utf-8,"
                    + data.map(e => e.join(",")).join("\n");

                let encodedUri = encodeURI(csvContent);

                let link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", `smirka-${this.flightDay.date.getDate()}${this.flightDay.date.getMonth() + 1}${this.flightDay.date.getFullYear()}.csv`);
                document.body.appendChild(link);
                link.click();
            }
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
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        }

        getNiceTime(date: Date) {
            return `${date.getHours()}:${date.getMinutes()}`
        }

        getNiceTimeTotal(date1: Date, date2: Date) {
            let date = new Date(date1.getTime() - date2.getTime());
            return `${date.getHours() - 1}:${date.getMinutes()}`
        }

        land(id: number) {
            let date = new Date();
            date.setSeconds(0);
            date.setMilliseconds(0);
            FlightControllerDI.finishFlight(id, date);
            this.updateData();
        }

        start(id: number) {
            let date = new Date();
            date.setSeconds(0);
            date.setMilliseconds(0);
            FlightControllerDI.startFlight(id, date);
            this.updateData();
        }
    }
</script>

<style scoped>

</style>