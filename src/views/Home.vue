<template>
<div class="home">
  <h1>Bienvenue dans notre boutique</h1>

  <div class="slider">

    <transition name="slide" mode="out-in">
      <div class="slide-card" :key="currentProduit.id">

        <img
          :src="currentProduit.image"
          class="product-image"
        />

        <h3>{{ currentProduit.nom }}</h3>
        <p>{{ currentProduit.prix }} €</p>

        <router-link to="/produits">
          <button>Voir produits</button>
        </router-link>

      </div>
    </transition>

    <!-- Boutons navigation -->
    <button class="prev" @click="prevSlide">‹</button>
    <button class="next" @click="nextSlide">›</button>

    <!-- Indicateurs -->
    <div class="dots">
      <span
        v-for="(p, index) in produits"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></span>
    </div>

  </div>
</div>
</template>

<script>
import { mapState } from "vuex"

export default {
data() {
  return {
    currentIndex: 0,
    interval: null
  }
},

computed: {
  ...mapState(["produits"]),

  currentProduit() {
    return this.produits[this.currentIndex] || {}
  }
},

mounted() {
  this.startSlider()
},

beforeUnmount() {
  clearInterval(this.interval)
},

methods: {
  startSlider() {
    this.interval = setInterval(() => {
      this.nextSlide()
    }, 3000)
  },

  nextSlide() {
    this.currentIndex =
      (this.currentIndex + 1) % this.produits.length
  },

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.produits.length) %
      this.produits.length
  },

  goToSlide(index) {
    this.currentIndex = index
  }
}
}
</script>

<style scoped>
.home {
text-align: center;
padding: 40px;
}

.slider {
position: relative;
width: 320px;
margin: 40px auto;
}

.slide-card {
background: white;
padding: 20px;
border-radius: 15px;
box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.product-image {
width: 100%;
height: 220px;
object-fit: cover;
border-radius: 12px;
margin-bottom: 15px;
}

/* Animation */
.slide-enter-active,
.slide-leave-active {
transition: all 0.6s ease;
}

.slide-enter-from {
opacity: 0;
transform: translateX(100px);
}

.slide-leave-to {
opacity: 0;
transform: translateX(-100px);
}

/* Boutons */
button {
margin-top: 10px;
padding: 8px 14px;
border: none;
background: #42b983;
color: white;
border-radius: 6px;
cursor: pointer;
}

.prev, .next {
position: absolute;
top: 45%;
background: rgba(0,0,0,0.5);
color: white;
width: 35px;
height: 35px;
border-radius: 50%;
}

.prev { left: -50px; }
.next { right: -50px; }

/* Points */
.dots {
margin-top: 15px;
}

.dots span {
display: inline-block;
width: 10px;
height: 10px;
margin: 5px;
background: #ccc;
border-radius: 50%;
cursor: pointer;
}

.dots span.active {
background: #42b983;
}
</style>