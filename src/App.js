import React from 'react'

import CustomProfiler from './CustomProfiler'
import Controls from './Controls'
import Cards from './Cards'

export default function App() {
  return (
    <CustomProfiler id="main" showBaseDuration>
      <div style={styles.container}>
        <Controls />
        <Cards />
      </div>
    </CustomProfiler>
  )
}

const styles = {
  container: {
    margin: '1rem',
  },
}
