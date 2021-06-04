import { Container, Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { formatCurrency } from 'utils/format'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Alert from 'components/Alert'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#228A95',
      height: '3.5rem',
      position: 'fixed',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    rodape: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      color: '#fff',
      fontSize: '1rem',
      letterSpacing: '.07rem'
    },
    button: {
      backgroundColor: '#EF9C4B',
      color: '#fff',
      fontWeight: 'bold',
      transition: '.4s',
      '&:hover': {
        backgroundColor: '#df8b38'
      },
      height: '2.2rem'
    }
  })
)

export type FooterProps = {
  nameTable: string
  parcela: number
  valorParcela: number
}

const FooterTable = ({
  nameTable,
  parcela = 0,
  valorParcela = 0
}: FooterProps) => {
  const [openAlert, setOpenAlert] = useState(false)
  const classes = useStyles()
  const history = useRouter()

  const nextStep = () => {
    if (parcela !== 0 && valorParcela !== 0) {
      history.push('/search_client')
    } else {
      setOpenAlert(true)
    }
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Container maxWidth="md" className={classes.rodape}>
        <p>
          <strong>Nome: {nameTable}</strong>
        </p>
        <p>
          <strong>Parcelas: {parcela}</strong>
        </p>
        <p>
          <strong>Valor da Parcela: {formatCurrency(valorParcela)}</strong>
        </p>

        <Button
          size="small"
          className={classes.button}
          variant="contained"
          onClick={nextStep}
          disableElevation
        >
          Avançar
        </Button>
      </Container>
      <Alert
        setClose={() => setOpenAlert(false)}
        openAlert={openAlert}
        msg="Escolha uma Parcela"
        type="error"
        vertical="top"
        horizontal="right"
      />
    </Container>
  )
}

export default FooterTable
