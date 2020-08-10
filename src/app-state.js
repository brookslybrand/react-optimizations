import React, {
  useReducer,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import produce from 'immer'

import { atom, useRecoilValue, atomFamily, useSetRecoilState } from 'recoil'

import fakeData, { createNewItem } from './fake-data'

const itemIds = atom({
  key: 'itemIds',
  default: [],
})

export function useItemIds() {
  return useRecoilValue(itemIds)
}

export function useSetItemIds() {
  return useSetRecoilState(itemIds)
}

export function useAddItemId() {
  const setItemIds = useSetItemIds()
  return newId => {
    // only add a new id if the id doesn't already exist
    setItemIds(
      produce(draft => {
        if (!draft.includes(newId)) {
          draft.push(newId)
        }
      })
    )
  }
}

const items = atomFamily({})

export function useItem(itemId) {
  return useRecoilValue(items(itemId))
}

export function useSetItem(itemId) {
  return useSetRecoilState(items(itemId))
}

const isReversed = atom({
  key: 'isReversed',
  default: false,
})

export function useIsReversed() {
  return useRecoilValue(isReversed)
}

export function useReverseItemIds() {
  const setItemIds = useSetItemIds()
  const setIsReversed = useSetRecoilState(isReversed)

  return () => {
    // only add a new id if the id doesn't already exist
    setItemIds(produce(draft => void draft.reverse()))
    setIsReversed(prev => !prev)
  }
}

export function useAddItem() {
  const [newItem, setNewItem] = useState({})
  const itemIds = useItemIds()
  const addItemId = useAddItemId()
  const setItem = useSetItem(newItem.id ?? undefined)

  // if the id update, go ahead and set its values
  useEffect(() => {
    if (newItem.id !== undefined) {
      setItem(newItem)
      setNewItem({}) // clear the item once it's been added
    }
  }, [newItem, setItem])

  return () => {
    const newestItem = createNewItem(itemIds.length)
    setNewItem(newestItem)
    addItemId(newestItem.id)
  }
}

export function useRemoveItem() {
  const setItemIds = useSetItemIds()
  return () => setItemIds(produce(draft => void draft.pop()))
}

export function useAddInitialItems() {
  const addItem = useAddItem()
  const [itemsCount, setItemsCount] = useState(0)

  useEffect(() => {
    if (itemsCount < fakeData.length) {
      addItem(fakeData[itemsCount])
      setItemsCount(prev => prev + 1)
    }
  }, [addItem, itemsCount])
}

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
