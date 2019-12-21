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
                    <h1><slot name="f-headline"></slot></h1>
                </v-col>
                <v-col class="text-right">
                    <v-btn
                            color="teal accent-4"
                            @click.prevent="newItem"
                    ><slot name="f-new-btn"></slot></v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-list two-line subheader>
            <slot name="f-body"></slot>
        </v-list>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class List extends Vue {

        newItem() {
            this.$emit("new");
        }
    }
</script>

<style scoped>

</style>