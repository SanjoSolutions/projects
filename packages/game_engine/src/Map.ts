import { Grid2D as Grid } from "./libs/Grid2D.js";
import type { MapLayers } from "./MapLayers.js";
import type { TeleportationArea } from "./TeleportationArea.js";
import { TILE_HEIGHT, TILE_WIDTH } from "./config.js";

export class Map {
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  events: Grid;
  grid: Grid;
  objects: any[];
  teleportationAreas: any[];

  constructor(width: number, height: number, { events, floor }: MapLayers) {
    this.width = width;
    this.height = height;
    this.tileWidth = TILE_WIDTH;
    this.tileHeight = TILE_HEIGHT;
    this.events = new Grid(width, height, events);
    this.grid = new Grid(width, height, floor);
    this.objects = [];
    this.teleportationAreas = [];
  }

  addObject(object: any) {
    this.objects.push(object);
  }

  addObjectOnTop(object: any) {
    this.objects.unshift(object);
  }

  removeObject(object: any) {
    this.objects = this.objects.filter((object2) => object2 !== object);
  }

  calculateWidthInPixels() {
    return this.width * this.tileWidth;
  }

  calculateHeightInPixels() {
    return this.height * this.tileHeight;
  }

  addTeleportationArea(teleportationArea: TeleportationArea) {
    this.teleportationAreas.push(teleportationArea);
  }
}
