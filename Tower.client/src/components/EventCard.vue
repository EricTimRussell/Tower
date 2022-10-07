<template>
  <router-link :to="{name: 'Event', params: {id: events.id}}">
    <div class="card text-light bgimg cardshadow " :style="{backgroundImage: `url(${events.coverImg})`}">
      <div class="card-body">
      </div>
      <div class="card-footer glass">
        <h3 class="text-shadow">{{events.name}}</h3>
        <div>
          <h5 class="text-end p-2 text-shadow">{{events.capacity}} Tickets Left</h5>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
export default {
  props: {
    events: { type: Object, required: true }
  },
  setup() {

    return {

    }
  }
}
</script>


<style lang="scss" scoped>
.bgimg {
  height: 35vh;
  background-position: center;
  background-size: cover;
  border: 5px solid #2929ff8e;
}

.cardshadow {
  box-shadow: 2px 2px 5px #0000008a;
}

.text-shadow {
  color: #b1fcdd;
  text-shadow: 0px 0px 5px #272525d7;
  font-weight: bold;
  letter-spacing: 0.08rem;
}

.glass {
  background: #aed1ff7e;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.8px);
  -webkit-backdrop-filter: blur(4.8px);
}
</style>
