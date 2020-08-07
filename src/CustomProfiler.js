import React, { Profiler } from 'react'

const CustomProfiler = ({
  id,
  skipMount = true,
  showCount = true,
  showActualDuration = true,
  showBaseDuration = false,
  children,
}) => {
  return (
    <Profiler
      id={id}
      onRender={(id, phase, actualDuration, baseDuration) => {
        if (skipMount && phase === 'mount') {
          return children
        }

        console.group(id)
        // time spent rendering the committed update
        if (showCount) console.count(`${id} ${phase}`)
        if (showActualDuration) console.log('actualDuration', actualDuration)
        // estimated time to render the entire subtree without memoization
        if (showBaseDuration) console.log('baseDuration', baseDuration)
        console.groupEnd(id)
      }}
    >
      {children}
    </Profiler>
  )
}

export default CustomProfiler
