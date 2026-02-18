<template>
<div class="success-page">
  <h2>🎉 Paiement réussi !</h2>
  <p>Merci pour votre commande. Votre paiement a été accepté.</p>
  <router-link to="/panier">
    Retour au panier
  </router-link>
</div>
</template>

<script>
export default {
name: "Success"
}
</script>

<style scoped>
.success-page {
text-align: center;
margin-top: 50px;
}

.success-page h2 {
color: green;
}

.success-page p {
margin: 15px 0;
}

.success-page a {
display: inline-block;
margin-top: 20px;
padding: 10px 20px;
background-color: #42b983;
color: white;
border-radius: 6px;
text-decoration: none;
}

.success-page a:hover {
background-color: #369870;
}
</style>