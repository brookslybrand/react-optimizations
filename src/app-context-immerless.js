import React, { createContext, useReducer, useContext } from 'react'

import initialData from './fake-data'

const AppContext = createContext()
const AppDispatch = createContext()

const AppContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialData)

  return (
    <AppContext.Provider value={data}>
      <AppDispatch.Provider value={dispatch}>{children}</AppDispatch.Provider>
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  const data = useContext(AppContext)
  if (data === undefined)
    throw new Error('useAppContext must be used inside of AppContextProvider')
  return data
}

const useAppDispatch = () => {
  const dispatch = useContext(AppDispatch)
  if (dispatch === undefined)
    throw new Error('useAppDispatch must be used inside of AppContextProvider')
  return dispatch
}

const REVERSE = 'REVERSE'
const SET_OPTION = 'SET_OPTION'
const RESET_OPTIONS = 'RESET_OPTIONS'

const reducer = (state, action) => {
  switch (action.type) {
    case REVERSE: {
      const copy = [...state].reverse()
      return copy
    }
    case SET_OPTION: {
      const { id, option } = action
      const itemIndex = state.findIndex(item => item.id === id)
      const item = state[itemIndex]
      const oldOptions = item.options
      const oldOption = oldOptions[option]
      const newOptions = {
        ...oldOptions,
        [option]: { ...oldOption, value: !oldOption.value },
      }
      const copy = [...state]
      copy.splice(itemIndex, 1, { ...item, options: newOptions })
      return copy
    }
    case RESET_OPTIONS: {
      return state.map(item => {
        const options = Object.keys(item.options).reduce(
          (options, key) => ({
            ...options,
            [key]: { label: item.options[key].label, value: false },
          }),
          {}
        )
        return { ...item, options }
      })
    }
    default:
      return state
  }
}

const reverse = () => ({ type: REVERSE })

const setOption = id => option => ({ type: SET_OPTION, id, option })

const resetOptions = () => ({ type: RESET_OPTIONS })

export {
  AppContextProvider,
  useAppContext,
  useAppDispatch,
  reverse,
  setOption,
  resetOptions,
}
