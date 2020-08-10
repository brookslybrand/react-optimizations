import { useState, useEffect } from 'react'
import produce from 'immer'

import {
  atom,
  useRecoilValue,
  atomFamily,
  useSetRecoilState,
  selectorFamily,
} from 'recoil'

import fakeData, { createNewItem } from './fake-data'

const itemIdsAtom = atom({
  key: 'itemIds',
  default: [],
})

const isReversedAtom = atom({
  key: 'isReversed',
  default: false,
})

const itemsAtomFamily = atomFamily({})

export function useItemIds() {
  return useRecoilValue(itemIdsAtom)
}

export function useSetItemIds() {
  return useSetRecoilState(itemIdsAtom)
}

const TOGGLE_CHOICE = 'TOGGLE_CHOICE'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const REVERSE_LIST = 'REVERSE_LIST'
const RESET_DATA = 'RESET_DATA'

const dispatchSelectorFamily = selectorFamily({
  key: 'dispatchSelectorFamily',
  set: type => ({ get, set }, payload) => {
    const updateItemIds = recipe => {
      const newItemIds = produce(get(itemIdsAtom), recipe)
      set(itemIdsAtom, newItemIds)
    }

    const updateItem = (itemId, recipe) => {
      const itemAtom = itemsAtomFamily(itemId)
      const updatedItem = produce(get(itemAtom), recipe)
      set(itemAtom, updatedItem)
    }

    // eslint-disable-next-line default-case
    switch (type) {
      case TOGGLE_CHOICE: {
        const { itemId, optionKey } = payload
        updateItem(itemId, draft => {
          const option = draft.options[optionKey]
          option.value = !option.value
        })
        break
      }
      case ADD_ITEM: {
        const itemIds = get(itemIdsAtom)
        const newItem = createNewItem(itemIds.length)
        set(itemsAtomFamily(newItem.id), newItem)
        updateItemIds(draft => void draft.push(newItem.id))
        break
      }
      case REMOVE_ITEM: {
        updateItemIds(draft => void draft.pop())
        break
      }
      case REVERSE_LIST: {
        updateItemIds(draft => void draft.reverse())
        set(isReversedAtom, !get(isReversedAtom))
        break
      }
      case RESET_DATA: {
        // reset is reversed
        const isReversed = get(isReversedAtom)
        console.log({ isReversed })
        if (isReversed) {
          set(dispatchSelectorFamily({ type: REVERSE_LIST }))
        }

        const itemIds = get(itemIdsAtom)
        // reset all of the items
        itemIds.forEach(id => {
          updateItem(id, draft => {
            const options = Object.values(draft.options)
            options.forEach(option => (option.value = false)) // we just know this was the default ;)
          })
        })
        break
      }
    }
  },
})

export function useAddItem() {
  return useSetRecoilState(dispatchSelectorFamily(ADD_ITEM))
}

export function useRemoveItem() {
  return useSetRecoilState(dispatchSelectorFamily(REMOVE_ITEM))
}

export function useReverseItemIds() {
  return useSetRecoilState(dispatchSelectorFamily(REVERSE_LIST))
}

export function useResetData() {
  return useSetRecoilState(dispatchSelectorFamily(RESET_DATA))
}

export function useIsReversed() {
  return useRecoilValue(isReversedAtom)
}

// TODO: add this to switch
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

export function useItem(itemId) {
  return useRecoilValue(itemsAtomFamily(itemId))
}

export function useToggleChoice(itemId) {
  const toggleChoice = useSetRecoilState(dispatchSelectorFamily(TOGGLE_CHOICE))
  return optionKey => toggleChoice({ itemId, optionKey })
}
