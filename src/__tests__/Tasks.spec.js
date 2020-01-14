import React from "react"
import { render, cleanup, fireEvent } from "@testing-library/react"
import Tasks from "../components/Tasks"
import { useSelectedProjectValue } from "../context"
import "@testing-library/jest-dom/extend-expect"

beforeEach(cleanup)

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: "🏢OFFICE",
        projectId: "1",
        userId: "431f8be5568b6205a27c",
        docId: "michale-scott"
      },
      {
        name: "🎵MUSIC",
        projectId: "2",
        userId: "431f8be5568b6205a27c",
        docId: "michale-scott"
      },
      {
        name: "🏓SPORT",
        projectId: "3",
        userId: "431f8be5568b6205a27c",
        docId: "wake-up"
      },
      {
        name: "📚WORDS",
        projectId: "4",
        userId: "431f8be5568b6205a27c",
        docId: "arcade-fire"
      }
    ]
  }))
}))

jest.mock("../hooks", () => ({
  useTasks: () => [
    [
      {
        id: "GLRWbae2ILFT4VVGB3dZ",
        archived: false,
        date: "21/07/2019",
        projectId: "1",
        task: "This is a video",
        userId: "431f8be5568b6205a27c"
      }
    ]
  ]
}))

describe("<Tasks />", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders tasks ", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "INBOX"),
      selectedProject: "INBOX"
    }))

    const { queryByTestId } = render(<Tasks />)
    expect(queryByTestId("tasks")).toBeTruthy()
    expect(queryByTestId("project-name").textContent).toBe("Inbox")
  })

  it("renders a task with a project title ", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "1"),
      selectedProject: "1"
    }))

    const { queryByTestId } = render(<Tasks />)
    expect(queryByTestId("tasks")).toBeTruthy()
    expect(queryByTestId("project-name").textContent).toBe("🏢OFFICE")
  })
})
