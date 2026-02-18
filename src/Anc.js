import { createStore } from "vuex"
import { auth, db } from "./firebase"

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore"

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"

import { collection, addDoc } from "firebase/firestore"

import { doc, updateDoc } from "firebase/firestore"


export default createStore({

  state: {
    user: null,
    role: null,
    cart: [],

    produits: [
      { id: 1, nom: "Produit A", prix: 100 },
      { id: 2, nom: "Produit B", prix: 200 },
      { id: 3, nom: "Produit C", prix: 300 }
    ]
  },

  getters: {
    isAuthenticated: state => !!state.user,
    isAdmin: state => state.role === "admin",
    cartItemCount: state =>
      state.cart.reduce((total, item) => total + item.quantite, 0),

      cartTotal: state =>
  state.cart.reduce(
    (total, item) => total + item.prix * item.quantite,
    0
  )


  },

  mutations: {

    INCREMENT_ITEM(state, id) {
      const item = state.cart.find(p => p.id === id)
      if (item) item.quantite++
    },
    
    DECREMENT_ITEM(state, id) {
      const item = state.cart.find(p => p.id === id)
      if (item && item.quantite > 1) {
        item.quantite--
      }
    },
    
    REMOVE_ITEM(state, id) {
      state.cart = state.cart.filter(p => p.id !== id)
    },
    
    CLEAR_CART(state) {
      state.cart = []
    },

    SET_USER(state, user) {
      state.user = user
    },

    SET_ROLE(state, role) {
      state.role = role
    },

    LOGOUT(state) {
      state.user = null
      state.role = null
      state.cart = []
    },

    ADD_TO_CART(state, produit) {
      const item = state.cart.find(p => p.id === produit.id)

      if (item) {
        item.quantite++
      } else {
        state.cart.push({ ...produit, quantite: 1 })
      }

      console.log("Panier actuel:", state.cart)
    }
  },

  actions: {

    // 🔹 Initialisation auth au démarrage
    initAuth({ commit }) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          commit("SET_USER", user)

          const docRef = doc(db, "users", user.uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            commit("SET_ROLE", docSnap.data().role)
          }
        }
      })
    },

  incrementItem({ commit }, id) {
      commit("INCREMENT_ITEM", id)
      },

      decrementItem({ commit }, id) {
        commit("DECREMENT_ITEM", id)
        },

        removeItem({ commit }, id) {
          commit("REMOVE_ITEM", id)
          },


          async checkout({ state, commit }) {

            if (!state.user) {
              alert("Vous devez être connecté pour payer")
              return
            }
          
            if (state.cart.length === 0) {
              alert("Panier vide")
              return
            }
          
            try {
          
              await addDoc(collection(db, "orders"), {
                userId: state.user.uid,
                email: state.user.email,   // ✅ AJOUT EMAIL
                items: state.cart,
                total: state.cart.reduce(
                  (t, item) => t + item.prix * item.quantite,
                  0
                ),
                createdAt: serverTimestamp(),  // ✅ mieux que new Date()
                status: "en attente"
              })
          
              alert("Commande enregistrée ✅")
              commit("CLEAR_CART")
          
            } catch (error) {
              console.error(error)
              alert("Erreur lors de la commande")
            }
          },
          

    // 🔹 Register
    async register({ commit }, { email, password }) {
      const userCredential =
        await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
        createdAt: serverTimestamp()
      })

      commit("SET_USER", user)
      commit("SET_ROLE", "user")
    },

   async updateOrderStatus({ state }, { orderId, newStatus }) {

       if (state.role !== "admin") {
           alert("Accès refusé")
               return
                 }

                   try {
                       const orderRef = doc(db, "orders", orderId)

                           await updateDoc(orderRef, {
                                 status: newStatus
                                     })

                                         alert("Statut mis à jour ✅")

                                           } catch (error) {
                                               console.error(error)
                                                   alert("Erreur mise à jour")
                                                     }
                                                     
   },



    // 🔹 Login
    async login({ commit }, { email, password }) {
      const userCredential =
        await signInWithEmailAndPassword(auth, email, password)

      const user = userCredential.user
      commit("SET_USER", user)

      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        commit("SET_ROLE", docSnap.data().role)
      }
    },

    // 🔹 Logout
    async logout({ commit }) {
      await signOut(auth)
      commit("LOGOUT")
    },

    // 🔹 Ajouter panier
    addToCart({ commit }, produit) {
      commit("ADD_TO_CART", produit)
    }
  }
})