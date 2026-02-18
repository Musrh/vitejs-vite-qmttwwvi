import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

import Produits from "./views/Produits.vue";

import Home from "./views/Home.vue";
import Contact from "./views/Contact.vue";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import Admin from "./views/Admin.vue";

import Panier from './views/Panier.vue'

const routes = [
  { path: "/", component: Home },

  { path: "/contact", component: Contact },

  {
    path: "/login",
    component: Login,
    meta: { requiresGuest: true }
  },

  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },

  {
    path: "/admin",
    component: Admin,
    meta: { requiresAdmin: true }
  },

{ path: '/panier', name: 'Panier', component: Panier },

{
  path: "/success",
  name: "Success",
  component: Success
},


  {
    path: "/produits",
    name: "Produits",
    component: Produits
  }

];


const router = createRouter({
  history: createWebHistory(),
  routes
});


// ✅ NOUVEAU beforeEach (unique)
router.beforeEach((to, from, next) => {

  const isAuthenticated = store.getters.isAuthenticated;
  const isAdmin = store.getters.isAdmin;

  if (to.meta.requiresAdmin && !isAdmin) {
    next("/");
  }
  else if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  }
  else if (to.meta.requiresGuest && isAuthenticated) {
    next("/dashboard");
  }
  else {
    next();
  }

});

export default router;