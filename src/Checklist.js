import React from 'react';

import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import { useAppDispatch, setOption } from './app-context';

export default ({ id, options }) => {
  const dispatch = useAppDispatch();

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
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  checked={value}
                  onChange={e => dispatch(setOption(id)(e.target.value))}
                  value={key}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};
