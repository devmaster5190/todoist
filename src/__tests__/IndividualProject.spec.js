import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import IndividualProject from "../components/IndividualProject"
import "@testing-library/jest-dom/extend-expect"

beforeEach(cleanup)

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() =>
            Promise.resolve("Never mock firebase, but I did")
          ),
          update: jest.fn()
        }))
      }))
    }))
  }
}))

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
    ],
    setProjects: jest.fn()
  }))
}))

describe("<Individual Project />", () => {
  const project = {
    name: "🎵MUSIC",
    projectId: "2",
    userId: "431f8be5568b6205a27c",
    docId: "michale-scott"
  }

  describe("Success", () => {
    it("renders our project", () => {
      const { getByText } = render(<IndividualProject project={project} />)

      expect(getByText("🎵MUSIC")).toBeTruthy()
    })

    it("renders the delete overlay and then deletes a project using onClick", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      )

      fireEvent.click(queryByTestId("delete-project"))
      expect(
        getByText("Are you sure you want to delete this project?")
      ).toBeTruthy()

      fireEvent.click(getByText("Delete"))
    })

    it("renders the delete overlay and then deletes a project using onKeyDown", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      )

      fireEvent.keyDown(queryByTestId("delete-project"))
      expect(
        getByText("Are you sure you want to delete this project?")
      ).toBeTruthy()

      fireEvent.click(getByText("Delete"))
    })

    it("renders the delete overlay and then cancel using onClick", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      )

      fireEvent.click(queryByTestId("delete-project"))
      expect(
        getByText("Are you sure you want to delete this project?")
      ).toBeTruthy()

      fireEvent.click(getByText("Cancel"))
    })

    it("renders the delete overlay and then cancel using onKeyDown", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      )

      fireEvent.keyDown(queryByTestId("delete-project"))
      expect(
        getByText("Are you sure you want to delete this project?")
      ).toBeTruthy()

      fireEvent.keyDown(getByText("Cancel"))
    })
  })
})
