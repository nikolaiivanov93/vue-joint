<template>
  <div class="home">
    <JointPaper :background="background" :grid-size="gridSize" :draw-grid="drawGrid" @init="setupGraph" />
    <ScalePaper @setValueScale="setValueScale" />
    <ModalWindow @setStatusNode="setStatusNode" />
  </div>
</template>

<script>
import JointPaper from '@/components/JointPaper.vue';
import ScalePaper from '@/components/ScalePaper.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import { getJson } from '@/hooks/getJson';

export default {
  name: 'HomeView',
  components: {
    JointPaper,
    ScalePaper,
    ModalWindow,
  },
  data() {
    return {
      background: {
        color: '#ecf5ff',
      },
      gridSize: 10,
      drawGrid: true,
      graph: null,
      paper: null,
      position: {
        x: 50,
        y: window.innerHeight / 2,
      },
      state: {},
      links: [],
      link: {},
      nodes: {},
    };
  },
  inject: ['$joint'],
  computed: {
    getNodes() {
      return this.$store.getters.getNodes;
    },
  },
  watch: {
    getNodes() {
      console.log('nodes change');
      if (
        this.$store.state.node &&
        this.$store.state.nodes[this.$store.state.node].status === 'open' &&
        this.state[this.$store.state.node].attributes.attr['.uml-state-circle'].fill === '#bdc3c7'
      ) {
        this.state[this.$store.state.node].prop('attr/.uml-state-circle', '#bdc3c7');
        console.log('STATE', this.state);
      }
    },
  },
  methods: {
    setStatusNode(options) {
      console.log('setNodeStatus', this.state[options.nodeName]);
      if (options.status === 'open') {
        this.state[options.nodeName].attr('.uml-state-circle/fill', '#9eed9d');
        this.state[options.nodeName].attr('.uml-state-name/fill', '#000');
        this.state[options.nodeName].attr('.uml-state-events/fill', '#575757');
      } else if (options.status === 'close') {
        this.state[options.nodeName].attr('.uml-state-circle/fill', '#bdc3c7');
        this.state[options.nodeName].attr('.uml-state-name/fill', '#bdc3c7');
        this.state[options.nodeName].attr('.uml-state-events/fill', '#bdc3c7');
      }
    },
    setupGraph(options) {
      this.graph = options.graph;
      this.paper = options.paper;
      this.paper.scaleContentToFit({
        preserveAspectRatio: true,
        contentArea: { width: window.innerWidth, height: window.innerHeight },
        fittingBBox: { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight },
      });

      const jsonInfo = getJson();
      // console.log(jsonInfo);
      this.$store.commit('setNodes', {
        nodes: jsonInfo.nodes,
      });

      this.createGraph(jsonInfo);
    },
    createGraph(options) {
      let arr = [];

      const objectArray = Object.entries(options.nodes);

      objectArray.forEach(([key, value], i) => {
        arr.push(value);
      });

      arr.forEach((item, i) => {
        this.newElement(item, i);
      });
    },
    newElement(data, numEl) {
      this.paper.setDimensions(window.innerWidth + 1000, window.innerHeight + 1000);
      this.nodes[data.name] = data;
      if (numEl > 0) {
        this.position.x += 350;

        if (this.nodes[data.inputs[0].source].outputs.length > 1) {
          this.nodes[data.inputs[0].source].outputs.forEach((item, i) => {
            if (this.nodes[data.inputs[0].source].outputs[i].target === data.name) {
              if (data.type === 'multiple') {
                if (i === 0) {
                  this.position.y = this.state[data.inputs[0].source].attributes.position.y - 100;
                  this.position.x = this.state[data.inputs[0].source].attributes.position.x + 350;
                }
                if (i === 1) {
                  this.position.y = this.state[data.inputs[0].source].attributes.position.y + 100;
                  this.position.x = this.state[data.inputs[0].source].attributes.position.x + 350;
                }
              } else {
                if (i === 0) {
                  this.position.y = this.state[data.inputs[0].source].attributes.position.y - 180;
                  this.position.x = this.state[data.inputs[0].source].attributes.position.x + 350;
                }
                if (i === 1) {
                  this.position.y = this.state[data.inputs[0].source].attributes.position.y + 180;
                  this.position.x = this.state[data.inputs[0].source].attributes.position.x + 350;
                }
              }
            }
          });
        }
      }

      let portsIn = {
        position: {
          name: 'left',
        },
        attrs: {
          '.port-label': {
            fill: '#000',
          },
          '.port-body': {
            fill: '#fff',
            stroke: '#000',
            r: 10,
            magnet: true,
          },
        },
        label: {
          position: {
            name: 'left',
            args: {
              y: 10,
            },
          },
        },
        markup: [
          {
            tagName: 'circle',
            attributes: {
              r: 12,
              witdh: 25,
              height: 25,
              fill: '#9ad5db',
              cursor: 'pointer',
            },
          },
          {
            tagName: 'path',
            // selector: 'icon',
            attributes: {
              d: 'M -1 -4 L 3 0 L -1 4',
              fill: 'none',
              stroke: '#fff',
            },
          },
        ],
      };

      let portsOut = {
        position: {
          name: 'right',
          args: {
            y: 40,
          },
        },
        markup: [
          {
            tagName: 'circle',
            attributes: {
              r: 12,
              witdh: 25,
              height: 25,
              fill: '#9ad5db',
              cursor: 'pointer',
            },
          },
          {
            tagName: 'path',
            // selector: 'icon',
            attributes: {
              d: 'M -1 -4 L 3 0 L -1 4',
              fill: 'none',
              stroke: '#fff',
            },
          },
        ],
      };

      let joint = this.$joint;

      let El = joint.dia.Element.extend({
        markup: [
          '<g class="rotatable">',
          '<g class="scalable">',
          '<rect class="uml-state-body"/>',
          '<circle class="uml-state-circle"/>',
          '</g>',
          '<path class="uml-state-separator"/>',
          '<text class="uml-state-name"/>',
          '<text class="uml-state-events"/>',
          '</g>',
        ].join(''),

        defaults: joint.util.deepSupplement(
          {
            inPorts: [],
            outPorts: [],
            type: 'uml.State',
            position: { x: this.position.x, y: this.position.y },
            size: { width: 250, height: 80 },
            attrs: {
              '.uml-state-body': {
                width: 250,
                height: 80,
                rx: '10px',
                ry: '10px',
                fill: '#fff',
                stroke: '#bdc3c7',
                'stroke-width': 2,
              },
              '.uml-state-circle': {
                ref: '.uml-state-body',
                r: 9,
                fill: data.status === 'open' ? '#9eed9d' : data.status === 'close' ? '#bdc3c7' : '',
                'ref-y': 15,
                'ref-x': '93%',
              },
              '.uml-state-separator': {
                stroke: 'none',
                'stroke-width': 0,
              },
              '.uml-state-name': {
                ref: '.uml-state-body',
                'ref-x': 0.5,
                'ref-y': 10,
                'text-anchor': 'middle',
                fill: data.status === 'close' ? '#bdc3c7' : '#000',
              },
              '.uml-state-events': {
                ref: '.uml-state-separator',
                'ref-x': 0.1,
                'ref-y': 11,
                fill: data.status === 'close' ? '#bdc3c7' : '#575757',
                width: 150,
              },
            },

            name: data.name,
            events: data.options.speed ? [`speed: ${data.options.speed} MB/sec`] : [],
            ports: {
              groups: {
                in: data.inputs !== undefined ? portsIn : '',
                out: data.outputs !== undefined ? portsOut : '',
              },
            },
          },
          joint.shapes.basic.Generic.prototype.defaults
        ),

        initialize: function () {
          this.on({
            'change:name': this.updateName,
            'change:events': this.updateEvents,
            'change:size': this.updatePath,
          });

          this.updateName();
          this.updateEvents();
          this.updatePath();

          joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
        },

        updateName: function () {
          this.attr('.uml-state-name/text', this.get('name'));
        },

        updateEvents: function () {
          this.attr('.uml-state-events/text', this.get('events').join('\n'));
        },

        updatePath: function () {
          var d = 'M 0 20 L ' + this.get('size').width + ' 20';

          // We are using `silent: true` here because updatePath() is meant to be called
          // on resize and there's no need to to update the element twice (`change:size`
          // triggers also an update).
          this.attr('.uml-state-separator/d', d, { silent: true });
        },
      });

      let element = new El()
        // .position(200, 100)
        // .size(250, 80)
        .addTo(this.graph);

      if (data.outputs !== undefined && data.inputs !== undefined) {
        if (data.inputs.length > 1) {
          element.addPorts([
            {
              group: 'in',
            },
            {
              group: 'in',
            },
            {
              group: 'out',
            },
          ]);
        } else {
          element.addPorts([
            {
              group: 'in',
            },
            {
              group: 'out',
            },
          ]);
        }
      } else if (data.outputs !== undefined && data.inputs == undefined) {
        element.addPorts([
          {
            group: 'out',
          },
        ]);
      } else if (data.inputs !== undefined && data.outputs == undefined) {
        element.addPorts([
          {
            group: 'in',
          },
        ]);
      }
      this.state[data.name] = element;

      setInterval(() => {
        if (this.$store.state.nodes[data.name].status === 'open') {
          let speed = Math.floor(Math.random() * (10 - 5 + 1)) + 1;
          let event = [`speed: ${speed} MB/sec`];
          this.state[data.name].prop('events', event);

          // let speedNode = this.$store.state.nodes[data.name].options;
          // nodes[data.name].options.speed = event;

          this.$store.commit('setSpeed', {
            nameNode: data.name,
            speed: speed,
          });
        }
      }, 1000);

      if (data.inputs !== undefined) {
        data.inputs.forEach((item, i) => {
          // console.log(i);
          let b;
          this.state[item.source].attributes.ports.items.forEach((item, i) => {
            if (item.group === 'out') {
              b = i;
            }
          });
          if (data.inputs.length === 2) {
            this.addLink(item.source, data.name, data.status, i, b);
          } else {
            this.addLink(item.source, data.name, data.status, 0, b);
          }
        });
      }
    },
    addLink(input, output, status, a = 0, b = 1) {
      this.link[input] = new this.$joint.shapes.standard.Link({
        source: {
          id: this.state[input].id,
          port:
            this.state[input].attributes.ports.items[b] !== undefined
              ? this.state[input].attributes.ports.items[b].id
              : this.state[input].attributes.ports.items[a].id
              ? this.state[input].attributes.ports.items[a].id
              : this.state[input].attributes.ports.items[0].id,
        },
        target: {
          id: this.state[output].id,
          port: this.state[output].attributes.ports.items[a].id,
        },
      });
      this.link[input].connector('rounded');
      this.link[input].attr({
        line: { stroke: '#808080', strokeWidth: 1, targetMarker: 'none' },
      });
      this.link[input].addTo(this.graph).reparent();

      const obj = {
        name: input,
        status: this.nodes[input].status,
        link: this.link[input],
        ports: this.state[input].attributes.ports.groups,
      };
      this.links.push(obj);

      setInterval(() => {
        if (this.nodes[output].status !== 'close' && this.nodes[input].status !== 'close') {
          this.animationLinks(obj.link);
        }
      }, 1000);
    },
    animationLinks(link) {
      var token = this.$joint.V('circle', { r: 5, fill: '#9ad5db' });
      link.findView(this.paper).sendToken(token, 1500);
    },
    setValueScale(value) {
      let val = value / 100;
      this.paper.scale(val);
      // this.paper.scaleContentToFit({preserveAspectRatio: true, contentArea: {width: window.innerWidth, height: window.innerHeight}, fittingBBox: {x: 0, y: 0, width: (val + 1) * window.innerWidth/2, height: (val + 1) * window.innerHeight/2} });
      if (value > 0) {
        this.paper.setDimensions((value + 1) * window.innerWidth, (value + 1) * window.innerHeight);
      } else if (value === 0) {
        this.paper.setDimensions(window.innerWidth + 1500, window.innerHeight + 1500);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  width: 100%;
}
</style>
