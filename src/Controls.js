import React from 'react'
import { FormControlLabel, Switch, Button } from '@material-ui/core'
import {
  useAddItem,
  useRemoveItem,
  useReverseItemIds,
  useIsReversed,
  useResetData,
} from './app-state'

export default function Controls() {
  const addItem = useAddItem()
  const removeItem = useRemoveItem()
  const resetData = useResetData()

  return (
    <div style={styles.controlsContainer}>
      <ReverseControl />
      <Button
        variant="contained"
        color="default"
        onClick={addItem}
        style={styles.button}
      >
        Add Item
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={removeItem}
        style={styles.button}
      >
        Remove Item
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={resetData}
        style={styles.button}
      >
        Reset Preferences
      </Button>
    </div>
  )
}

function ReverseControl() {
  const reverseList = useReverseItemIds()
  const isReversed = useIsReversed()

  return (
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
