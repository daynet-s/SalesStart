import { render } from "react-dom";
import Hello from "./Hello";

describe("Componente Hello", () => {
  it("muestra el nombre correctamente", () => {
    const root = document.createElement("div");
    document.body.appendChild(root);
    render(<Hello name="Pamela" />, root);

    const h1 = root.querySelector("[role='heading']");
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain("Pamela");
  });
});
