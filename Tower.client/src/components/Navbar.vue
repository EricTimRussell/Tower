<template>
  <nav class="navbar navbar-expand-lg navbar-color px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo"
          src="https://th.bing.com/th/id/R.feb60ce445518a16010806b26fe4532b?rik=Inyf7j%2f2JJ2roQ&riu=http%3a%2f%2fww1.prweb.com%2fprfiles%2f2017%2f08%2f17%2f14611435%2fSTADIUM+LOGO_STACKED+NEW_00000.png&ehk=gXnOlZfk9rANsAtnuWaRAEPEpXeUdzwGrSJ%2fAeBa5N0%3d&risl=&pid=ImgRaw&r=0"
          height="60" title="Home" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <Login />
    </div>
    <div>
      <button class="btn" data-bs-target="#addEventCanvas" data-bs-toggle="offcanvas">
        <span class="text-shadow selectable text-uppercase fs-3 buttonbg">Add Event</span>
      </button>
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
.navbar-color {
  background-color: #1e0c97;
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

.buttonbg {
  background-color: #1e0c97;
}

:hover.buttonbg {
  text-decoration-line: underline;
}
</style>
