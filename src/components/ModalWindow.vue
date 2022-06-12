<template>
  <div class="modal">
    <el-dialog v-model="state.modal" width="50%" destroy-on-close center @open="openModal" @close="changeModal">
      <div class="modal__title">
        <el-badge
          :value=status
          class="badge"
          :type="
            state.nodes[state.node].status === 'open'
              ? 'success'
              : state.nodes[state.node].status === 'close'
              ? 'danger'
              : ''
          "
        >
          <h3>{{ this.state.node }}</h3>
        </el-badge>
        <div class="modal__switch">
          <div class="modal__switch-off">OFF</div>
          <el-switch
            v-model="statusNode"
            class="ml-2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click="statusNode === false ? setStopNode() : setStartNode()"
          />
          <div class="modal__switch-on">ON</div>
        </div>
      </div>
      <LineChart :speed="state.nodes[state.node].options.speed" />
      
    </el-dialog>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
export default {
  name: 'ModalWindow',
  components: {
    LineChart
  },
  data() {
    return {
      status: '',
      statusNode: false,
    };
  },
  computed: {
    state: {
      get: function () {
        return this.$store.state;
      },
    },
  },
  methods: {
    openModal() {

      this.status = this.state.nodes[this.state.node].status;

      if (this.status === 'open') {
        this.statusNode = true;
      } else if (this.status === 'close') {
        this.statusNode = false;
      }
    },
    changeModal() {
      this.$store.commit('setModal', {
        modal: false,
      });
    },
    setStopNode() {
      this.statusNode = false;
      this.status = 'close';
      this.$store.commit('setStatus', {
        status: 'close'
      });
      this.$emit('setStatusNode', {
        status: this.status,
        nodeName: this.state.node,
      })
    },
    setStartNode() {
      this.statusNode = true;
      this.status = 'open';
      this.$store.commit('setStatus', {
        status: 'open'
      });
      this.$emit('setStatusNode', {
        status: this.status,
        nodeName: this.state.node,
      })
    },
  },
};
</script>

<style lang="scss">
.modal {
  &__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  }
  &__switch {
    display: flex;
    // flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 130px;
    &-on {
      margin-left: 7px;
    }
    &-off {
      margin-right: 7px;
    }
  }
}
</style>
