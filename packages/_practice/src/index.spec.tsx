/**
 * @jest-environment jsdom
 */

import React from "react";
import ReactDOM from "react-dom";

function createGreeting({
  greeting,
  name,
}: {
  greeting: string;
  name: string;
}): string {
  return greeting + " " + name;
}

function Greeting({ greeting, name }: { greeting: string; name: string }) {
  return <div>{createGreeting({ greeting, name })}</div>;
}

describe("Greeting", () => {
  it('renders "Hello Susi"', () => {
    const element = <Greeting greeting={"Hello"} name={"Susi"} />;
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(element, container);
    expect(container.innerHTML).toEqual(
      "<div>" + createGreeting({ greeting: "Hello", name: "Susi" }) + "</div>"
    );
  });
});
