<template>
<div class="panier">
  <h2>Mon Panier</h2>

  <div v-if="cart.length === 0">
    Panier vide
  </div>

  <div v-else>
    <div
      v-for="item in cart"
      :key="item.id"
      class="cart-item"
    >
      <h3>{{ item.nom }}</h3>
      <p>{{ item.prix }} €</p>

      <div class="quantite">
        <button @click="decrement(item.id)">-</button>
        <span>{{ item.quantite }}</span>
        <button @click="increment(item.id)">+</button>
      </div>

      <button @click="remove(item.id)">
        Supprimer
      </button>
    </div>

    <h3>Total : {{ total }} €</h3>

    <button class="pay" @click="checkout">
      💳 Payer maintenant
    </button>
  </div>
</div>
</template>

<script>
export default {
computed: {
  cart() {
    return this.$store.state.cart
  },
  total() {
    return this.$store.getters.cartTotal
  }
},
methods: {
  increment(id) {
    this.$store.dispatch("incrementItem", id)
  },
  decrement(id) {
    this.$store.dispatch("decrementItem", id)
  },
  remove(id) {
    this.$store.dispatch("removeItem", id)
  },
  checkout() {
    this.$store.dispatch("checkout")
  }
}
}
</script>

<style scoped>
.cart-item {
border: 1px solid #ddd;
padding: 10px;
margin-bottom: 10px;
}

.quantite button {
margin: 0 5px;
}

.pay {
margin-top: 20px;
padding: 10px 20px;
background: green;
color: white;
}
</style>