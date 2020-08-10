import { useState, useEffect } from 'react'
import produce from 'immer'

import {
  atom,
  useRecoilValue,
  atomFamily,
  useSetRecoilState,
  selector,
} from 'recoil'

import fakeData, { createNewItem } from './fake-data'

const itemIdsAtom = atom({
  key: 'itemIds',
  default: [],
})

export function useItemIds() {
  return useRecoilValue(itemIdsAtom)
}

export function useSetItemIds() {
  return useSetRecoilState(itemIdsAtom)
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

const itemsAtomFamily = atomFamily({})

export function useItem(itemId) {
  return useRecoilValue(itemsAtomFamily(itemId))
}

export function useSetItem(itemId) {
  return useSetRecoilState(itemsAtomFamily(itemId))
}

export function useToggleChoice(itemId) {
  const setItem = useSetRecoilState(itemsAtomFamily(itemId))
  return optionKey => {
    setItem(
      produce(draft => {
        const option = draft.options[optionKey]
        option.value = !option.value
      })
    )
  }
}

const isReversedAtom = atom({
  key: 'isReversed',
  default: false,
})

export function useIsReversed() {
  return useRecoilValue(isReversedAtom)
}

export function useSetIsReversed() {
  return useSetRecoilState(isReversedAtom)
}

export function useReverseItemIds() {
  const setItemIds = useSetItemIds()
  const setIsReversed = useSetIsReversed()

  return () => {
    // only add a new id if the id doesn't already exist
    setItemIds(produce(draft => void draft.reverse()))
    setIsReversed(prev => !prev)
  }
}

export function useAddItem() {
  const [newItem, setNewItem] = useState(null)
  const itemIds = useItemIds()
  const addItemId = useAddItemId()
  const setItem = useSetItem(newItem?.id)

  // if the id update, go ahead and set its values
  useEffect(() => {
    if (newItem !== null) {
      setItem(newItem)
      setNewItem(null) // clear the item once it's been added
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

const resetItemsSelector = selector({
  key: 'resetItemsSelector',
  set: ({ get, set }) => {
    const itemIds = get(itemIdsAtom)

    // reset is reversed
    const isReversed = get(isReversedAtom)
    if (isReversed) {
      set(isReversedAtom, false)
      set(
        itemIdsAtom,
        produce(itemIds, draft => void draft.reverse())
      )
    }

    // reset all of the items
    itemIds.forEach(id => {
      const itemAtom = itemsAtomFamily(id)
      const item = get(itemAtom)
      const resetItem = produce(item, draft => {
        const options = Object.values(draft.options)
        options.forEach(option => (option.value = false)) // we just know this was the default ;)
      })
      set(itemAtom, resetItem)
    })
  },
})

export function useResetData() {
  return useSetRecoilState(resetItemsSelector)
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
