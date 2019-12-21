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
                            @click="save"
                    >
                        <v-icon>mdi-content-save</v-icon>
                        Uložit
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-form
                            ref="form"
                            @submit.prevent=""
                    >

                        <slot name="f-body"></slot>

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
                    </v-form>
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
    export default class Form extends Vue {

        back() {
            this.$emit("back");
        }

        save() {
            this.$emit("save");
            this.back();
        }
    }
</script>

<style scoped>

</style>