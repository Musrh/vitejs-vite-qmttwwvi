import { createStore } from "vuex";
import { auth, db } from "./firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";

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

  mutations: {

  ADD_TO_CART(state, produit) {
      const item = state.cart.find(p => p.id === produit.id)

        if (item) {
            item.quantite++
              } else {
                  state.cart.push({ ...produit, quantite: 1 })
                    }
                    }
  },

    SET_USER(state, user) {
      state.user = user;
    },

    SET_ROLE(state, role) {
      state.role = role;
    }
  },

  actions: {

  addToCart({ commit }, produit) {
      commit("ADD_TO_CART", produit)
      }
  },


    // 🔹 REGISTER
    async register({ commit }, { email, password }) {
      try {

        const userCredential =
          await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        // Attendre que l'utilisateur soit bien chargé
        await user.reload();

        // Enregistrer dans Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          role: "user", // par défaut
          createdAt: serverTimestamp()
        });

        commit("SET_USER", user);
        commit("SET_ROLE", "user");

      } catch (error) {
        console.error("Register error:", error);
        throw error;
      }
    },


    // 🔹 LOGIN
    async login({ commit }, { email, password }) {
      try {

        const userCredential =
          await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        commit("SET_USER", user);

        // Charger le rôle depuis Firestore
        const docSnap = await getDoc(doc(db, "users", user.uid));

        if (docSnap.exists()) {
          commit("SET_ROLE", docSnap.data().role);
        }

      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },


    // 🔹 LOGOUT
    async logout({ commit }) {
      await signOut(auth);
      commit("SET_USER", null);
      commit("SET_ROLE", null);
    },


    // 🔹 INIT AUTH (au refresh)
    initAuth({ commit }) {
      onAuthStateChanged(auth, async user => {

        commit("SET_USER", user);

        if (user) {
          const docSnap = await getDoc(doc(db, "users", user.uid));

          if (docSnap.exists()) {
            commit("SET_ROLE", docSnap.data().role);
          }
        } else {
          commit("SET_ROLE", null);
        }

      });
    },

  

  getters: {
    isAuthenticated: state => !!state.user,
    userEmail: state => state.user?.email,
    isAdmin: state => state.role === "admin"
  }

});