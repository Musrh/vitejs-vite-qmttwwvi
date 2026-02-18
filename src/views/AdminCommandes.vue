<template>
<div class="admin">
  <h2>Gestion des commandes</h2>

  <div
    v-for="commande in commandes"
    :key="commande.id"
    class="card"
  >
    <h3>Commande ID : {{ commande.id }}</h3>

    <p><strong>Email :</strong> {{ commande.email }}</p>
    <p><strong>User ID :</strong> {{ commande.userId }}</p>
    <p><strong>Statut :</strong> {{ commande.statut }}</p>
    <p><strong>Total :</strong> {{ commande.total }} €</p>
    <p>
      <strong>Date :</strong>
      {{ formatDate(commande.date) }}
    </p>

    <h4>Produits :</h4>
    <ul>
      <li
        v-for="item in commande.items"
        :key="item.id"
      >
        {{ item.nom }} —
        {{ item.prix }} € ×
        {{ item.quantite }}
      </li>
    </ul>

    
    <button
    v-if="commande.status==='en attente'"
    @click="validerCommande(commande.id)"
  >
    Valider
  </button>

    <!-- BOUTON SUPPRIMER -->
    <button
      class="delete"
      @click="supprimerCommande(commande.id)"
    >
      Supprimer
    </button>

  </div>
</div>
</template>

<script>
import { db } from "../firebase"
import {
collection,
getDocs,
updateDoc,
deleteDoc,
doc
} from "firebase/firestore"

export default {
data() {
  return {
    commandes: []
  }
},

async mounted() {
  await this.loadCommandes()
},

methods: {

  async loadCommandes() {
    const snapshot = await getDocs(collection(db, "orders"))

    this.commandes = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }))
  },

  async validerCommande(id) {
    await updateDoc(doc(db, "orders", id), {
      statut: "validée"
    })
    await this.loadCommandes()
  },


  async supprimerCommande(id) {
    const confirmation = confirm("Supprimer cette commande ?")
    if (!confirmation) return

    await deleteDoc(doc(db, "orders", id))
    await this.loadCommandes()
  },

  formatDate(timestamp) {
    if (!timestamp) return ""
    const date = timestamp.toDate()
    return date.toLocaleString()
  }
}
}
</script>

<style scoped>
.admin {
padding: 20px;
}

.card {
border: 1px solid #ddd;
padding: 15px;
margin-bottom: 20px;
border-radius: 6px;
background: #f9f9f9;
}

button {
margin-right: 10px;
padding: 6px 10px;
}

.delete {
background: red;
color: white;
}
</style>