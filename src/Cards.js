import React from 'react'
import Card from './Card'
import { useAppState } from './app-state'

export default function Cards() {
  const { items } = useAppState()
  return (
    <div style={styles.cardContainer}>
      {items.map(({ id, title, body, options }) => (
        <Card key={id} id={id} title={title} body={body} options={options} />
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
