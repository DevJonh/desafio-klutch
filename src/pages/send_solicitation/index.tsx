import { createStyles, makeStyles } from '@material-ui/core/styles'
import Content from 'components/Content'
import ContentHeader from 'components/ContentHeader'
import Header from 'components/Header'
import { Typography, Button, Container, Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import DoneRoundedIcon from '@material-ui/icons/DoneRounded'
import Image from 'next/image'
import { useSolicitation } from 'store/useSolicitation'
import { useClient } from 'store/useClient'
import { useRateTable } from 'store/useRateTable'
import {
  formatCurrency,
  formatDate,
  formatNumberCard,
  formatPhone
} from 'utils/format'

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
    boxInput: {
      backgroundColor: '#E8FFE3',
      textAlign: 'right',
      borderRadius: '.3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.2rem',
      height: '4.5rem'
    },
    boxInputCard: {
      backgroundColor: '#E8FFE3',
      textAlign: 'right',
      borderRadius: '.3rem',
      display: 'grid',
      gridTemplateColumns: '60px 60px 60px 1fr 32px',
      columnGap: '1rem',
      alignItems: 'center',
      padding: '0 1.2rem',
      height: '4.5rem'
    },
    boxInput2: {
      marginBottom: '3rem',
      display: 'flex',
      flexDirection: 'column'
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
      height: '3.5rem',
      fontSize: '1.3rem',
      textTransform: 'none',
      margin: '1.2rem auto .5rem'
    },
    text: {
      flex: 1,
      textAlign: 'left',
      marginBottom: '.6rem',
      marginLeft: '.8rem',
      color: '#228A95',
      fontSize: '.8rem',
      alignSelf: 'center'
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
      color: '#EF9C4B',
      fontWeight: 'bolder',
      fontStyle: 'italic',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& svg': {
        marginLeft: '.5rem',
        marginBottom: '.4rem'
      }
    },
    textsDefault: {
      color: '#777777',
      fontWeight: 'bold',
      fontStyle: 'italic',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& svg': {
        marginLeft: '.5rem',
        marginBottom: '.4rem'
      }
    },
    textsDolar: {
      color: '#31AC2B',
      fontWeight: 'bolder',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& svg': {
        marginLeft: '.5rem',
        marginBottom: '.4rem'
      }
    }
  })
)

const SendSolicitation = () => {
  const classes = useStyles()
  const router = useRouter()

  const { solicitation, dataSpecificCard } = useSolicitation()
  const { client } = useClient()
  const { tableSelected } = useRateTable()

  const showDetails = () => {
    router.push('/status')
  }

  return (
    <>
      <Header />
      <Content maxWidth="md">
        <>
          <ContentHeader />
          <Container>
            <Typography className={classes.title} component="h3" variant="h6">
              Solicitação Realizada com Sucesso!
            </Typography>
            <Typography className={classes.text} component="p">
              Resumo da Solicitação
            </Typography>
          </Container>
          <Container className={classes.root}>
            <Box className={classes.boxInput}>
              <Typography className={classes.textsDefault}>
                {client.name}
              </Typography>
              <Typography className={classes.textsDefault}>
                {formatPhone(`${client.phone}`)}
                <DoneRoundedIcon
                  style={{ fontSize: '2rem', color: '#228A95' }}
                />
              </Typography>
            </Box>

            <Box className={classes.boxInput}>
              <Typography className={classes.texts}>Taxa de Juros</Typography>
              <Typography className={classes.textsResult}>
                {tableSelected.feels.interest}%{' '}
                <DoneRoundedIcon
                  style={{ fontSize: '2rem', color: '#228A95' }}
                />
              </Typography>
            </Box>
            <Box className={classes.boxInputCard}>
              <Image
                src="/img/card.svg"
                alt="ícone de um cartão"
                width={60}
                height={30}
              />
              <Typography className={classes.textsDefault}>
                {formatNumberCard(`${solicitation.cardNumber}`)}
              </Typography>
              <Typography
                className={classes.textsDefault}
                style={{ color: '#484646' }}
              >
                VISA
              </Typography>
              <Typography className={classes.textsDefault}>
                {formatDate(dataSpecificCard.expire)}
              </Typography>
              <DoneRoundedIcon style={{ fontSize: '2rem', color: '#228A95' }} />
            </Box>
            <Box className={classes.boxInput}>
              <Typography className={classes.texts}>Parcelas:</Typography>
              <Typography className={classes.textsResult}>
                {tableSelected.feels.installments}
                <DoneRoundedIcon
                  style={{ fontSize: '2rem', color: '#228A95' }}
                />
              </Typography>
            </Box>
            <Box className={classes.boxInput}>
              <Typography className={classes.texts}>Valor desejado:</Typography>
              <Typography className={classes.textsDolar}>
                {formatCurrency(solicitation.desiredValue)}
                <DoneRoundedIcon
                  style={{ fontSize: '2rem', color: '#228A95' }}
                />
              </Typography>
            </Box>
            <Box className={classes.boxInput}>
              <Typography className={classes.texts}>
                Valor da Parcela:
              </Typography>
              <Typography className={classes.textsDolar}>
                {formatCurrency(solicitation.installmentValue)}
                <DoneRoundedIcon
                  style={{ fontSize: '2rem', color: '#228A95' }}
                />
              </Typography>
            </Box>
          </Container>
          <Container maxWidth="xs" className={classes.boxInput2}>
            <Box className={classes.boxInput}>
              <Typography className={classes.texts}>
                Valor Total do Empréstimo:
              </Typography>
              <Typography className={classes.textsDolar}>
                {formatCurrency(solicitation.totalPayment)}
                <DoneRoundedIcon
                  style={{ fontSize: '2rem', color: '#228A95' }}
                />
              </Typography>
            </Box>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              disableElevation
              onClick={showDetails}
            >
              Detalhe da Solicitação
            </Button>
            <Typography className={classes.text} component="p">
              O CredFica avaliará a solicitação
            </Typography>
          </Container>
        </>
      </Content>
    </>
  )
}

export default SendSolicitation
