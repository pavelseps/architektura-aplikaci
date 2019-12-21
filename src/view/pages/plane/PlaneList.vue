<template>
    <div>
        <List
            @new="add"
        >
            <template v-slot:f-headline>Letadla</template>
            <template v-slot:f-new-btn><v-icon>mdi-plus</v-icon> Nové letadlo</template>
            <template v-slot:f-body>
                <template v-for="plane in planes">
                    <v-divider></v-divider>
                    <v-list-item
                            :key="plane.id"
                            @click="$router.push({name: 'PlaneDetail', params: {id: plane.id}})"
                    >
                        <v-list-item-avatar>
                            <v-icon>mdi-airplane</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="plane.callsign"></v-list-item-title>
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
    import IPlane from "../../../lib/interfaces/IPlane";
    import Vue from "vue";
    import {PlaneControllerDI} from "@/lib/injection/Factory";
    import {Component} from "vue-property-decorator";
    import List from "@/view/components/List.vue";

    @Component({
        components: {List}
    })
    export default class PlaneList extends Vue {
        planes: IPlane[] = [];

        created() {
            this.planes = PlaneControllerDI.getAllPlanes();
        }

        add(){
            this.$router.push({name: "PlaneNew"});
        }
    }
</script>

<style scoped>

</style>