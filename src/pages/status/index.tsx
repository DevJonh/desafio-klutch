import { createStyles, makeStyles } from '@material-ui/core/styles'
import Content from 'components/Content'
import ContentHeader from 'components/ContentHeader'
import Header from 'components/Header'
import { Typography, Button, Container, Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import ErrorIcon from '@material-ui/icons/Error'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Image from 'next/image'
import {
  formatCard,
  formatCPF,
  formatCurrency,
  formatDate,
  formatFullDate
} from 'utils/format'
import { useSolicitation } from 'store/useSolicitation'
import { useRateTable } from 'store/useRateTable'
import { useClient } from 'store/useClient'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: '3rem',
      rowGap: '1.2rem',
      padding: '0 2rem 2rem',
      width: '100%',
      textAlign: 'center',
      marginTop: '2.5rem',
      '.MuiButtonBase-root': {
        padding: 0
      },
      '& .MuiButton-root': {
        textTransform: 'none',
        letterSpacing: '.1rem'
      }
    },
    texts: {
      color: '#228A95',
      fontWeight: 'bold',
      fontStyle: 'italic'
    },
    box: {
      textAlign: 'right',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      padding: '0 ',
      marginTop: '1.2rem'
    },
    boxItem: {
      backgroundColor: '#f0f0f0',
      borderRadius: '.3rem',
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 10rem',
      height: '10rem',
      maxWidth: '10rem',
      alignItems: 'center',
      padding: '.7rem',
      marginBottom: '1rem',
      '& div': {
        marginTop: '.6rem'
      }
    },
    boxRight: {},
    boxLeft: {
      marginBottom: '3rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    text: {
      color: '#777777',
      fontSize: '.8rem',
      marginBottom: '1rem'
    },
    title: {
      marginTop: '2rem',
      fontWeight: 'bold',
      color: '#228A95',
      flex: 1,
      textAlign: 'center',
      marginBottom: '2rem'
    },
    textsResult: {
      color: '#31AC2B',
      fontWeight: 'bolder',
      display: 'flex',
      alignItems: 'center',
      height: '60%'
    },
    textsDefault: {
      backgroundColor: '#f0f0f0',
      color: '#777777',
      textAlign: 'left',
      borderRadius: '.3rem',
      height: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '1rem',
      fontSize: '.8rem',
      '& strong': {
        marginLeft: '.2rem',
        color: '#228A95'
      }
    },
    textsInfo: {
      color: '#777777',
      fontWeight: 'bolder',
      textAlign: 'center',
      fontSize: '.75rem',
      fontStyle: 'italic',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '.3rem',
      '& span': {
        marginRight: '.4rem'
      },
      '& strong': {
        color: '#31AC2B'
      },
      '& span.margin': {
        marginLeft: '.3rem'
      }
    },
    buttonLink: {
      textDecoration: 'underline',
      fontSize: '.7rem',
      color: '#2D98B4',
      '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline',
        color: '#115293'
      }
    },
    boxFinance: {
      flex: '1 1 100%',
      backgroundColor: '#f0f0f0',
      borderRadius: '.3rem',
      marginBottom: '1rem',
      padding: '.2rem .5rem .5rem'
    },
    boxClient: {
      flex: '1 1 100%',
      backgroundColor: '#f0f0f0',
      borderRadius: '.3rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '.5rem 1rem .5rem',
      marginBottom: '1rem'
    },
    boxInfo: {
      flex: '1 1 90%',
      backgroundColor: '#E8F3F4',
      borderRadius: '.3rem',
      padding: '.5rem 1rem .5rem',
      border: '1px dashed #187680',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    buttonWait: {
      width: '10.6rem',
      backgroundColor: '#EF9C4B',
      color: '#fff',
      fontWeight: 'bold',
      transition: '.4s',
      '&:hover': {
        backgroundColor: '#e28c37'
      },
      borderRadius: ' 5px ',
      fontSize: '.9rem',
      textTransform: 'none',
      margin: '1.2rem auto .5rem',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      '& svg': {
        marginRight: '.4rem',
        fontSize: '1.1rem'
      }
    },
    buttonAprove: {
      backgroundColor: '#228A95',
      color: '#fff',
      fontWeight: 'bold',
      transition: '.4s',
      '&:hover': {
        backgroundColor: '#157681'
      },
      borderRadius: ' 5px ',
      fontSize: '.9rem',
      textTransform: 'none',
      margin: '.7rem auto .5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& svg': {
        marginRight: '.4rem',
        fontSize: '1.1rem'
      }
    },
    buttonReprove: {
      backgroundColor: '#BC3434',
      color: '#fff',
      fontWeight: 'bold',
      transition: '.4s',
      '&:hover': {
        backgroundColor: '#a71e1e'
      },
      borderRadius: ' 5px ',
      fontSize: '.9rem',
      textTransform: 'none',
      margin: '.7rem auto .5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& svg': {
        marginRight: '.4rem',
        fontSize: '1.1rem'
      }
    }
  })
)

