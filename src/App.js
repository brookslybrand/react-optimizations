import React, { useReducer } from 'react'

import { FormControlLabel, Switch, Button } from '@material-ui/core'
import Card from './Card'
import CustomProfiler from './CustomProfiler'

import fakeData from './fake-data'

const TOGGLE_CHOICE = 'TOGGLE_CHOICE'
const REVERSE_LIST = 'REVERSE_LIST'
const RESET_DATA = 'RESET_DATA'

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_CHOICE: {
      return state
    }
    case REVERSE_LIST: {
      const itemsCopy = [...state.items]
      itemsCopy.reverse()
      return { ...state, isReversed: !state.isReversed, items: itemsCopy }
    }
    case RESET_DATA: {
      return init(fakeData)
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

  const toggleChoice = () => dispatch({ type: TOGGLE_CHOICE })
  const reverseList = () => dispatch({ type: REVERSE_LIST })
  const resetData = () => dispatch({ type: RESET_DATA })

  return (
    <CustomProfiler id="main" showBaseDuration>
      <div style={styles.container}>
        <Controls
          isReversed={state.isReversed}
          reverseList={reverseList}
          resetData={resetData}
        />
        <Cards items={state.items} />
      </div>
    </CustomProfiler>
  )
}

const Controls = ({ isReversed, reverseList, resetData }) => {
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
}

const Cards = ({ items }) => {
  return (
    <div style={styles.cardContainer}>
      {items.map(d => (
        <Card key={d.id} {...d} />
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
