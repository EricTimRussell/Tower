<template>
  <div v-if="events">
    <router-link :to="{ name: 'Event', params: { id: events.id } }">
      <div v-if="events.isCancelled == false" class="card bgimg cardshadow d-flex"
        :style="{ backgroundImage: `url(${events.coverImg})` }">
        <div class="card-body">
        </div>
        <div class="glass">
          <div v-if="events.capacity > 0" class="px-3">
            <h3 class="text-shadow">{{ events.name }}</h3>
            <h5 class="text-end p-2 text-shadow">{{ new Date(events.startDate).toLocaleDateString('en-us', {
                month:
                  'short', day:
                  '2-digit'
              })
            }} || {{ events.capacity }} Tickets Left</h5>
          </div>
          <div v-else class="card-footer bg-danger glass">
            <h3>{{ events.name }} Event has Sold Out</h3>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="events.isCancelled == true" class="card bgimg cardshadow d-flex"
          :style="{ backgroundImage: `url(${events.coverImg})` }">
          <div class="card-body">
          </div>
          <div class="card-footer glass bg-danger">
            <h3 class="text-light">{{ events.name }} CANCELLED</h3>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>

export default {
  props: {
    events: { type: Object, required: false }
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
  border: 5px solid grey;
}

.cardshadow {
  box-shadow: 2px 2px 5px #0000008a;
}

.cardshadow:hover {
  transform: scale(1.1);
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
