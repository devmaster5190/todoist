import React from "react"
import { render, cleanup } from "@testing-library/react"
import App from "../App"
import "@testing-library/jest-dom/extend-expect"

beforeEach(cleanup)

describe("<App />", () => {
  it("renders the application", () => {
    const { queryByTestId } = render(<App />)
    expect(queryByTestId("application")).toBeTruthy()
    expect(
      queryByTestId("application").classList.contains("darkmode")
    ).toBeFalsy()
  })

  it("renders the application using dark mode", () => {
    const { queryByTestId, debug } = render(<App darkModeDefault />)
    expect(queryByTestId("application")).toBeTruthy()
    expect(
      queryByTestId("application").classList.contains("darkmode")
    ).toBeTruthy()
  })
})
