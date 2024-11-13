import { fireEvent, render, screen } from "@testing-library/react";
import Select from "./index";

describe("Select Component", () => {
  
  it("displays a list of choices with a default option 'Toutes'", () => {
    render(<Select selection={["value1", "value2"]} />);
    
    const selectElement = screen.getByTestId("select-testid");
    const defaultOption = screen.getByText("Toutes");
    
    expect(selectElement).toBeInTheDocument();
    expect(defaultOption).toBeInTheDocument();
  });

  it("displays a collapse action button", () => {
    render(<Select selection={["value1", "value2"]} />);  
    
    const collapseButton = screen.getByTestId("collapse-button-testid");
    
    expect(collapseButton).toBeInTheDocument();
  });

  describe("with a label", () => {
    it("displays the label", () => {
      render(<Select label="label" selection={["value1", "value2"]} />);
      
      const labelElement = screen.getByText("label");
      
      expect(labelElement).toBeInTheDocument();
    });
  });

  describe("when the collapse button is clicked", () => {
    it("displays the list of values", () => {
      render(<Select selection={["value1", "value2"]} />);
      
      const collapseButton = screen.getByTestId("collapse-button-testid");
      fireEvent.click(collapseButton);

      const value1 = screen.getByText("value1");
      const value2 = screen.getByText("value2");
      
      expect(value1).toBeInTheDocument();
      expect(value2).toBeInTheDocument();
    });

    describe("when a value is selected", () => {
      it("calls the onChange callback", () => {
        const onChange = jest.fn();
        render(<Select selection={["value1", "value2"]} onChange={onChange} />);
        
        const collapseButton = screen.getByTestId("collapse-button-testid");
        fireEvent.click(collapseButton);

        const value1 = screen.getByText("value1");
        fireEvent.click(value1);

        expect(onChange).toHaveBeenCalledTimes(1);

        fireEvent.click(collapseButton);
        const defaultOption = screen.getByText("Toutes");
        fireEvent.click(defaultOption);

        expect(onChange).toHaveBeenCalledTimes(2);
      });
    });
  });
});