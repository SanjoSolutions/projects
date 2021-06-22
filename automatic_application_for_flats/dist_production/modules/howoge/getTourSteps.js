"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getTourSteps = getTourSteps;

async function getTourSteps(tour) {
  return await tour.$$(".step-content");
}
//# sourceMappingURL=getTourSteps.js.map
