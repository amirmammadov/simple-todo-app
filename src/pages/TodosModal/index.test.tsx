import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./TodosModal";
import * as queries from "../../store/api/apiSlice";
import { Provider } from "react-redux";
import { todosApi } from "../../store/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
global.React = React;

describe("Testing of todos modal", () => {
  const openedTodo = [
    { id: 2, userId: 1, completed: false, title: "Barcelona" },
  ];

  const store = configureStore({
    reducer: {
      [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosApi.middleware),
  });

  it("should check if modal open", async () => {
    jest.spyOn(queries, "useGetTodoQuery").mockImplementation(() => ({
      data: openedTodo,
      isError: false,
      isFetching: false,
      refetch: jest.fn(),
    }));

    render(
      <Provider store={store}>
        <Modal todoId={1} />
      </Provider>
    );

    const closeBtn = screen.getByTestId("modal-close");
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.getByTestId("todo-modal")).toHaveClass("open-modal");
    });
  });
});
