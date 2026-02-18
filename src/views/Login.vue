<template>
<div>
  <h2>Authentication</h2>

  <div>
    <h3>Register</h3>
    <input v-model="regEmail" placeholder="Email" />
    <input v-model="regPassword" type="password" placeholder="Password" />
    <button @click="register">Register</button>
  </div>

  <hr />

  <div>
    <h3>Login</h3>
    <input v-model="logEmail" placeholder="Email" />
    <input v-model="logPassword" type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>

  <p v-if="error" style="color:red">{{ error }}</p>
</div>
</template>

<script>
export default {
data() {
  return {
    regEmail: "",
    regPassword: "",
    logEmail: "",
    logPassword: "",
    error: ""
  };
},
methods: {

async register() {
    try {
        await this.$store.dispatch("register", {
              email: this.regEmail,
                    password: this.regPassword
                        });

                            this.$router.push("/dashboard");
                              } catch (err) {
                                  this.error = err.message;
                                    }
                                    },                         

   async login() {
                                      try {
                                          await this.$store.dispatch("login", {
                                                email: this.logEmail,
                                                      password: this.logPassword
                                                          });

                                                              this.$router.push("/dashboard");
                                                                } catch (err) {
                                                                    this.error = err.message;
                                                                      }
                                                                      }
}

};
</script>