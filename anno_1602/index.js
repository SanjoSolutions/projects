const resources = new Set(["wood", "water"]);

const woodworker = {
  wood: 2,
  water: -1,
};

const fountain = {
  water: 1,
};

const factories = [woodworker, fountain];
const totalYield = calculateTotalYield(factories);
const timeInterval = hours(1);
const yield = calculateYieldInTimeInterval(timeInterval, totalYield);

/**
 *
 * @param {object[]} factories Factories
 */
export function calculateTotalYield(factories) {
  return sum(factories);
}

/**
 *
 * @param {number} timeInterval Time interval in seconds.
 * @param {object} yield Yield
 */
export function calculateYieldInTimeInterval(timeInterval, yield) {
  return times(timeInterval, yield);
}

export function sum(array) {
  if (typeof array[0] === "number") {
    return sumNumbers(array);
  } else {
    return sumObjects(array);
  }
}

function sumObjects(objects) {
  const keys = Array.from(
    new Set(objects.map((object) => Object.keys(object)).flat())
  );
  return Object.fromEntries(
    keys.map((key) => [key, sum(objects.map((object) => object[key] ?? 0))])
  );
}

function sumNumbers(numbers) {
  return numbers.reduce(plus);
}

function plus(a, b) {
  return a + b;
}

export function times(number, object) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, number * value])
  );
}

/**
 * Converts hours into seconds.
 * @param {number} amount Number of hours
 */
export function hours(amount) {
  return amount * 60 * 60;
}
