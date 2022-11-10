import { Game } from "./Game.js";
import { Map as GameEngineMap } from "./Map.js";
import { TeleportationArea } from "./TeleportationArea.js";
import { Tile } from "./Tile.js";

const sand = new Tile("images/tiles/sand.png");
const f = sand;
const grass = new Tile("images/tiles/grass.png");
const g = grass;
// prettier-ignore
const map = new GameEngineMap(20, 12, {
  floor: [
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, g, g, g, g, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, g, g, g, g, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, g, g, g, g, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
  ],
});

const w = new Tile("images/tiles/wood_floor.png");
// prettier-ignore
const map2 = new GameEngineMap(20, 12, {
  floor: [
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
  ],
});

map.addTeleportationArea(
  new TeleportationArea(map.width / 2 - 0.5, map.height / 2 + 1 - 0.5, 1, 1, {
    map: map2,
    position: {
      x: 10,
      y: 10.5,
    },
  })
);
map2.addTeleportationArea(
  new TeleportationArea(9, 11, 2, 1, {
    map: map,
    position: {
      x: 9,
      y: 7,
    },
  })
);

const maps = [map, map2];
const game = new Game(document.body, maps);
game.initialize();
game.start();
