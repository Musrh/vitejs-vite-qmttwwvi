
<template>
  <nav>
    <button @click="showPanier = !showPanier">Panier</button>
  </nav>

  <div v-if="showPanier" class="panier-dropdown">
    <ul>
      <li v-for="item in panier" :key="item.id">
        {{ item.nom }} - {{ item.prix }} € x {{ item.quantity }}
      </li>
    </ul>
    <button @click="payer">Payer</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPanier: false,
      panier: JSON.parse(localStorage.getItem('panier') || '[]')
    }
  },
  methods: {
    async payer() {
      const res = await fetch('https://stripe-backend-production-2ac4.up.railway.app/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: this.panier })
      })
      const data = await res.json()
      window.location.href = data.url
    }
  }
}
</script>
