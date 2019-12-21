<template>
    <div>
        <List
                @new="add"
        >
            <template v-slot:f-headline>Letecké dny</template>
            <template v-slot:f-new-btn><v-icon>mdi-plus</v-icon> Nový den</template>
            <template v-slot:f-body>
                <template v-for="flightDay in flightDays">
                    <v-divider></v-divider>
                    <v-list-item
                            :key="flightDay.id"
                            @click="$router.push({name: 'FlightDayDetail', params: {id: flightDay.id}})"
                    >
                        <v-list-item-avatar>
                            <v-icon>mdi-airplane-takeoff</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="getNice(flightDay.date)"></v-list-item-title>
                            <v-list-item-subtitle v-text="''"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn icon>
                                <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </template>
            </template>
        </List>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {FlightDayControllerDI, PersonControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import IPerson from "@/lib/interfaces/IPerson";
    import IFlightDay from "@/lib/interfaces/IFlightDay";
    import List from "@/view/components/List.vue";

    @Component({
        components: {List}
    })
    export default class FlightDayList extends Vue {
        flightDays: IFlightDay[] = [];

        created() {
            this.updateDays();
        }

        updateDays(){
            this.flightDays = FlightDayControllerDI.getAllFlightDays();
        }

        add(){
            FlightDayControllerDI.addFlightDay(new Date());
            this.updateDays();
        }

        getNice(date : Date){
            return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
        }
    }
</script>

<style scoped>

</style>