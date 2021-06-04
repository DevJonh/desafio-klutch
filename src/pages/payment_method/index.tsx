import Content from 'components/Content'
import ContentHeader from 'components/ContentHeader'
import Header from 'components/Header'
import { Container, Button, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() =>
  createStyles({
    containerMain: {
      width: '35%',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      marginTop: '3.3rem',
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      backgroundColor: '#228A95',
      color: '#fff',
      fontWeight: 'bold',
      transition: '.4s',
      '&:hover': {
        backgroundColor: '#0d7681'
      },
      borderRadius: '5px',
      height: '4.2rem',
      width: '100%',
      fontSize: '1.2rem',
      letterSpacing: '.11rem',
      '&:disabled': {
        backgroundColor: '#228A95',
        boxShadow: '0px 1px 2px #00000029',
        color: '#fff',
        opacity: '.4'
      },
      textTransform: 'none'
    },
    texts: {
      color: '#228A95',
      fontWeight: 500,
      marginBottom: '1rem'
    }
  })
)

const PaymentMethod = () => {
  const classes = useStyles()
  const router = useRouter()

  const setMethod = () => {
    router.push('/dados')
  }
  return (
    <>
      <Header />
      <Content maxWidth="md">
        <>
          <ContentHeader />
          <Container className={classes.containerMain}>
            <Typography className={classes.texts}>
              Escolha a modalidade
            </Typography>
            <Button
              className={classes.button}
              variant="contained"
              disableElevation
              size="medium"
              onClick={setMethod}
            >
              Cartão de Crédito
            </Button>
            <Typography style={{ color: '#777', margin: '1rem auto' }}>
              Ou
            </Typography>
            <Button
              className={classes.button}
              variant="contained"
              disableElevation
              size="medium"
              disabled
            >
              Crédito Consignado
            </Button>
            <Typography
              style={{
                color: '#777',
                margin: '.4rem auto',
                textAlign: 'right',
                width: '100%'
              }}
            >
              Em Breve
            </Typography>
          </Container>
        </>
      </Content>
    </>
  )
}

export default PaymentMethod
