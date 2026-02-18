<template>
<div class="admin">
  <h2>Gestion des Commandes</h2>

  <!-- FILTRE -->
  <div class="filter">
    <label>Filtrer :</label>
    <select v-model="filterStatus">
      <option value="toutes">Toutes</option>
      <option value="en attente">En attente</option>
      <option value="validée">Validée</option>
    </select>
  </div>

  <!-- LISTE COMMANDES -->
  <div v-if="filteredOrders.length === 0">
    Aucune commande trouvée
  </div>

  <div
    v-for="order in filteredOrders"
    :key="order.id"
    class="order-card"
  >
    <p><strong>Email :</strong> {{ order.email }}</p>
    <p><strong>Total :</strong> {{ order.total }} €</p>
    <p>
      <strong>Statut :</strong>
      <span :class="order.status">
        {{ order.status }}
      </span>
    </p>

    <div class="items">
      <p><strong>Produits :</strong></p>
      <ul>
        <li v-for="item in order.items" :key="item.id">
          {{ item.nom }} —
          {{ item.quantite }} x {{ item.prix }} €
        </li>
      </ul>
    </div>

    <!-- BOUTON VALIDER -->
    <button
      v-if="order.status === 'en attente'"
      @click="valider(order.id)"
      class="validate"
    >
      ✔ Valider
    </button>
    
  </div>
</div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {

data() {
  return {
    orders: [],
    filterStatus: "toutes"
  }
},

computed: {
  filteredOrders() {
    if (this.filterStatus === "toutes") {
      return this.orders
    }
    return this.orders.filter(
      order => order.status === this.filterStatus
    )
  }
},

async mounted() {
  await this.loadOrders()
},

methods: {

  async loadOrders() {
    const snapshot = await getDocs(collection(db, "orders"))

    this.orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  },

  async valider(id) {
    await this.$store.dispatch("updateOrderStatus", {
      orderId: id,
      newStatus: "validée"
    })

    // Mise à jour locale sans recharger toute la page
    const order = this.orders.find(o => o.id === id)
    if (order) order.status = "validée"
  }
}
}
</script>

<style scoped>
.admin {
max-width: 800px;
margin: auto;
}

.order-card {
border: 1px solid #ccc;
padding: 15px;
margin-bottom: 15px;
border-radius: 5px;
}

.filter {
margin-bottom: 20px;
}

.validate {
margin-top: 10px;
background: green;
color: white;
padding: 5px 10px;
border: none;
}

.en\ attente {
color: orange;
}

.validée {
color: green;
}
</style>