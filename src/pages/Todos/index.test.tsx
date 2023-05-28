import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Todos from "./Todos";
import * as queries from "../../store/api/apiSlice";

describe("Testing of Todos page", () => {
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
      status: "fullfilled",
      isSuccess: true,
      isError: false,
      isFetching: false,
      refetch: jest.fn(),
    }));

    render(<Todos />);

    const errorText = screen.getByText("Todos List");
    expect(errorText).toBeInTheDocument();
  });

  it("should open model when we click one of the buttons", async () => {
    jest.spyOn(queries, "useGetTodosQuery").mockImplementation(() => ({
      status: "fullfilled",
      isSuccess: true,
      isError: false,
      isFetching: false,
      refetch: jest.fn(),
    }));

    render(<Todos />);

    const button = await screen.findByTestId("todo-btn-0");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
