<template>
    <div>
        <h2>Dashboard</h2>
            <p>Welcome {{ userEmail }}</p>
              </div>
              </template>

              <script>
              import { mapGetters } from "vuex";

              export default {
                computed: {
                    ...mapGetters(["userEmail"])
                      }
                      };
                      </script>