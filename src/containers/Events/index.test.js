import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },
    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When Events is created", () => {
  it("a list of event cards is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    await act(async () => {
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
    });
    const months = await screen.findAllByText("avril");
    expect(months).toHaveLength(2);
  });

  describe("and we select a category", () => {
    it("a filtered list is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      await act(async () => {
        render(
          <DataProvider>
            <Events />
          </DataProvider>
        );
      });

      await screen.findByText("Forum #productCON");

      fireEvent.click(await screen.findByTestId("collapse-button-testid"));

      const categoryElements = await screen.findAllByText("soirée entreprise");
      const categoryElement = categoryElements.find(el => el.tagName === "LI"); 
      fireEvent.click(categoryElement);


      await screen.findByText("Conférence #productCON");

      await waitFor(() => {
        expect(screen.queryByText("Forum #productCON")).toBeNull();
      });
    });
  });
});