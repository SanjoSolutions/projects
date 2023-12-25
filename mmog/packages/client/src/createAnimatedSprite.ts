import { AnimatedSprite, Resource, Texture } from "pixi.js"

export function createAnimatedSprite(
  textures: Texture<Resource>[],
): AnimatedSprite {
  const animatedSprite = new AnimatedSprite(textures)
  animatedSprite.animationSpeed = 0.115
  animatedSprite.anchor.set(0.5, 1)
  return animatedSprite
}
