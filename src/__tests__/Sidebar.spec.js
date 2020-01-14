import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Sidebar from '../components/layout/Sidebar'
import '@testing-library/jest-dom/extend-expect'

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX')
  })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🎵MUSIC',
        projectId: '2',
        userId: '431f8be5568b6205a27c',
        docId: 'michale-scott'
      }
    ]
  }))
}))

beforeEach(cleanup)

describe('<Sidebar />', () => {
  describe('Sucess', () => {
    it('renders the <Sidebar />', () => {
      const { queryByTestId } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()
    })

    it('changes the active project Inbox in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()

      fireEvent.click(queryByTestId('inbox-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()

      fireEvent.keyDown(queryByTestId('inbox-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
    })

    it('changes the active project Today in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()

      fireEvent.click(queryByTestId('today-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('today').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()

      fireEvent.keyDown(queryByTestId('today-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('today').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
    })

    it('changes the active project next 7 in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()

      fireEvent.click(queryByTestId('next_7-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('next_7-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy()
    })

    it('hides and show the sidebar projects using onClick', () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()

      fireEvent.click(getByText('Projects'))
      expect(queryByText('Add Project')).toBeFalsy()

      fireEvent.click(getByText('Projects'))
      expect(queryByText('Add Project')).toBeTruthy()
    })

    it('hides and show the sidebar projects using onKeyDown', () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()

      fireEvent.keyDown(getByText('Projects'))
      expect(queryByText('Add Project')).toBeFalsy()

      fireEvent.keyDown(getByText('Projects'))
      expect(queryByText('Add Project')).toBeTruthy()
    })
  })
})
