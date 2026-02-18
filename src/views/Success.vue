<template>
  <div>
    <h2>🎉 Paiement réussi !</h2>
    <p v-if="session">
      Merci pour votre commande. Vous avez payé {{ session.amount_total / 100 }} € pour les articles suivants :
    </p>

    <div v-if="session">
      <ul>
        <li v-for="item in session.line_items.data" :key="item.id">
          {{ item.quantity }} x {{ item.price.product.name }} = {{ item.amount_total / 100 }} €
        </li>
      </ul>
    </div>

    <p v-else>Chargement...</p>

    <router-link to="/panier">Retour au panier</router-link>
  </div>
</template>

<script>
import { onMounted, ref } from "vue"

export default {
  setup() {
    const session = ref(null)

    onMounted(async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const sessionId = urlParams.get("session_id")

      if (sessionId) {
        // Récupère les informations de la session depuis ton backend
        const res = await fetch(`https://stripe-backend-production-2ac4.up.railway.app/session/${sessionId}`)
        const data = await res.json()
        session.value = data
        console.log("Détails de la session Stripe :", data)
      }
    })

    return { session }
  }
}
</script>

<style scoped>
/* Styles pour la page de succès */
</style>

