import React, { useReducer, useCallback } from 'react'
import produce from 'immer'

import CustomProfiler from './CustomProfiler'
import Controls from './Controls'
import Cards from './Cards'

import fakeData, { addItem } from './fake-data'

const TOGGLE_CHOICE = 'TOGGLE_CHOICE'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const REVERSE_LIST = 'REVERSE_LIST'
const RESET_DATA = 'RESET_DATA'

const reducer = produce((draft, action) => {
  switch (action.type) {
    case TOGGLE_CHOICE: {
      const { items } = draft
      const { itemId, optionKey } = action
      const item = items.find(({ id }) => id === itemId)
      if (item === undefined) return
      const option = item.options[optionKey]
      option.value = !option.value
      break
    }
    case ADD_ITEM: {
      const newItem = addItem(state.items.length)
      const newItems = [...state.items, newItem]
      return { ...state, items: newItems }
    }
    case REMOVE_ITEM: {
      const newItems = [...state.items]
      newItems.pop()
      return { ...state, items: newItems }
    }
    case REVERSE_LIST: {
      draft.isReversed = !draft.isReversed
      draft.items.reverse()
      break
    }
    case RESET_DATA: {
      draft.isReversed = init().isReversed
      draft.items.forEach(item => {
        const options = Object.values(item.options)
        options.forEach(option => (option.value = false)) // we just know this was the default ;)
      })
      break
    }
    default: {
      return draft
    }
  }
})

const init = initialItems => {
  return {
    isReversed: false,
    items: initialItems,
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, fakeData, init)

  const toggleChoice = useCallback(
    (itemId, optionKey) => dispatch({ type: TOGGLE_CHOICE, itemId, optionKey }),
    []
  )
  const addItem = useCallback(() => dispatch({ type: ADD_ITEM }), [])
  const removeItem = useCallback(() => dispatch({ type: REMOVE_ITEM }), [])
  const reverseList = useCallback(() => dispatch({ type: REVERSE_LIST }), [])
  const resetData = useCallback(() => dispatch({ type: RESET_DATA }), [])

  return (
    <CustomProfiler id="main" showBaseDuration>
      <div style={styles.container}>
        <Controls
          isReversed={state.isReversed}
          reverseList={reverseList}
          addItem={addItem}
          removeItem={removeItem}
          resetData={resetData}
        />
        <Cards items={state.items} toggleChoice={toggleChoice} />
      </div>
    </CustomProfiler>
  )
}

const styles = {
  container: {
    margin: '1rem',
  },
}
