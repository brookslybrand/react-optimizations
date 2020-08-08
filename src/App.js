import React, { useReducer } from 'react'
import rfdc from 'rfdc'

import CustomProfiler from './CustomProfiler'
import Controls from './Controls'
import Cards from './Cards'

import fakeData, { addItem } from './fake-data'

const clone = rfdc()

const TOGGLE_CHOICE = 'TOGGLE_CHOICE'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const REVERSE_LIST = 'REVERSE_LIST'
const RESET_DATA = 'RESET_DATA'

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_CHOICE: {
      const { items } = state
      const { itemId, optionKey } = action
      const itemIndex = items.findIndex(({ id }) => id === itemId)
      if (itemIndex === -1) return state
      const item = items[itemIndex]
      const option = item.options[optionKey]
      const optionsCopy = {
        ...item.options,
        [optionKey]: { ...option, value: !option.value },
      }
      const itemCopy = { ...item, options: optionsCopy }
      const itemsCopy = [...items]
      itemsCopy.splice(itemIndex, 1, itemCopy)
      return { ...state, items: itemsCopy }
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
      const itemsCopy = [...state.items]
      itemsCopy.reverse()
      return { ...state, isReversed: !state.isReversed, items: itemsCopy }
    }
    case RESET_DATA: {
      return init(clone(fakeData))
    }
    default: {
      return state
    }
  }
}

const init = initialItems => {
  return {
    isReversed: false,
    items: initialItems,
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, fakeData, init)

  const toggleChoice = (itemId, optionKey) =>
    dispatch({ type: TOGGLE_CHOICE, itemId, optionKey })
  const addItem = () => dispatch({ type: ADD_ITEM })
  const removeItem = () => dispatch({ type: REMOVE_ITEM })
  const reverseList = () => dispatch({ type: REVERSE_LIST })
  const resetData = () => dispatch({ type: RESET_DATA })

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
