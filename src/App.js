import React, { useState } from 'react'
import Header from './components/layout/Header'
import Content from './components/layout/Content'
import { ProjectsProvider, SelectedProjectProvider } from './context'

let theme = !(!localStorage.theme || localStorage.theme === 'false')

const App = ({ darkModeDefault = theme }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault)
  const _setDarkMode = mode => {
    localStorage.setItem('theme', mode)
    setDarkMode(mode)
  }
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main
          data-testid='application'
          className={darkMode ? 'darkmode' : undefined}
        >
          <Header darkMode={darkMode} setDarkMode={_setDarkMode} />
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  )
}

export default App
