import React from 'react'

import {
  Card as MuiCard,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core'
import { QRCode } from 'react-qr-svg'
import Checklist from './Checklist'

import CustomProfiler from './CustomProfiler'

const CustomCard = React.memo(function Card({
  id,
  title,
  body,
  options,
  toggleChoice,
}) {
  return (
    <CustomProfiler id={title}>
      <MuiCard style={styles.card}>
        <CardContent style={styles.cardContent}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2" component="p" style={styles.cardElement}>
            {body}
          </Typography>
          <MemoizedQRCode value={id} />

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
      </MuiCard>
    </CustomProfiler>
  )
})

export default CustomCard

const MemoizedQRCode = React.memo(({ value }) => {
  return (
    <QRCode
      bgColor="#FFFFFF"
      fgColor="#000000"
      level="Q"
      style={{ ...styles.cardElement, ...styles.qrCode }}
      value={value}
    />
  )
})

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
