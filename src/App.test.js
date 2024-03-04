import { render, screen } from "@testing-library/react";
import ConsultaCatalogo from "./componentes/ConsultaCatalogo";

test("renders learn react link", () => {
  render(<ConsultaCatalogo />);
  const linkElement = screen.getByText(/sistema integrado de gestão/i);
  expect(linkElement).toBeInTheDocument();
});
