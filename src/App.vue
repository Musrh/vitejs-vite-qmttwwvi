<template>
<div>
<nav>
<router-link to="/">Home</router-link> |
<router-link to="/contact">Contact</router-link> |

<router-link to="/produits">Produits</router-link>|

<router-link v-if="isAdmin" to="/admin">
    Admin
    </router-link>

<router-link v-if="!isAuthenticated" to="/login">
  Login
</router-link>

<router-link to="/panier">
    🛒 ({{ $store.getters.cartItemCount }})
    </router-link>

  <router-link v-if="$store.getters.isAdmin" to="/admin-commandes">
          Admin Commandes
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
  this.$router.dispatch("/");
  }
}
};
</script>

<style>

nav {
    margin-left: 0px;
      font-weight: bold;
        color: green;
        }



</style>