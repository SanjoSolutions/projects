export function flat<T>(set: Set<any>, depth: number = 1): any {
  const array = prepareSetForFlattening(set, depth);
  return new Set(array.flat(depth));
}

function prepareSetForFlattening(set: Set<any>, depth: number): any[] {
  let arraysWithElementsToPrepare = [Array.from(set)];
  for (
    let preparationForDepth = 1;
    preparationForDepth <= depth;
    preparationForDepth++
  ) {
    arraysWithElementsToPrepare = arraysWithElementsToPrepare.map((elements) =>
      prepareElements(elements)
    );
    arraysWithElementsToPrepare = arraysWithElementsToPrepare[0];
  }
  return arraysWithElementsToPrepare;
}

function prepareElements(elements: any[]): any[] {
  return elements.map((element) =>
    element instanceof Set ? Array.from(element) : element
  );
}
