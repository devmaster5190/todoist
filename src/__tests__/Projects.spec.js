import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import Projects from "../components/Projects"
import "@testing-library/jest-dom/extend-expect"

beforeEach(cleanup)

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => "INBOX")
  })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: "🎵MUSIC",
        projectId: "2",
        userId: "431f8be5568b6205a27c",
        docId: "michale-scott"
      }
    ]
  }))
}))

describe("<Project Overlay", () => {
  describe("Success", () => {
    it("renders the projects", () => {
      const { queryByTestId } = render(<Projects />)

      expect(queryByTestId("project-action")).toBeTruthy()
    })

    it("renders the projects with an active project and select project onClick", () => {
      const { queryByTestId } = render(<Projects activeValue="2" />)
      expect(queryByTestId("project-action")).toBeTruthy()
      fireEvent.click(queryByTestId("project-action"))
      expect(
        queryByTestId("project-action-parent").classList.contains("active")
      ).toBeTruthy()
    })

    it("renders the projects with an active project and select project onKeyDown", () => {
      const { queryByTestId } = render(<Projects activeValue="2" />)

      expect(queryByTestId("project-action")).toBeTruthy()
      fireEvent.keyDown(queryByTestId("project-action"))
      expect(
        queryByTestId("project-action-parent").classList.contains("active")
      ).toBeTruthy()
    })

    it("renders the projects with no active value", () => {
      const { queryByTestId } = render(<Projects />)

      expect(
        queryByTestId("project-action-parent").classList.contains("active")
      ).toBeFalsy()
    })
  })
})
