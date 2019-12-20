<template>
    <div>
        <h1>Smirka app</h1>
        <button @click.prevent="addPlane">Click</button>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import Vue from "vue";
    import {PlaneControllerDI} from "@/lib/Factory";

    @Component({
        components: {}
    })
    export default class App extends Vue {
        private it = 0;

        addPlane() {
            PlaneControllerDI.addPlane(`OK-${this.it++}`);
        }
    }
</script>

<style lang="scss" scoped>

</style>
