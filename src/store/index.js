import { createStore } from 'vuex'

export default createStore({
  state: {
    nodes: null,
    node: null,
    modal: false,
    arrSpeed: {}
  },
  getters: {
    getSpeed(state) {
      return state.arrSpeed[state.node];
    },
    getNodes(state) {
      return state.nodes;
    }
  },
  mutations: {
    setNodes(state, options) {
      state.nodes = options.nodes;
    },
    setNode(state, options) {
      state.node = options.node;
    },
    setModal(state, options) {
      state.modal = options.modal;
    },
    setSpeed(state, options) {
      state.nodes[options.nameNode].options.speed = options.speed
    },
    setArrSpeed(state, options) {
      state.arrSpeed[state.node] = [];
      if (state.arrSpeed[state.node].length > 29) {
        state.arrSpeed[state.node].shift();
      }
      state.arrSpeed[state.node].push(options.speed);
    },
    setStatus(state, options) {
      state.nodes[state.node].status = options.status;
    },
  },
})
