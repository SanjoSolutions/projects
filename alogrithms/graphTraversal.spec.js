class Graph {
  constructor(nodes) {
    this.nodes = nodes;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.connections = [];
  }
}

function connect(a, b) {
  a.connections.push(b);
  b.connections.push(a);
}

function findFirstMatch(graph, matcher) {
  return graph.nodes.find(matcher);
}

function findMatches(graph, matcher) {
  return graph.nodes.filter(matcher);
}

describe("connect", () => {
  it("connects two nodes", () => {
    const a = new Node();
    const b = new Node();
    connect(a, b);
    expect(a.connections).toHaveLength(1);
    expect(a.connections[0]).toBe(b);
    expect(b.connections).toHaveLength(1);
    expect(b.connections[0]).toBe(a);
  });
});

describe("findFirstMatch", () => {
  it("finds the first match", () => {
    const a = new Node("a");
    const b = new Node("b");
    const c = new Node("c");
    connect(a, b);
    connect(b, c);
    const graph = new Graph([a, b, c]);
    const matcher = (node) => {
      return node.value === "b";
    };
    const match = findFirstMatch(graph, matcher);
    expect(match).toBe(b);
  });
});

describe("findMatches", () => {
  it("finds matches", () => {
    const a = new Node("m");
    const b = new Node("f");
    const c = new Node("f");
    connect(a, b);
    connect(a, c);
    connect(b, c);
    const graph = new Graph([a, b, c]);
    const matcher = (node) => {
      return node.value === "f";
    };
    const matches = findMatches(graph, matcher);
    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe(b);
    expect(matches[1]).toBe(c);
  });
});
