import { useState, useEffect } from 'react'
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

export function useToggleChoice(itemId) {
  const setItem = useSetRecoilState(items(itemId))
  return optionKey => {
    setItem(
      produce(draft => {
        const option = draft.options[optionKey]
        option.value = !option.value
      })
    )
  }
}

const isReversed = atom({
  key: 'isReversed',
  default: false,
})

export function useIsReversed() {
  return useRecoilValue(isReversed)
}

export function useSetIsReversed() {
  return useSetRecoilState(isReversed)
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

export function useResetData() {
  const setIsReversed = useSetIsReversed()

  return () => {
    setIsReversed(false)
  }
  // draft.isReversed = init().isReversed
  // draft.items.forEach(item => {
  //   const options = Object.values(item.options)
  //   options.forEach(option => (option.value = false)) // we just know this was the default ;)
  // })
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
