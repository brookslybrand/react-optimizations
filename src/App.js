import React from 'react'

import AppStateProvider, { useAppState } from './app-state'
import CustomProfiler from './CustomProfiler'
import Controls from './Controls'
import Cards from './Cards'

export default function App() {
  return (
    <CustomProfiler id="main" showBaseDuration>
      <AppStateProvider>
        <div style={styles.container}>
          <Controls />
          <AppState />
          <Cards />
        </div>
      </AppStateProvider>
    </CustomProfiler>
  )
}

function AppState() {
  const appState = useAppState()

  return (
    <details style={styles.details}>
      <pre>{JSON.stringify(appState, null, 2)}</pre>
    </details>
  )
}

const styles = {
  container: {
    margin: '1rem',
  },
  details: {
    whiteSpace: 'nowrap',
  },
}
