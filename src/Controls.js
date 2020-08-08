import React from 'react'
import { FormControlLabel, Switch, Button } from '@material-ui/core'

const Controls = React.memo(function Controls({
  isReversed,
  reverseList,
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
        onClick={resetData}
        style={styles.button}
      >
        Reset Preferences
      </Button>
    </div>
  )
})

export default Controls

const styles = {
  controlsContainer: {
    marginLeft: '1rem',
  },
  button: {
    marginLeft: '1rem',
  },
}
