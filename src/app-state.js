import React, { useReducer, createContext, useContext } from 'react'
import produce from 'immer'

import fakeData, { createNewItem } from './fake-data'

const AppStateContext = createContext()
const AppDispatchContext = createContext()
export default function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, fakeData, init)

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const state = useContext(AppStateContext)
  if (state === undefined) {
    throw new Error(
      `useAppState must be called in a child of AppDispatchContext`
    )
  }
  return state
}

export function useAppStateDispatch() {
  const dispatch = useContext(AppDispatchContext)
  if (dispatch === undefined) {
    throw new Error(
      `useAppStateDispatch must be called in a child of AppDispatchContext`
    )
  }
  return dispatch
}

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
      const { items } = draft
      items.push(createNewItem(items.length))
      break
    }
    case REMOVE_ITEM: {
      draft.items.pop()
      break
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

export function toggleChoice(itemId, optionKey) {
  return { type: TOGGLE_CHOICE, itemId, optionKey }
}
export function addItem() {
  return { type: ADD_ITEM }
}
export function removeItem() {
  return { type: REMOVE_ITEM }
}
export function reverseList() {
  return { type: REVERSE_LIST }
}
export function resetData() {
  return { type: RESET_DATA }
}
