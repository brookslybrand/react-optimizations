import React from 'react'
import Card from './Card'
import { useItemIds } from './app-state'

export default function Cards() {
  const itemIds = useItemIds()

  return (
    <div style={styles.cardContainer}>
      {itemIds.map(id => (
        <Card key={id} id={id} />
      ))}
    </div>
  )
}

const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}
