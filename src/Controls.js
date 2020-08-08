import React from 'react'
import { FormControlLabel, Switch, Button } from '@material-ui/core'
import {
  useAppState,
  useAppStateDispatch,
  addItem,
  removeItem,
  reverseList,
  resetData,
} from './app-state'

export default function Controls() {
  const dispatch = useAppStateDispatch()
  return (
    <div style={styles.controlsContainer}>
      <ReverseControl />
      <Button
        variant="contained"
        color="default"
        onClick={() => dispatch(addItem())}
        style={styles.button}
      >
        Add Item
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch(removeItem())}
        style={styles.button}
      >
        Remove Item
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(resetData())}
        style={styles.button}
      >
        Reset Preferences
      </Button>
    </div>
  )
}

function ReverseControl() {
  const [{ isReversed }, dispatch] = [useAppState(), useAppStateDispatch()]

  return (
    <FormControlLabel
      control={
        <Switch
          value="reverse"
          color="primary"
          inputProps={{ 'aria-label': 'reverse switch' }}
          checked={isReversed}
          onChange={() => dispatch(reverseList())}
        />
      }
      label="Reverse"
    />
  )
}

const styles = {
  controlsContainer: {
    marginLeft: '1rem',
  },
  button: {
    marginLeft: '1rem',
  },
}
