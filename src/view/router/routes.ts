import {RouteConfig,} from "vue-router/types/router";
import VueRouter from "vue-router";
import PlaneList from "@/view/pages/plane/PlaneList.vue";
import PlaneDetail from "@/view/pages/plane/PlaneDetail.vue";
import PersonDetail from "@/view/pages/person/PersonDetail.vue";
import PersonList from "@/view/pages/person/PersonList.vue";
import FlightDayList from "@/view/pages/flightDay/FlightDayList.vue";
import FlightDayDetail from "@/view/pages/flightDay/FlightDayDetail.vue";
import Home from "@/view/pages/Home.vue";

const routes: RouteConfig[] = [
    /**
     * Planes
     */
    {
        name: "PlaneList",
        path: '/plane',
        component: PlaneList,
    },
    {
        name: "PlaneDetail",
        path: '/plane/:id',
        component: PlaneDetail,
    },

    /**
     * Persons
     */
    {
        name: "PersonList",
        path: '/person',
        component: PersonList,
    },
    {
        name: "PersonDetail",
        path: '/person/:id',
        component: PersonDetail,
    },

    /**
     * Flight day
     */
    {
        name: "FlightDayList",
        path: '/flightday',
        component: FlightDayList,
    },
    {
        name: "FlightDayDetail",
        path: '/flightday/:id',
        component: FlightDayDetail,
    },

    /**
     * Flight
     */
    {
        name: "FlightDetail",
        path: '/flight/:id',
        component: FlightDayDetail,
    },


    /**
     * Defaults
     */
    {
        name: "Home",
        path: '/',
        component: Home,
    },
    {
        name: "DefaultHome",
        path: '/*',
        component: Home,
    },
];

export const router = new VueRouter({
    routes,
    mode: 'history',
});