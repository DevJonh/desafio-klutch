import { TransitionProps } from '@material-ui/core/transitions'
import { Snackbar, Slide } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

type AlertProps = {
  openAlert: boolean
  msg: string
  type: 'warning' | 'success' | 'info' | 'error'
  vertical: 'top' | 'bottom'
  horizontal: 'right' | 'left' | 'center'
  setClose(): void
}

const TransitionDown = (props: TransitionProps) => {
  return <Slide {...props} direction="left" />
}

const Alert = ({
  openAlert,
  msg,
  type,
  vertical,
  horizontal,
  setClose
}: AlertProps) => {
  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={2500}
      onClose={setClose}
      anchorOrigin={{ vertical, horizontal }}
      TransitionComponent={TransitionDown}
    >
      <MuiAlert elevation={4} severity={type}>
        {msg}
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert
