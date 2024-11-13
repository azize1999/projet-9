import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import Home from "./index";

describe("Home Page Integration Tests", () => {

  it("displays the slider section", async () => {
    render(<Home />);
    const sliderSection = await screen.findByTestId("slider", {}, { timeout: 2000 });
    expect(sliderSection).toBeInTheDocument();
  });
  

  it("displays the services section with service cards", async () => {
    render(<Home />);
    const serviceSection = await waitFor(() => screen.findByTestId("services"));
    
    const serviceCards = within(serviceSection).getAllByRole("heading", { level: 3 });
    expect(serviceCards.length).toBe(3); 
  });
  

  it("displays success message after contact form submission", async () => {
    render(<Home />);

    fireEvent.click(await screen.findByText("Envoyer"));

    const successMessage = await screen.findByText("Message envoyé !");
    expect(successMessage).toBeInTheDocument();
  });
});
