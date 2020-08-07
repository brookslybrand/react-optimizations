import React, { useReducer, useCallback } from 'react'
import rfdc from 'rfdc'

import { FormControlLabel, Switch, Button } from '@material-ui/core'
import Card from './Card'
import CustomProfiler from './CustomProfiler'

import fakeData from './fake-data'

const clone = rfdc()

const TOGGLE_CHOICE = 'TOGGLE_CHOICE'
const REVERSE_LIST = 'REVERSE_LIST'
const RESET_DATA = 'RESET_DATA'

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_CHOICE: {
      const { items } = state
      const { itemId, optionKey } = action
      const itemIndex = items.findIndex(({ id }) => id === itemId)
      if (itemIndex === -1) return state
      const item = items[itemIndex]
      const option = item.options[optionKey]
      const optionsCopy = {
        ...item.options,
        [optionKey]: { ...option, value: !option.value },
      }
      const itemCopy = { ...item, options: optionsCopy }
      const itemsCopy = [...items]
      itemsCopy.splice(itemIndex, 1, itemCopy)
      return { ...state, items: itemsCopy }
    }
    case REVERSE_LIST: {
      const itemsCopy = [...state.items]
      itemsCopy.reverse()
      return { ...state, isReversed: !state.isReversed, items: itemsCopy }
    }
    case RESET_DATA: {
      return init(clone(fakeData))
    }
    default: {
      return state
    }
  }
}

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
