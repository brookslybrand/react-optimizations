import React from 'react'
import { FormControlLabel, Switch, Button } from '@material-ui/core'
import {
  useAppStateDispatch,
  resetData,
  useAddItem,
  useRemoveItem,
  useReverseItemIds,
  useIsReversed,
} from './app-state'

export default function Controls() {
  const dispatch = useAppStateDispatch()

  const addItem = useAddItem()
  const removeItem = useRemoveItem()

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
        onClick={() => dispatch(resetData())}
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
