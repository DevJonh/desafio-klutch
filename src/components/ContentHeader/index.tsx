import AddCircleIcon from '@material-ui/icons/AddCircle'
import Image from 'next/image'
import { Container, Typography, Box, Select, MenuItem } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useRateTable } from 'store/useRateTable'
import { useSolicitation } from 'store/useSolicitation'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '&.MuiInput-underline:after': {
        border: 'none'
      },
      '&.MuiInput-underline:hover:before': {
        border: 'none'
      },
      '& .MuiSelect-select': {
        backgroundColor: '#fff',
        height: '1.5rem',
        width: '9.5rem',
        borderRadius: '.3rem',
        padding: '.5rem .8rem',
        color: '#EF9C4B',
        fontWeight: 'bold',
        textAlign: 'left',
        border: 'none',
        display: 'flex',
        alignItems: 'center'
      },
      '&.MuiInput-underline:before': {
        border: 'none'
      }
    },
    containerHeader: {
      display: 'flex',
      marginTop: '1.8rem',
      alignItems: 'center'
    },
    text: {
      maxWidth: '12rem',
      marginLeft: '1.5rem',
      fontWeight: 'bold',
      color: '#228A95',
      fontSize: '2rem',
      lineHeight: '2.2rem'
    },
    boxInput: {
      backgroundColor: '#f0f0f0',
      textAlign: 'right',
      borderRadius: '.3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.2rem',
      height: '4rem',
      marginTop: '1.8rem',
      width: '28rem'
    },
    texts: {
      color: '#228A95',
      fontWeight: 'bold',
      fontStyle: 'italic'
    }
  })
)

type ContentHeaderProps = {
  tabled?: boolean
}

const ContentHeader = ({ tabled }: ContentHeaderProps) => {
  const classes = useStyles()
  const { tableSelected, getGenerateTableOptions } = useRateTable()
  const { desiredValue } = useSolicitation()

  const tables = getGenerateTableOptions(desiredValue)

  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Container className={classes.containerHeader}>
        <AddCircleIcon
          fontSize="large"
          style={{ color: '#228A95', marginRight: '1.5rem' }}
        />
        <Image
          src="/img/register.svg"
          alt="register icon"
          width={57}
          height={57}
        />
        <Typography className={classes.text} component="h3">
          Simulação de Taxas
        </Typography>
      </Container>
      {tabled && (
        <Box className={classes.boxInput}>
          <Typography className={classes.texts}>Tabela:</Typography>
          <Select className={classes.root} value={tableSelected.name}>
            <MenuItem value={tableSelected.name}>{tableSelected.name}</MenuItem>
            {tables && (
              <MenuItem
                value={
                  tables.tableNameOne === tableSelected.name
                    ? tables.tableNameTwo
                    : tables.tableNameOne
                }
              >
                {tables.tableNameOne === tableSelected.name
                  ? tables.tableNameTwo
                  : tables.tableNameOne}
              </MenuItem>
            )}
          </Select>
        </Box>
      )}
    </Container>
  )
}

export default ContentHeader
