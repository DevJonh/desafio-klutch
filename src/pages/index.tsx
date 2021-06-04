import { GetStaticProps } from 'next'
import Header from 'components/Header'
import Content from 'components/Content'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { formatCurrency } from 'utils/format'
import Tables from 'components/Tables'
import ContentHeader from 'components/ContentHeader'
import Alert from 'components/Alert'

import axios from 'config/axios'
import { IRateTable } from 'types'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      marginTop: '3.3rem',
      alignItems: 'center',
      justifyContent: 'center',

      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
        border: 'none'
      },
      '& .MuiInput-underline:hover:before': {
        border: 'none'
      },
      '& .MuiInputBase-input': {
        backgroundColor: '#f0f0f0',
        height: '1.2rem',
        borderRadius: '.3rem',
        padding: '.5rem 1rem',
        textAlign: 'center'
      },
      '& .MuiInput-underline.Mui-error': {
        border: '1px solid #f44336',
        borderRadius: '.3rem'
      }
    },
    desiredValue: {
      fontWeight: 'bold',
      color: '#228A95',
      fontSize: '1.35rem',
      flex: 1
    },

    form: {
      display: 'flex',
      alignItems: 'center',
      height: '8rem',
      '& div': {
        margin: 0
      }
    },
    input: {
      color: '#228A95',
      width: '17rem'
    },
    buttonSubmit: {
      backgroundColor: '#EF9C4B',
      color: '#fff',
      fontWeight: 'bold',
      transition: '.4s',
      '&:hover': {
        backgroundColor: '#df8b38'
      },
      marginLeft: '1.5rem'
    }
  })
)

interface IHomeProps {
  tables: IRateTable[]
}

const Home = ({ tables }: IHomeProps) => {
  const [valueDesired, setValueDesired] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [openedTable, setOpenedTable] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const calculateLoan = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const value = parseFloat(valueDesired)

    if (isNaN(value)) {
      setIsError(true)
      setMessageError('Insira apenas números')
      setOpenAlert(true)
      setValueDesired('')
      return
    }

    if (value < 300) {
      setIsError(true)
      setMessageError('O valor mínimo é R$ 300,00')
      setOpenAlert(true)
      setValueDesired('')
      return
    }

    if (value > 10000) {
      setIsError(true)
      setMessageError('O valor máximo é R$ 10.000,00')
      setOpenAlert(true)
      setValueDesired('')
      return
    }

    setValue(value)
    setIsError(false)
    setMessageError('')

    const valueFormatted = formatCurrency(value)
    setValueDesired(valueFormatted)
    setOpenedTable(true)
  }

  return (
    <>
      <Header />
      <Content maxWidth="md">
        <>
          <ContentHeader />
          <Container className={classes.root}>
            <Typography className={classes.desiredValue} component="h3">
              Valor Desejado
            </Typography>
            <form
              noValidate
              className={classes.form}
              onSubmit={(e) => calculateLoan(e)}
            >
              <TextField
                type="text"
                value={valueDesired}
                placeholder="R$ 0,00"
                label={false}
                error={isError}
                onChange={(e) => setValueDesired(e.target.value)}
                size="small"
                margin="normal"
                className={classes.input}
              />
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                disableElevation
                size="medium"
                type="submit"
              >
                Calcular
              </Button>
            </form>
          </Container>
          {openedTable && tables.length !== 0 && tables[1].id && (
            <Tables tables={tables} desiredValue={value} />
          )}
        </>
      </Content>
      <Alert
        setClose={() => setOpenAlert(false)}
        openAlert={openAlert}
        msg={messageError}
        type="error"
        vertical="top"
        horizontal="right"
      />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const tables = await axios
    .get<IRateTable[]>('rateTable')
    .then((res) => res.data)

  return {
    props: {
      tables: [...tables]
    }
  }
}
