import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

function HelloReact() {
  return React.createElement("div", null, "Hola React");
}

describe("hello react (sin JSX)", () => {
  it("renderiza un texto", () => {
    const mount = document.createElement("div");
    document.body.appendChild(mount);
    const root = createRoot(mount);

    act(() => {
      root.render(React.createElement(HelloReact));
    });

    expect(mount.textContent).toContain("Hola React");

    act(() => {
      root.unmount();
    });
    document.body.removeChild(mount);
  });
});
