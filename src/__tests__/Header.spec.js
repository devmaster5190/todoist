import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Header from '../components/layout/Header'
import '@testing-library/jest-dom/extend-expect'

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] }))
}))
beforeEach(cleanup)

describe('<Header />', () => {
  describe('Success', () => {
    it('renders the header component', () => {
      const darkMode = false
      const setDarkMode = jest.fn(() => !darkMode)
      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      )

      expect(queryByTestId('header')).toBeTruthy()
    })

    it('render the header component and activate dark mode onClick', () => {
      const darkMode = false
      const setDarkMode = jest.fn(() => !darkMode)

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      )

      expect(queryByTestId('header')).toBeTruthy()
      fireEvent.click(queryByTestId('dark-mode-action'))
      expect(setDarkMode).toHaveBeenCalledWith(true)

      fireEvent.click(queryByTestId('dark-mode-action'))
      expect(setDarkMode).toHaveBeenCalledTimes(2)
    })

    it('render the header component and activate dark mode onKeyDown', () => {
      const darkMode = false
      const setDarkMode = jest.fn(() => !darkMode)

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      )

      expect(queryByTestId('header')).toBeTruthy()
      fireEvent.keyDown(queryByTestId('dark-mode-action'))
      expect(setDarkMode).toHaveBeenCalledWith(true)

      fireEvent.keyDown(queryByTestId('dark-mode-action'))
      expect(setDarkMode).toHaveBeenCalledTimes(2)
    })

    it('render the header component and set quick add task to true using onClick', () => {
      const darkMode = false
      const setDarkMode = jest.fn(() => !darkMode)

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      )
      expect(queryByTestId('header')).toBeTruthy()
      
      fireEvent.click(queryByTestId('quick-add-task-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
    })

    it('render the header component and set quick add task to true using keyDown', () => {
      const darkMode = false
      const setDarkMode = jest.fn(() => !darkMode)

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      )
      expect(queryByTestId('header')).toBeTruthy()
      
      fireEvent.keyDown(queryByTestId('quick-add-task-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
    })
  })
})
