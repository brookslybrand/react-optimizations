import React from 'react';

import { FormControlLabel, Switch, Button } from '@material-ui/core';
import Card from './Card';
// import CustomProfiler from './CustomProfiler';

import {
  AppContextProvider,
  useAppContext,
  useAppDispatch,
  reverse,
  resetOptions,
} from './app-context';

const App = () => {
  return (
    // <CustomProfiler id="main" showBaseDuration>
    <AppContextProvider>
      <div style={styles.container}>
        <Controls />
        <Cards />
      </div>
    </AppContextProvider>
    // </CustomProfiler>
  );
};

const Controls = () => {
  const dispatch = useAppDispatch();

  return (
    <div style={styles.controlsContainer}>
      <FormControlLabel
        control={
          <Switch
            onChange={() => dispatch(reverse())}
            value="reverse"
            color="primary"
            inputProps={{ 'aria-label': 'reverse switch' }}
          />
        }
        label="Reverse"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(resetOptions())}
      >
        Reset Preferences
      </Button>
    </div>
  );
};

const Cards = () => {
  const data = useAppContext();

  return (
    <div style={styles.cardContainer}>
      {data.map(d => (
        <Card key={d.id} {...d} />
      ))}
    </div>
  );
};

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
};

export default App;
