import React from 'react'
import Card from './Card'

export default function Cards({ items, toggleChoice }) {
  return (
    <div style={styles.cardContainer}>
      {items.map(({ id, title, body, options }) => (
        <Card
          key={id}
          id={id}
          title={title}
          body={body}
          options={options}
          toggleChoice={toggleChoice}
        />
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
