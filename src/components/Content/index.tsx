import { Container } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

type Props = {
  children: React.ReactChild
  maxWidth: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#228A95'
    },
    flex: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  })
)

const Content = ({ children, maxWidth }: Props) => {
  const classes = useStyles()
  return (
    <Container maxWidth={maxWidth} className={classes.flex}>
      {children}
    </Container>
  )
}

export default Content
