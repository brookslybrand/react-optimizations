import React, { createContext, useReducer, useContext } from 'react'
import produce from 'immer'

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

const reducer = produce((state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REVERSE: {
      state.reverse()
      break
    }
    case SET_OPTION: {
      const { id, option } = action
      const itemOptions = state.find(item => item.id === id).options
      itemOptions[option].value = !itemOptions[option].value
      break
    }
    case RESET_OPTIONS: {
      state.forEach(({ options }) =>
        Object.values(options).map(option => (option.value = false))
      )
      break
    }
  }
})

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
