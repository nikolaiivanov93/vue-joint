import "jointjs/dist/joint.core.css";

import { dia, elementTools, V, g, util } from "jointjs/src/core.mjs";
import * as standard from "jointjs/src/shapes/standard.mjs";
import * as basic from 'jointjs/src/shapes/basic.mjs';
// import element from "jointjs/src/elementTools/index.mjs";

// export default {
//   install: function (Vue) {
//     let joint = { dia };
//     joint.shapes = { standard };
//     Object.defineProperty(Vue.prototype, "$joint", { value: joint });
//   },
// };

export function vuePrototype() {
  let joint = { dia, elementTools, V, g, util };
  joint.shapes = { standard, basic };
  // joint.elementTools = { elementTools };
  return joint;
}
