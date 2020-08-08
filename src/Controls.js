import React from 'react'
import { FormControlLabel, Switch, Button } from '@material-ui/core'

export default function Controls() {
  return (
    <div style={styles.controlsContainer}>
      <FormControlLabel
        control={
          <Switch
            onChange={() => {
              /* TODO: add reversing logic */
            }}
            value="reverse"
            color="primary"
            inputProps={{ 'aria-label': 'reverse switch' }}
          />
        }
        label="Reverse"
      />
      <Button
        variant="contained"
        color="default"
        onClick={() => {
          /* TODO: add new item logic */
        }}
        style={styles.button}
      >
        Add Item
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          /* TODO: add remove item logic */
        }}
        style={styles.button}
      >
        Remove Item
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          /* TODO: add reset state logic */
        }}
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
