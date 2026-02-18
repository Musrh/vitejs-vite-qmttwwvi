<template>
<div>
<nav>
<router-link to="/">Home</router-link> |
<router-link to="/contact">Contact</router-link> |

<router-link to="/produits">Produits</router-link>

<router-link v-if="isAdmin" to="/admin">
    Admin
    </router-link>

<router-link to="/panier">Panier</router-link>
  
</nav>

<router-link v-if="!isAuthenticated" to="/login">
  Login
</router-link>

<router-link v-if="isAuthenticated" to="/dashboard">
  Dashboard
</router-link>

<span v-if="isAuthenticated">
  | {{ userEmail }}
  <button @click="logout">Logout</button>
</span>
</nav>

  <router-view />
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
computed: {
  ...mapGetters(["isAuthenticated", "userEmail"]),

  ...mapGetters(["isAuthenticated", "userEmail", "isAdmin"])
},
methods: {
  logout() {
    this.$store.dispatch("logout");
  }
}
};
</script>