import { Grid2D as Grid } from "../../../Grid2D.js";
import { TILE_HEIGHT, TILE_WIDTH } from "./config.js";

export class Map {
  constructor(width, height, { events, floor } = {}) {
    this.width = width;
    this.height = height;
    this.tileWidth = TILE_WIDTH;
    this.tileHeight = TILE_HEIGHT;
    this.events = new Grid(width, height, events);
    this.grid = new Grid(width, height, floor);
    this.objects = [];
    this.teleportationAreas = [];
  }

  addObject(object) {
    this.objects.push(object);
  }

  addObjectOnTop(object) {
    this.objects.unshift(object);
  }

  removeObject(object) {
    this.objects = this.objects.filter((object2) => object2 !== object);
  }

  calculateWidthInPixels() {
    return this.width * this.tileWidth;
  }

  calculateHeightInPixels() {
    return this.height * this.tileHeight;
  }

  addTeleportationArea(teleportationArea) {
    this.teleportationAreas.push(teleportationArea);
  }
}
