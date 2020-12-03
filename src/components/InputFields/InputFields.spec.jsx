import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import _ from "lodash";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import InputFields from "./InputFields";
import { MemoryRouter } from "react-router";

configure({ adapter: new Adapter() });
describe("InputFields", () => {
  beforeAll(() => {
    window.dataLayer = [];
  });

  const setup = () => {
    const state = { movieName: "", movieRating: "", movieList: [] };

    const props = {};

    const store = createStore(_.identity, state);
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <InputFields {...props} />
        </Provider>
      </MemoryRouter>
    );

    return {
      connectedComponent: wrapper,
      state,
      props,
    };
  };

  it("checking if InputFields component is loaded", () => {
    const { connectedComponent } = setup();
    const input = connectedComponent.find(".inputfields-container");
    expect(input.exists()).toBe(true);
  });
  it("Checking if button is loaded", () => {
    const { connectedComponent } = setup();
    const button = connectedComponent.find("Button").at(0);
    expect(button.exists()).toBe(true);
    button.simulate("click");
  });
  it("Checking if Form is loaded", () => {
    const { connectedComponent } = setup();
    const form = connectedComponent.find("Form");
    expect(form.exists()).toBe(true);
  });
  it("checking if Table component is loaded", () => {
    const { connectedComponent } = setup();
    const table = connectedComponent.find(".table-container");
    expect(table.exists()).toBe(true);
  });
});
