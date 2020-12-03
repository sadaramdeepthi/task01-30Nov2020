import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import _ from "lodash";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import { MemoryRouter } from "react-router";

configure({ adapter: new Adapter() });
describe("App", () => {
  beforeAll(() => {
    window.dataLayer = [];
  });

  const setup = () => {
    const state = {};

    const props = {};

    const store = createStore(_.identity, state);
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <App {...props} />
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
    const app = connectedComponent.find(".app-container");
    expect(app.exists()).toBe(true);
  });
});
