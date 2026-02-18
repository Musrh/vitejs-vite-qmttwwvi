import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"

const app = createApp(App);

app.use(router);
app.use(store);

store.dispatch("initAuth");

onAuthStateChanged(auth, (user) => {
    if (!user) {
        router.push("/")
          }
})



app.mount("#app");
