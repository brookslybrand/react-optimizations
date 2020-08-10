import React from 'react'

import CustomProfiler from './CustomProfiler'
import Controls from './Controls'
import Cards from './Cards'
import { RecoilRoot } from 'recoil'

export default function App() {
  return (
    <CustomProfiler id="main" showBaseDuration>
      <RecoilRoot>
        <div style={styles.container}>
          <Controls />
          <Cards />
        </div>
      </RecoilRoot>
    </CustomProfiler>
  )
}

const styles = {
  container: {
    margin: '1rem',
  },
}
