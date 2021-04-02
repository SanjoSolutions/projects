/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import { createContainer } from "./createContainer";
import { Page } from "./Page";

function PageTransition({ children }: { children?: any } = {}) {
  const pageCount = 2;
  const pages = new Array(pageCount)
    .fill(undefined)
    .map(() => React.createRef<HTMLDivElement>());

  React.useEffect(() => {
    for (let index = 0; index < pages.length; index++) {
      pages[index].current!.style.zIndex = String(1001 + index);
    }
    const animation = pages[1].current!.animate(
      [{ transform: "translateY(100vh)" }, { transform: "translateY(0vh)" }],
      {
        id: "pageTransition",
        duration: 1500,
        easing: "linear",
        fill: "forwards",
      }
    );
    // animation.onfinish = () => console.log('FINISHED')
  }, [...pages]);

  return (
    <div className="page-transition">
      <div className="page" ref={pages[0]}>
        {children[0]}
      </div>
      <div className="page" ref={pages[1]}>
        {children[1]}
      </div>
    </div>
  );
}

describe("PageTransition", () => {
  let container: HTMLDivElement;

  beforeEach(function () {
    container = createContainer();
  });

  it.skip("transitions from one page to another", () => {
    const page1 = <Page key={1}></Page>;
    const page2 = <Page key={2}></Page>;
    const pageTransition = <PageTransition>{[page1, page2]}</PageTransition>;
    act(() => {
      render(pageTransition, container);
    });
    const $pageTransition = container.querySelector(".page-transition");
    // FIXME: mock Element.animate from jsdom?
    expect($pageTransition).not.toBeNull();
    expect($pageTransition!.children).toHaveLength(2);
  });
});
