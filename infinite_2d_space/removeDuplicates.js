export function removeDuplicates(points) {
  const duplicateFreePoints = [];
  const lookup = new Map();
  for (const point of points) {
    const { x, y } = point;
    let set = lookup.get(x);
    if (!set || !set.has(y)) {
      duplicateFreePoints.push(point);
      if (!set) {
        set = new Set();
        lookup.set(x, set);
      }
      set.add(y);
    }
  }
  return duplicateFreePoints;
}
