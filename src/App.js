import React from 'react'

import AppStateProvider from './app-state'
// import CustomProfiler from './CustomProfiler'
import Controls from './Controls'
import Cards from './Cards'
import { RecoilRoot } from 'recoil'

export default function App() {
  return (
    // <CustomProfiler id="main" showBaseDuration>
    <RecoilRoot>
      <AppStateProvider>
        <div style={styles.container}>
          <Controls />
          <Cards />
        </div>
      </AppStateProvider>
    </RecoilRoot>
    // </CustomProfiler>
  )
}

const styles = {
  container: {
    margin: '1rem',
  },
}
