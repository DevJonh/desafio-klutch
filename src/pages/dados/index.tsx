import { createStyles, makeStyles } from '@material-ui/core/styles'
import Content from 'components/Content'
import ContentHeader from 'components/ContentHeader'
import Header from 'components/Header'
import { useState } from 'react'
import Alert from 'components/Alert'
import { Typography, TextField, Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useClient } from 'store/useClient'
import { ICard } from 'types'
import { useSolicitation } from 'store/useSolicitation'
import { formatCard } from 'utils/format'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: '3rem',
      rowGap: '1.2rem',
      padding: '2rem',
      width: '100%',
      textAlign: 'center',
      marginTop: '3.5rem',
      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
        border: 'none'
      },
      '& .MuiInput-underline:hover:before': {
        border: 'none'
      },
      '& .MuiInputBase-input': {
        backgroundColor: '#f0f0f0',
        height: '2rem',
        borderRadius: '.3rem',
        padding: '.5rem 1rem'
      },
      '.MuiButtonBase-root': {
        padding: 0
      },
      '& .MuiButton-root': {
        textTransform: 'none',
        color: '#777777',
        letterSpacing: '.1rem'
      }
    },
    texts: {
      color: '#228A95',
      fontWeight: 500
    },
    inputsFile: {
      backgroundColor: '#f0f0f0',
      textAlign: 'right',
      borderRadius: '.3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#777777',
      padding: '0 1.2rem'
    },
    placeFile: {
      color: '#777777',
      fontWeight: 'bold',
      textDecoration: 'none',
      fontStyle: 'italic'
    },

    buttonSubmit: {
      backgroundColor: '#228A95',
      color: '#fff',
      fontWeight: 'bold',
      transition: '.4s',
      '&:hover': {
        backgroundColor: '#0d7681'
      },
      borderRadius: ' 5px ',
      height: '3rem',
      width: '16rem',
      fontSize: '1rem',
      letterSpacing: '.1rem',
      alignSelf: 'center',
      marginBottom: '1.5rem'
    }
  })
)

const BankData = () => {
  const [msgError, setMsgError] = useState('')
  const [isError, setIsError] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const { client } = useClient()
  const [nameCart, setNameCart] = useState(() =>
    client.name ? client.name : ''
  )
  const [numberCart, setNumberCart] = useState('')
  const [validity, setValidity] = useState('')
  const [cvc, setCvc] = useState('')

  const classes = useStyles()
  const router = useRouter()

  const { getDataCard, setDateExpiredCard } = useSolicitation()

  const registerCard = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (nameCart === '') {
      setIsError(true)
      setMsgError('Por favor insira o nome que está no cartão.')
      setOpenAlert(true)
      return
    }
    if (numberCart === '') {
      setIsError(true)
      setMsgError('Por favor insira o número do cartão.')
      setOpenAlert(true)
      return
    }
    const numberCardFormated = formatCard(numberCart)
    setNumberCart(numberCardFormated)

    if (validity === '') {
      setIsError(true)
      setMsgError('Por favor informe a validade do cartão.')
      setOpenAlert(true)
      return
    }
    if (cvc === '') {
      setIsError(true)
      setMsgError('Por favor informe cvc do cartão.')
      setOpenAlert(true)
      return
    }

    const data: ICard = {
      id: Math.ceil(Math.random() * 9999),
      cardNumber: Number(numberCart),
      expirationDate: validity,
      nameCard: nameCart,
      cvc: Number(cvc),
      idClient: client.id,
      frontPhoto: '',
      backPhoto: '',
      selfiePhot: ''
    }

    setDateExpiredCard(validity, Number(cvc))

    const result = await getDataCard(data)
    if (result) {
      setMsgError('Dados ainda não gravados na base de dados')
      setOpenAlert(true)
    }
    router.push('/confirm_data')
  }

  return (
    <>
      <Header />
      <Content maxWidth="md">
        <>
          <ContentHeader />
          <form
            id="formCard"
            name="formCard"
            onSubmit={(e) => registerCard(e)}
            className={classes.root}
          >
            <Typography className={classes.texts}>
              Insira os dados do Cartão:
            </Typography>
            <Typography className={classes.texts}>
              Faça o upload dos anexos do cartão:
            </Typography>
            <TextField
              type="text"
              placeholder="Nome no cartão de crédito"
              error={isError}
              value={nameCart}
              onChange={(e) => setNameCart(e.target.value)}
            />
            <TextField
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={() => console.log('Iaiiii')}
            />
            <label htmlFor="icon-button-file" className={classes.inputsFile}>
              <span className={classes.placeFile}>
                Cartão de Crédito (Frente)
              </span>
              <Button
                style={{
                  background: 'transparent',
                  textDecoration: 'underline'
                }}
              >
                Adicionar
              </Button>
            </label>
            <TextField
              type="text"
              placeholder="Número do cartão de crédito"
              error={isError}
              value={numberCart}
              onChange={(e) => setNumberCart(e.target.value)}
              inputProps={{
                maxLength: 16
              }}
            />
            <TextField
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={() => console.log('Iaiiii')}
            />
            <label htmlFor="icon-button-file" className={classes.inputsFile}>
              <span className={classes.placeFile}>
                Cartão de Crédito (Verso)
              </span>
              <Button
                style={{
                  background: 'transparent',
                  textDecoration: 'underline'
                }}
              >
                Adicionar
              </Button>
            </label>
            <TextField
              type="month"
              placeholder="Data de Validade"
              error={isError}
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
            />
            <TextField
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={() => console.log('Iaiiii')}
            />
            <label htmlFor="icon-button-file" className={classes.inputsFile}>
              <span className={classes.placeFile}>
                Selfie com cartão de crédito
              </span>
              <Button
                style={{
                  background: 'transparent',
                  textDecoration: 'underline'
                }}
              >
                Adicionar
              </Button>
            </label>
            <TextField
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              inputProps={{ maxLength: 3 }}
            />
            <Typography style={{ textAlign: 'left' }} className={classes.texts}>
              Atenção: As fotos devem estar legíveis, com todas as informações
              visíveis do cartão.
            </Typography>
          </form>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            disableElevation
            size="medium"
            type="submit"
            form="formCard"
          >
            Continuar
          </Button>
        </>
      </Content>
      <Alert
        setClose={() => setOpenAlert(false)}
        openAlert={openAlert}
        msg={msgError}
        type="error"
        vertical="top"
        horizontal="right"
      />
    </>
  )
}

export default BankData
