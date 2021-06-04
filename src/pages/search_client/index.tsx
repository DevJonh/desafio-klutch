/* eslint-disable prefer-const */
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Content from 'components/Content'
import ContentHeader from 'components/ContentHeader'
import Header from 'components/Header'
import { useState } from 'react'
import Alert from 'components/Alert'
import { formatCPF } from 'utils/format'
import { useRouter } from 'next/router'
import { useClient } from 'store/useClient'
import { IClient } from 'types'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#228A95'
    },
    searchClient: {
      fontWeight: 'normal',
      color: '#228A95',
      fontSize: '1.15rem',
      flex: 1,
      textAlign: 'center'
    },
    containerMain: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      marginTop: '3.3rem',
      alignItems: 'center',
      justifyContent: 'center'
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      height: '6rem',
      '& fieldset': {
        borderRadius: '5px 0 0 5px'
      }
    },
    input: {
      color: '#228A95',
      width: '13rem'
    },
    buttonSubmit: {
      backgroundColor: '#228A95',
      color: '#fff',
      fontWeight: 'bold',
      transition: '.4s',
      '&:hover': {
        backgroundColor: '#0d7681'
      },
      borderRadius: '0 5px 5px 0',
      height: '2.3rem'
    },
    containerSearch: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },
    boxSearch: {
      backgroundColor: '#f0f0f0',
      width: '18.8rem',
      padding: '1.2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    button: {
      backgroundColor: '#228A95',
      width: '100%',
      color: '#fff',
      fontWeight: 'bold',
      letterSpacing: '.1rem',
      transition: '.4s',
      '&:hover': {
        backgroundColor: '#0d7681'
      }
    }
  })
)

const SearchClient = () => {
  const [cpf, setCpf] = useState('')
  const [msgError, setMsgError] = useState('')
  const [isError, setIsError] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [client, setClient] = useState<IClient | string>('')

  const classes = useStyles()
  const history = useRouter()
  const { customerInAttendance } = useClient()

  const searchClient = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (cpf.length < 11) {
      setOpenAlert(true)
      setMsgError('Cpf inválido')
    }

    const cpfConversion = parseInt(cpf)

    if (isNaN(cpfConversion)) {
      setIsError(true)
      setOpenAlert(true)
      setMsgError('Insira apenas números')
      setCpf('')
      return
    }
    setIsError(false)

    const cpfFormat = formatCPF(cpf)
    setCpf(cpfFormat)

    const client = await customerInAttendance(cpfConversion)
    setClient(client)
  }

  const startSolicitation = () => {
    history.push('/payment_method')
  }

  return (
    <>
      <Header />
      <Content maxWidth="md">
        <>
          <ContentHeader />
          <Container className={classes.containerMain}>
            <Typography className={classes.searchClient} component="h3">
              Busque o Cliente
            </Typography>
            <form
              noValidate
              className={classes.form}
              onSubmit={(e) => searchClient(e)}
            >
              <TextField
                variant="outlined"
                type="text"
                value={cpf}
                placeholder="CPF"
                label={false}
                error={isError}
                onChange={(e) => setCpf(e.target.value)}
                size="small"
                className={classes.input}
                rowsMax={11}
                inputProps={{
                  min: 0,
                  maxLength: 11,
                  style: {
                    backgroundColor: '#f0f0f0',
                    height: '1rem',
                    borderRadius: 0
                  }
                }}
              />
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                disableElevation
                size="medium"
                type="submit"
              >
                Buscar
              </Button>
            </form>
          </Container>
          <Container
            style={client === '' ? { display: 'none' } : { display: 'flex' }}
            className={classes.containerSearch}
          >
            {typeof client === 'string' ? (
              <Box className={classes.boxSearch}>
                <Typography
                  style={{ color: '#BC3434', paddingBottom: '.6rem' }}
                >
                  Cliente Não Encontrado:
                </Typography>
                <Typography
                  style={{
                    color: '#777',
                    paddingBottom: '.4rem',
                    textAlign: 'center'
                  }}
                >
                  Verifique se os dados inseridos estão corretos
                </Typography>

                <Button
                  variant="contained"
                  disableElevation
                  size="large"
                  className={classes.button}
                  onClick={() => history.push('/')}
                  style={{ backgroundColor: '#BC3434' }}
                >
                  Retornar
                </Button>
              </Box>
            ) : (
              <Box className={classes.boxSearch}>
                <Typography
                  style={{ color: '#777777', paddingBottom: '.6rem' }}
                >
                  Cliente Encontrado:
                </Typography>
                <Typography
                  style={{ color: '#EF9C4B', paddingBottom: '.4rem' }}
                >
                  {formatCPF(client.cpf.toString())}
                </Typography>
                <Typography
                  style={{
                    color: '#228A95',
                    fontWeight: 'bold',
                    paddingBottom: '.6rem'
                  }}
                >
                  {client.name}
                </Typography>

                <Button
                  variant="contained"
                  disableElevation
                  size="large"
                  className={classes.button}
                  onClick={startSolicitation}
                >
                  Solicitar
                </Button>
              </Box>
            )}
          </Container>
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

export default SearchClient
