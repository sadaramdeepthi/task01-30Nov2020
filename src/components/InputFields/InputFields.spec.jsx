import { configure, mount, unMount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import _ from "lodash";
import React from "react";
import InputFields from "./InputFields";

configure({ adapter: new Adapter() });

describe("InputFields", () => {
  it("checking if InputFields component is loaded", () => {
    const component = mount(<InputFields />);
    const input = component.find(".inputfields-container");
    expect(input.exists()).toBe(true);
  });

  it("Checking if button is loaded", () => {
    const component = mount(<InputFields />);
    const button = component.find("Button").at(0);
    expect(button.exists()).toBe(true);
    button.simulate("click");
  });

  it("Checking if Form is loaded", () => {
    const component = mount(<InputFields />);
    const form = component.find("Form");
    expect(form.exists()).toBe(true);
  });

  it("checking if Table component is not loaded as the intitial data array is empty", () => {
    const component = mount(<InputFields />);
    const table = component.find("Table");
    expect(table.exists()).toBe(false);
    const noItemsWrapper = component.find(".noItemsWrapper");
    expect(noItemsWrapper.text()).toBe("No Movie Records Available...");
  });

  it("Checking when Button clicked errors displayed or not and also checking how many errors are displayed.", () => {
    const component = mount(<InputFields />);
    const inlineErrors = component.find("InlineErrors");
    expect(inlineErrors.exists()).toBe(false);

    const button = component.find("Button");
    button.simulate("click");
    const inlineErrorsAfterSubmit = component.find("InlineErrors");
    expect(inlineErrorsAfterSubmit.exists()).toBe(true);
    expect(inlineErrorsAfterSubmit).toHaveLength(2);
    expect(inlineErrorsAfterSubmit.at(0).props().text).toBe(
      "Movie name can't be blank"
    );
    expect(inlineErrorsAfterSubmit.at(1).props().text).toBe(
      "Movie rating can't be blank"
    );
  });

  it("Checking when the data entered and button clicked , then the data displays in table.", () => {
    const component = mount(<InputFields />);
    const table = component.find("Table");
    expect(table.exists()).toBe(false);

    const nameControl = component.find("input.movieName");
    nameControl.simulate("change", { target: { value: "Bahubhali" } });
    const ratingControl = component.find("input.movieRating");
    ratingControl.simulate("change", { target: { value: "9" } });

    const button = component.find("Button");
    button.simulate("click");
    component.update();
    const tableAfterSubmit = component.find(".tr-wrapper");
    console.log(tableAfterSubmit.debug());
    expect(tableAfterSubmit.exists()).toBe(true);
  });

  it("Checking if n number of data is provided gives n number of rows. ", () => {
    const component = mount(<InputFields />);
    const table = component.find("Table");
    expect(table.exists()).toBe(false);

    const nameControl1 = component.find("input.movieName");
    nameControl1.simulate("change", { target: { value: "Hush" } });
    const ratingControl1 = component.find("input.movieRating");
    ratingControl1.simulate("change", { target: { value: "8" } });

    const button1 = component.find("Button");
    button1.simulate("click");
    component.update();
    const tableAfterSubmit1 = component.find(".tr-wrapper");
    expect(tableAfterSubmit1.exists()).toBe(true);
    expect(tableAfterSubmit1).toHaveLength(1);

    const nameControl2 = component.find("input.movieName");
    nameControl2.simulate("change", { target: { value: "Avengers" } });
    const ratingControl2 = component.find("input.movieRating");
    ratingControl2.simulate("change", { target: { value: "10" } });

    const button2 = component.find("Button");
    button2.simulate("click");
    component.update();
    const tableAfterSubmit2 = component.find(".tr-wrapper");
    expect(tableAfterSubmit2.exists()).toBe(true);
    expect(tableAfterSubmit2).toHaveLength(2);

    const nameControl3 = component.find("input.movieName");
    nameControl3.simulate("change", { target: { value: "Bahubhali" } });
    const ratingControl3 = component.find("input.movieRating");
    ratingControl3.simulate("change", { target: { value: "9" } });

    const button3 = component.find("Button");
    button3.simulate("click");
    component.update();
    const tableAfterSubmit3 = component.find(".tr-wrapper");
    expect(tableAfterSubmit3.exists()).toBe(true);
    expect(tableAfterSubmit3).toHaveLength(3);
  });

  it("checking when no data is provided and the button is clicked then no table is displayed. ", () => {
    const component = mount(<InputFields />);

    const nameControl = component.find("input.movieName");
    nameControl.simulate("change", { target: { value: "" } });
    const ratingControl = component.find("input.movieRating");
    ratingControl.simulate("change", { target: { value: "" } });

    const button = component.find("Button");
    button.simulate("click");
    component.update();
    const tableAfterSubmit = component.find(".tr-wrapper");
    expect(tableAfterSubmit.exists()).toBe(false);
  });
});
