import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Modal from "./TodosModal";
import * as queries from "../../store/api/apiSlice";

describe("Testing of todos modal", () => {
  it("should check if modal open", () => {
    jest.spyOn(queries, "useGetTodoQuery").mockImplementation(() => ({
      status: "fullfilled",
      isSuccess: "true",
      isError: false,
      isFetching: false,
      refetch: jest.fn(),
    }));

    render(<Modal todoId={1} />);

    const loadingText = screen.getByText("UserId");
    expect(loadingText).toBeInTheDocument();
  });
});
