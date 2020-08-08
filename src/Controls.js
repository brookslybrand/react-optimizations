import React from 'react'
import { FormControlLabel, Switch, Button } from '@material-ui/core'

export default function Controls({
  isReversed,
  reverseList,
  addItem,
  removeItem,
  resetData,
}) {
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

const styles = {
  controlsContainer: {
    marginLeft: '1rem',
  },
  button: {
    marginLeft: '1rem',
  },
}
