<template>

  <body class="container-fluid">
    <div class="row">

      <nav class="navbar navbar-expand-lg navbar-color px-3">
        <div class="col-md-6">
          <div class="d-flex align-items-center mx-3">
            <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
              <h1 class="text-light">T</h1>
              <img alt="logo" class="px-1" src="../assets/img/Tower.png" height="60" title="Home" />
              <h1 class="text-light">OWER</h1>
            </router-link>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="col-md-6 d-flex justify-content-end">
          <div class="d-flex mx-2" v-if="account.id">
            <button class="btn mx-5" data-bs-target="#addEventCanvas" data-bs-toggle="offcanvas">
              <span class="text-shadow selectable text-uppercase fs-3">Add Event</span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <Login />
            </div>
          </div>
          <div v-else>
            <div class="collapse navbar-collapse" id="navbarText">
              <Login />
            </div>
          </div>
        </div>
      </nav>

    </div>
  </body>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import Login from './Login.vue'
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
    }
  },
  components: { Login }
}
</script>

<style scoped>
.navbar-color {
  background-color: #2A2D3A;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.text-shadow {
  color: #b1fcdd;
  text-shadow: 0px 0px 5px #272525d7;
  font-weight: bold;
  letter-spacing: 0.08rem;
}

:hover.buttonbg {
  text-decoration-line: underline;
}
</style>
