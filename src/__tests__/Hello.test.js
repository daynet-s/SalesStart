import React, { act } from "react";              
import { createRoot } from "react-dom/client";
import Hello from "./Hello.jsx";

describe("Hello", () => {
  let container, root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
    container = null;
  });

  it("renderiza con JSX", () => {
    act(() => {
      root.render(<Hello name="Pamela" />);
    });
    const h1 = container.querySelector('[role="heading"]');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain("Pamela");
  });
});
