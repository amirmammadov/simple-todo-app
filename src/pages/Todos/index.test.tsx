import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todos from "./Todos";
import * as queries from "../../store/api/apiSlice";
import { Provider } from "react-redux";
import { todosApi } from "../../store/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
global.React = React;

describe("Testing of Todos page", () => {
  const initialTodos = [
    { id: 1, userId: 1, completed: false, title: "Qarabag" },
  ];

  const store = configureStore({
    reducer: {
      [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosApi.middleware),
  });

  it("should check Loading case", () => {
    jest.spyOn(queries, "useGetTodosQuery").mockImplementation(() => ({
      data: {},
      isError: false,
      isFetching: true,
      refetch: jest.fn(),
    }));

    render(<Todos />);

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  it("should check for error case", () => {
    jest.spyOn(queries, "useGetTodosQuery").mockImplementation(() => ({
      data: {},
      isError: true,
      isFetching: false,
      refetch: jest.fn(),
    }));

    render(<Todos />);

    const errorText = screen.getByText("404 Not Found");
    expect(errorText).toBeInTheDocument();
  });

  it("should check for success case", () => {
    jest.spyOn(queries, "useGetTodosQuery").mockImplementation(() => ({
      data: initialTodos,
      isError: false,
      isFetching: false,
      refetch: jest.fn(),
    }));

    render(<Todos />);

    const errorText = screen.getByTestId("todos-title");
    expect(errorText).toBeInTheDocument();
  });

  it("should open model when we click one of the buttons", async () => {
    jest.spyOn(queries, "useGetTodosQuery").mockImplementation(() => ({
      data: initialTodos,
      isError: false,
      isFetching: false,
      refetch: jest.fn(),
    }));

    render(
      <Provider store={store}>
        <Todos />
      </Provider>
    );

    const button = screen.getByTestId("todo-btn-0");
    fireEvent.click(button);
    const modal = await screen.findByTestId("todo-modal");
    expect(modal).toBeInTheDocument();
  });
});
