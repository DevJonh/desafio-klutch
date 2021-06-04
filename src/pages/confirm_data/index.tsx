/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Content from 'components/Content'
import ContentHeader from 'components/ContentHeader'
import Header from 'components/Header'
import { useState } from 'react'
import Alert from 'components/Alert'
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  ButtonGroup
} from '@material-ui/core'
import { useRouter } from 'next/router'
import DoneRoundedIcon from '@material-ui/icons/DoneRounded'
import Tables from 'components/Tables'
import { useRateTable } from 'store/useRateTable'
import { useSolicitation } from 'store/useSolicitation'
import { formatCurrency } from 'utils/format'

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
      marginTop: '2rem',
      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
        border: 'none'
      },
      '& .MuiInput-underline:hover:before': {
        border: 'none'
      },
      '& .MuiInputBase-input': {
        backgroundColor: '#fff',
        height: '1.5rem',
        width: '7rem',
        borderRadius: '.3rem',
        padding: '.5rem 1rem',
        color: '#EF9C4B',
        fontWeight: 'bold'
      },
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
    boxInput2: {
      backgroundColor: '##F0F0F0',
      textAlign: 'right',
      borderRadius: '.3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#777777',
      padding: '0 1.2rem',
      height: '4.5rem'
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
      width: '100%',
      fontSize: '1.5rem',
      alignSelf: 'flex-end'
    },
    text: {
      flex: 1,
      textAlign: 'left',
      marginBottom: '1rem',
      color: '#228A95',
      fontSize: '.8rem'
    },
    group: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      height: '3.5rem'
    },
    groupButtons: {
      display: 'flex',
      flexDirection: 'column'
    },
    buttonActive: {
      backgroundColor: '#228A95',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      transition: '.4s',
      pointerEvents: 'none',
      '&:hover': {
        backgroundColor: '#1c8894'
      }
    },
    buttonDefault: {
      backgroundColor: 'transparent',
      color: '#228A95',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    }
  })
)

const BankData = () => {
  const [msgError, setMsgError] = useState('')
  const [isError, setIsError] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [buttonActive, setButtonActive] = useState<'automatico' | 'manual'>(
    'automatico'
  )

  const classes = useStyles()
  const router = useRouter()
  const { tableSelected } = useRateTable()
  const { desiredValue, getDataSolicitation } = useSolicitation()

  const confirmation = async () => {
    const result = await getDataSolicitation(buttonActive)

    if (result) {
      setMsgError('Falha ao Cadastrar a solicitação na base de dados')
      setOpenAlert(true)
    }

    router.push('/send_solicitation')
  }

  return (
    <>
      <Header />
      <Content maxWidth="md">
        <>
          <ContentHeader tabled />
          <Container className={classes.root}>
            <Box className={classes.boxInput}>
              <Typography className={classes.texts}>Valor desejado:</Typography>
              <TextField
                type="text"
                error={isError}
                value={formatCurrency(desiredValue)}
              />
            </Box>
            <Box className={classes.boxInput}>
              <Typography className={classes.texts}>
                Valor total do Empréstimo:
              </Typography>
              <TextField
                type="text"
                error={isError}
                value={formatCurrency(desiredValue)}
              />
            </Box>
            <Box className={classes.boxInput2}>
              <Typography className={classes.texts}>Parcelas:</Typography>
              <TextField
                type="number"
                error={isError}
                value={tableSelected.feels.installments}
              />
            </Box>
            <Box className={classes.boxInput2}>
              <Typography className={classes.texts}>
                Valor da parcela:
              </Typography>
              <TextField
                type="text"
                error={isError}
                value={formatCurrency(tableSelected.feels.portionAmount)}
              />
            </Box>
            <Box className={classes.groupButtons}>
              <Typography className={classes.text}>
                Escolha o tipo de contrato:
              </Typography>
              <ButtonGroup
                className={classes.group}
                disableElevation
                variant="contained"
              >
                <Button
                  className={
                    buttonActive === 'automatico'
                      ? classes.buttonActive
                      : classes.buttonDefault
                  }
                  onClick={() => setButtonActive('automatico')}
                >
                  Automático
                </Button>
                <Button
                  className={
                    buttonActive === 'manual'
                      ? classes.buttonActive
                      : classes.buttonDefault
                  }
                  onClick={() => setButtonActive('manual')}
                >
                  Manual
                </Button>
              </ButtonGroup>
            </Box>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              disableElevation
              onClick={confirmation}
            >
              <DoneRoundedIcon
                style={{ marginRight: '.6rem' }}
                fontSize="large"
              />
              Concluir
            </Button>
          </Container>
          <Tables tables={tableSelected} desiredValue={desiredValue} />
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
