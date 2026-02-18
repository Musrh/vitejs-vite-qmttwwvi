<template>
<div class="produits">
  <h2>Nos Produits</h2>

  <div class="grid">
    <div
      class="card"
      v-for="produit in produits"
      :key="produit.id"
    >
      <!-- IMAGE -->
      <img
        :src="produit.image"
        alt="image produit"
        class="product-image"
      />

      <h3>{{ produit.nom }}</h3>
      <p>Prix : {{ produit.prix }} €</p>

      <button @click="add(produit)">
        Ajouter au panier
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from "vuex"

export default {
computed: {
  ...mapState(["produits"])
},
methods: {
  add(produit) {
    this.$store.dispatch("addToCart", produit)
  }
}
}
</script>

<style scoped>
.produits {
padding: 20px;
}

.grid {
display: flex;
gap: 20px;
flex-wrap: wrap;
}

.card {
border: 1px solid #ddd;
padding: 15px;
width: 200px;
text-align: center;
border-radius: 6px;
}

.product-image {
width: 100%;
height: 150px;
object-fit: cover;
margin-bottom: 10px;
}
</style>