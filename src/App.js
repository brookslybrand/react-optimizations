import React from 'react'

import AppStateProvider from './app-state'
import CustomProfiler from './CustomProfiler'
import Controls from './Controls'
import Cards from './Cards'

export default function App() {
  return (
    <CustomProfiler id="main" showBaseDuration>
      <AppStateProvider>
        <div style={styles.container}>
          <Controls />
          <Cards />
        </div>
      </AppStateProvider>
    </CustomProfiler>
  )
}

const styles = {
  container: {
    margin: '1rem',
  },
}
