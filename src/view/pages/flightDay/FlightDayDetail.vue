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
            <v-row>
                <v-col>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {FlightDayControllerDI, PersonControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import IFlightDay from "@/lib/interfaces/IFlightDay";

    @Component({
        components: {}
    })
    export default class FlightDayDetail extends Vue {
        flightDay: IFlightDay | null;

        constructor() {
            super();
            this.flightDay = null;
        }

        get id() {
            return parseInt(this.$route.params.id);
        }

        created() {
            if (this.$route.params.id !== undefined) {
                let flightDay = FlightDayControllerDI.getFlightDay(parseInt(this.$route.params.id));
                if (flightDay !== null) {
                    this.flightDay = flightDay;
                }
            }
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

        getNice(date: Date) {
            return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
        }
    }
</script>

<style scoped>

</style>