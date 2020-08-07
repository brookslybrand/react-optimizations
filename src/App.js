import React, { useReducer, useCallback } from 'react'
import produce from 'immer'

import { FormControlLabel, Switch, Button } from '@material-ui/core'
import Card from './Card'
import CustomProfiler from './CustomProfiler'

import fakeData from './fake-data'

const TOGGLE_CHOICE = 'TOGGLE_CHOICE'
const REVERSE_LIST = 'REVERSE_LIST'
const RESET_DATA = 'RESET_DATA'

const reducer = produce((draft, action) => {
  switch (action.type) {
    case TOGGLE_CHOICE: {
      const { items } = draft
      const { itemId, optionKey } = action
      const item = items.find(({ id }) => id === itemId)
      if (item === undefined) return
      const option = item.options[optionKey]
      option.value = !option.value
      break
    }
    case REVERSE_LIST: {
      draft.isReversed = !draft.isReversed
      draft.items.reverse()
      break
    }
    case RESET_DATA: {
      draft.isReversed = init().isReversed
      draft.items.forEach(item => {
        const options = Object.values(item.options)
        options.forEach(option => (option.value = false)) // we just know this was the default ;)
      })
      break
    }
    default: {
      return draft
    }
  }
})

const init = initialItems => {
  return {
    isReversed: false,
    items: initialItems,
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, fakeData, init)

  const toggleChoice = useCallback(
    (itemId, optionKey) => dispatch({ type: TOGGLE_CHOICE, itemId, optionKey }),
    []
  )
  const reverseList = useCallback(() => dispatch({ type: REVERSE_LIST }), [])
  const resetData = useCallback(() => dispatch({ type: RESET_DATA }), [])

  return (
    <CustomProfiler id="main" showBaseDuration>
      <div style={styles.container}>
        <Controls
          isReversed={state.isReversed}
          reverseList={reverseList}
          resetData={resetData}
        />
        <Cards items={state.items} toggleChoice={toggleChoice} />
      </div>
    </CustomProfiler>
  )
}

const Controls = React.memo(({ isReversed, reverseList, resetData }) => {
  return (
    <div style={styles.controlsContainer}>
      <FormControlLabel
        control={
          <Switch
            value="reverse"
            color="primary"
            inputProps={{ 'aria-label': 'reverse switch' }}
            checked={isReversed}
            onChange={reverseList}
          />
        }
        label="Reverse"
      />

      <Button variant="contained" color="primary" onClick={resetData}>
        Reset Preferences
      </Button>
    </div>
  )
})

const Cards = ({ items, toggleChoice }) => {
  return (
    <div style={styles.cardContainer}>
      {items.map(d => (
        <Card key={d.id} {...d} toggleChoice={toggleChoice} />
      ))}
    </div>
  )
}

const styles = {
  container: {
    margin: '1rem',
  },
  controlsContainer: {
    marginLeft: '1rem',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}

export default App
