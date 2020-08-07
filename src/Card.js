import React from 'react'

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core'
import { QRCode } from 'react-qr-svg'
import Checklist from './Checklist'

import CustomProfiler from './CustomProfiler'

export default ({ id, title, body, options, toggleChoice }) => (
  <CustomProfiler id={title}>
    <Card style={styles.card}>
      <CardContent style={styles.cardContent}>
        <Typography variant="h5">{title}</Typography>

        <Typography variant="body2" component="p" style={styles.cardElement}>
          {body}
        </Typography>

        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{ ...styles.cardElement, ...styles.qrCode }}
          value={id}
        />

        <Checklist id={id} options={options} toggleChoice={toggleChoice} />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href="https://baconipsum.com/?paras=5&type=all-meat&start-with-lorem=1"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  </CustomProfiler>
)

const styles = {
  card: {
    width: 350,
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardElement: {
    margin: '0.5rem 0',
  },
  qrCode: {
    width: 75,
    alignSelf: 'center',
  },
}
