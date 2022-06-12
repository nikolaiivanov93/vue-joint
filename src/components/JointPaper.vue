<template>
  <div id="joint">
    <div ref="joint"></div>
  </div>
</template>

<script>
export default {
  name: 'JointPaper',
  props: {
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
      default: '100%',
    },
    gridSize: {
      type: Number,
      default: 1,
    },
    drawGrid: {
      type: [Object, Boolean],
      default: false,
    },
    background: {
      type: [Object, Boolean],
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      paper: null,
    };
  },
  inject: ['$joint'],
  created() {
    this.name = this.$options.name;
    console.log(`[${this.name}] Created`, this.$joint.value);

    this.graph = new this.$joint.dia.Graph({}, { cellNamespace: this.$joint.shapes });
  },

  mounted() {
    console.log(`[${this.name}] Mounted:`, this.$refs.joint);

    this.paper = new this.$joint.dia.Paper({
      el: this.$refs.joint,
      cellViewNamespace: this.$joint.shapes,
      model: this.graph,
      width: this.width,
      height: this.height,
      gridSize: this.gridSize,
      drawGrid: this.drawGrid,
      background: this.background,
      interactive: !this.readonly,
    });

    this.paper.on('element:pointerclick', async (evt, x, y) => {
      this.$store.commit('setModal', {
        modal: true,
      });
      this.$store.commit('setNode', {
        node: evt.model.attributes.name,
      });
    });
    this.paper.on('element:mouseover', async (evt) => {
      evt.model.prop('attrs/.uml-state-body/stroke', '#517d82');
    });
    this.paper.on('element:mouseout', async (evt) => {
      evt.model.prop('attrs/.uml-state-body/stroke', '#bdc3c7');
    });

    this.$emit('init', { graph: this.graph, paper: this.paper });
  },
};
</script>

<style scoped>
#joint {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
}
</style>
