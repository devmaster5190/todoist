import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import ProjectOverlay from "../components/ProjectOverlay"
import "@testing-library/jest-dom/extend-expect"
import { useProjectsValue } from "../context"

beforeEach(cleanup)

jest.mock("../context", () => ({
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
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Success", () => {
    it("renders the project overlay on click", () => {
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setShowProjectOverlay={setShowProjectOverlay}
          setProject={setProject}
        />
      )

      expect(queryByTestId("project-overlay")).toBeTruthy()
      fireEvent.click(queryByTestId("project-overlay-action"))
      expect(setProject).toHaveBeenCalled()
    })

    it("renders the project overlay on keyDown", () => {
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setShowProjectOverlay={setShowProjectOverlay}
          setProject={setProject}
        />
      )

      expect(queryByTestId("project-overlay")).toBeTruthy()
      fireEvent.keyDown(queryByTestId("project-overlay-action"))
      expect(setProject).toHaveBeenCalled()
    })
  })

  describe("Failure", () => {
    it("does not render the project overlay with any projects", () => {
      useProjectsValue.mockImplementation(() => ({
        projects: []
      }))

      const { queryByTestId } = render(<ProjectOverlay showProjectOverlay />)
      expect(queryByTestId("project-overlay")).toBeTruthy()
      expect(queryByTestId("project-overlay-action")).toBeFalsy()
    })
  })
})
