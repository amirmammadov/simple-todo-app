import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todos from "./Todos";
import * as queries from "../../store/api/apiSlice";

describe("Testing of Todos page", () => {
  it("should check Loading case", () => {
    jest.spyOn(queries, "useGetTodosQuery").mockImplementation(() => ({
      data: {},
      error: false,
      isFetching: true,
      refetch: jest.fn(),
    }));

    render(<Todos />);

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });
});