const Status = () => {
  const classes = useStyles()
  const router = useRouter()
  const { solicitation, desiredValue, dataSpecificCard } = useSolicitation()
  const { tableSelected } = useRateTable()
  const { client } = useClient()

  const returned = () => {
    router.push('/')
  }

  return (
    <>
      <Header />
      <Content maxWidth="md">
        <>
          <ContentHeader />

          <Container className={classes.root}>
            <Container className={classes.boxLeft}>
              <Typography className={classes.textsDefault}>
                Solicitação gerada por <strong> Sistema Credfica</strong>
              </Typography>
              <Container className={classes.box}>
                <Box className={classes.boxItem}>
                  <Typography className={classes.text}>Valor Total</Typography>
                  <Typography className={classes.textsResult}>
                    {formatCurrency(solicitation.totalPayment)}
                  </Typography>
                </Box>
                <Box className={classes.boxItem}>
                  <Typography className={classes.text}>
                    Valor a depositar
                  </Typography>
                  <Typography className={classes.textsResult}>
                    {formatCurrency(desiredValue)}
                  </Typography>
                </Box>
                <Box className={classes.boxItem}>
                  <Typography className={classes.text}>
                    Frente do cartão
                  </Typography>
                  <Image
                    src="/img/document.svg"
                    alt="imagem de um documento"
                    width={50}
                    height={80}
                  />
                  <Button className={classes.buttonLink}>
                    Ver Comprovante
                  </Button>
                </Box>
                <Box className={classes.boxItem}>
                  <Typography className={classes.text}>
                    Verso do cartão
                  </Typography>
                  <Image
                    src="/img/document.svg"
                    alt="imagem de um documento"
                    width={50}
                    height={80}
                  />
                  <Button className={classes.buttonLink}>
                    Ver Comprovante
                  </Button>
                </Box>
                <Box className={classes.boxItem}>
                  <Typography className={classes.text}>
                    Selfie com o cartão
                  </Typography>
                  <Image
                    src="/img/document.svg"
                    alt="imagem de um documento"
                    width={50}
                    height={80}
                  />
                  <Button className={classes.buttonLink}>
                    Ver Comprovante
                  </Button>
                </Box>
              </Container>
            </Container>

            <Container className={classes.boxRight}>
              <Typography className={classes.textsDefault}>
                Fluxo da Solicitação{' '}
                <strong>
                  {solicitation.contract.charAt(0).toUpperCase() +
                    solicitation.contract.slice(
                      -(solicitation.contract.length - 1)
                    )}
                </strong>
              </Typography>
              <Container className={classes.box}>
                <Box className={classes.boxFinance}>
                  <Typography className={classes.textsDefault}>
                    Modalidade
                  </Typography>
                  <Container maxWidth="sm">
                    <Typography className={classes.textsInfo}>
                      <span>Cartão de Crédito</span>
                      <Image
                        src="/img/card.svg"
                        alt="ícone de um cartão"
                        width={30}
                        height={18}
                        className="img"
                      />
                    </Typography>
                    <Typography className={classes.textsInfo}>
                      <span>Número do cartão:</span>{' '}
                      {formatCard(`${solicitation.cardNumber}`)}
                    </Typography>
                    <Typography className={classes.textsInfo}>
                      <span>Validade:</span>
                      {formatDate(dataSpecificCard.expire)}
                      <span className="margin"> CVC:</span>
                      {dataSpecificCard.cvc}
                    </Typography>
                    <Typography className={classes.textsInfo}>
                      <span>1 parcela de:</span>{' '}
                      <strong>
                        {formatCurrency(solicitation.installmentValue)}
                      </strong>
                    </Typography>
                    <Typography className={classes.textsInfo}>
                      <span>Tabela:</span> {tableSelected.name}
                    </Typography>
                  </Container>
                </Box>
                <Box className={classes.boxClient}>
                  <Typography className={classes.text}>
                    Informações do Cliente
                  </Typography>
                  <Typography className={classes.textsInfo}>
                    <span>Nome:</span> {client.name}
                  </Typography>
                  <Typography className={classes.textsInfo}>
                    <span>CPF:</span> {formatCPF(`${client.cpf}`)}
                  </Typography>
                  <Typography className={classes.textsInfo}>
                    <span>Agência:</span>
                    {client.bank.agency}
                  </Typography>
                  <Typography className={classes.textsInfo}>
                    <span>Banco:</span> {client.bank.label}
                  </Typography>
                  <Typography className={classes.textsInfo}>
                    <span>Tipo de Conta:</span> {client.bank.accountTypeLabel}
                  </Typography>
                  <Typography className={classes.textsInfo}>
                    <span>Número da Conta:</span> {client.bank.accountNumber}
                  </Typography>
                </Box>
                <Box className={classes.boxInfo}>
                  <Typography className={classes.text}>
                    Informações Gerais:
                  </Typography>
                  <Container maxWidth="sm">
                    <Typography className={classes.textsInfo}>
                      <span>Data:</span> {formatFullDate(new Date())}
                    </Typography>
                  </Container>
                  <Button
                    variant="contained"
                    className={classes.buttonWait}
                    disableElevation
                    onClick={returned}
                  >
                    <ErrorIcon /> Aguardando
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.buttonAprove}
                    disableElevation
                    onClick={returned}
                  >
                    <CheckCircleIcon /> Pré Aprovar
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.buttonReprove}
                    disableElevation
                    onClick={returned}
                  >
                    <CheckCircleIcon /> Pré Aprovar
                  </Button>
                </Box>
              </Container>
            </Container>
          </Container>
        </>
      </Content>
    </>
  )
}

export default Status
