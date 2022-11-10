import { Character } from "./Character.js";
import { House } from "./House.js";
import { Mouse } from "./Mouse.js";
import { Renderer } from "./Renderer.js";

export class Game {
  constructor(root, maps) {
    this.root = root;
    this.maps = maps;
    this.map = this.maps[0];
    this.character = new Character(this.map);
    this.map.addObject(this.character);
    this.house = new House();
    this.house.x = this.map.width / 2;
    this.house.y = this.map.height / 2 + 1;
    this.map.addObject(this.house);
    this.renderer = new Renderer(root, this.map);
    this.mouse = new Mouse();
    this._onPrimaryClick = this._onPrimaryClick.bind(this);
    this.mouse.onPrimaryClick(this._onPrimaryClick);
    this.mouse.listen();
    this._isRunning = false;
    this._onFrame = this._onFrame.bind(this);
  }

  start() {
    this._isRunning = true;
    window.requestAnimationFrame(this._onFrame);
  }

  stop() {
    this._isRunning = false;
  }

  _onFrame() {
    if (this._isRunning) {
      this.character.moveForOneFrame();
      this._checkForTeleportations();
      this.renderer.render();

      window.requestAnimationFrame(this._onFrame);
    }
  }

  _onPrimaryClick(event) {
    this._moveCharacter({
      x: event.pageX / this.map.tileWidth,
      y: event.pageY / this.map.tileHeight,
    });
  }

  _moveCharacter({ x, y }) {
    const waypoint = { x, y };
    this.character.waypoints.push(waypoint);
  }

  _checkForTeleportations() {
    const teleportationAreaThatCharacterIsIn = this._findTeleportationAreaThatTheCharacterIsIn();
    if (teleportationAreaThatCharacterIsIn) {
      this._teleportCharacterToTeleportationAreaTarget(
        teleportationAreaThatCharacterIsIn
      );
    }
  }

  _findTeleportationAreaThatTheCharacterIsIn() {
    return this.map.teleportationAreas.find((teleportationArea) =>
      teleportationArea.isGameObjectInside(this.character)
    );
  }

  /**
   * @param {TeleportationArea} teleportationArea
   */
  _teleportCharacterToTeleportationAreaTarget(teleportationArea) {
    this.character.waypoints = [];
    this.map.removeObject(this.character);
    const targetMap = teleportationArea.target.map;
    targetMap.addObjectOnTop(this.character);
    this.map = targetMap;
    this.renderer.map = targetMap;
    this.character.x = teleportationArea.target.position.x;
    this.character.y = teleportationArea.target.position.y;
  }

  async initialize() {
    this.renderer.initialize();
    await this.renderer.render();
  }
}
