import React from 'react'

import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { useToggleChoice } from './app-state'

export default function Checklist({ id, options }) {
  const toggleChoice = useToggleChoice(id)

  return (
    <div style={{ display: 'flex' }}>
      <FormControl component="fieldset" style={{ margin: '3rem' }}>
        <FormLabel component="legend">Which ones do you like?</FormLabel>
        <FormGroup>
          {Object.entries(options).map(([key, { label, value }]) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  checked={value}
                  onChange={() => toggleChoice(key)}
                  value={key}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  )
}
