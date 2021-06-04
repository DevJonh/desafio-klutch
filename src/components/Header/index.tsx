import { createStyles, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Image from 'next/image'
import Link from 'next/link'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#228A95'
    },
    image: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& img': {
        cursor: 'pointer'
      }
    }
  })
)

const Header = () => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar variant="dense" className={classes.root}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Container className={classes.image}>
          <Link href="/">
            <Image src="/img/logo.svg" alt="logo" width={120} height={30} />
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header
