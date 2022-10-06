<template>
  <div class="glass page-bg">
    <div class="card col-12 d-flex">
      <img :src="event.coverImg"
        alt="https://th.bing.com/th/id/R.17502cb38ba111f3a64fac3e24fe2def?rik=ZGzhlgoUXnLYjQ&pid=ImgRaw&r=0">
      <h2>{{event.name}}||{{event.date}}</h2>
      <h3>{{event.type}}</h3>
      <h6>{{event.description}}</h6>
      <div class="card-footer">
        <h5>{{event.capacity}}</h5>
        <button class="btn btn-info mdi mdi-human">Attend</button>
      </div>
    </div>
  </div>







</template>
<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";

export default {
  props: {
    event: { type: Object, required: true }
  },
  setup() {
    return {
      event: computed(() => AppState.events)
    }
  }
}
</script>


<style lang="scss" scoped>
.glass {
  background: #aed1ff7e;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.8px);
  -webkit-backdrop-filter: blur(4.8px);
}

.page-bg {
  background-image: url(https://th.bing.com/th/id/R.dc8f14684b69cfc0d4b618cffcac86a6?rik=plXUGz%2bQ9h%2fMBQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f38TYCLK.jpg&ehk=D8qmcuStUPeNvjwN%2bDXC91b0YOqhDBg9ZKJ02Vpfe0A%3d&risl=&pid=ImgRaw&r=0);
  min-height: 110vh;
}
</style>