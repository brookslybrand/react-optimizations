import React from 'react'
import Card from './Card'

import data from './fake-data'

export default function Cards() {
  return (
    <div style={styles.cardContainer}>
      {data.map(({ id, title, body, options }) => (
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
