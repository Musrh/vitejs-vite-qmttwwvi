<script>
import { onMounted, ref } from "vue"

export default {
  setup() {
    const session = ref(null)

    onMounted(async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const sessionId = urlParams.get("session_id")

      if (sessionId) {
        // Appelle ton backend pour récupérer les infos de la session
        const res = await fetch(`https://stripe-backend-production-2ac4.up.railway.app/session/${sessionId}`)
        const data = await res.json()
        session.value = data
        console.log("Session Stripe :", data)
      }
    })

    return { session }
  }
}
</script>

<template>
  <div>
    <h2>🎉 Paiement réussi !</h2>
    <p v-if="session">Merci pour votre commande, montant payé : {{ session.amount_total / 100 }} €</p>
    <p v-else>Chargement...</p>
    <router-link to="/panier">Retour au panier</router-link>
  </div>
</template>

