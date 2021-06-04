/* eslint-disable react-hooks/exhaustive-deps */
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Typography, Radio, Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import FooterTable, { FooterProps } from 'components/FooterTable'
import { formatCurrency } from 'utils/format'
import { IFeels, IGenerateTable, IRateTable } from 'types'
import { useRateTable } from 'store/useRateTable'
import { useSolicitation } from 'store/useSolicitation'

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: '#F8F8F8',
    color: '#777777',
    fontWeight: 'bold',
    paddingTop: '.8rem',
    paddingBottom: '.8rem',
    border: '1px solid#E6E6E6',
    borderTop: 'none'
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    },
    cursor: 'pointer',
    transition: '0.4s',
    '&:hover': {
      backgroundColor: '#EFDF4B23'
    },
    '&.active': {
      backgroundColor: '#EFDF4B44'
    }
  }
}))(TableRow)

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginTop: '2.5rem',
    backgroundColor: '#F8F8F8',
    marginBottom: '6rem',
    display: 'flex',
    flexDirection: 'column'
  },
  table: {
    minWidth: 700
  },
  rows: {
    border: '1px solid#E6E6E6'
  },
  title: {
    color: '#228A95',
    fontWeight: 'bold',
    fontSize: '1.15rem',
    textAlign: 'center',
    paddingTop: '.3rem',
    paddingBottom: '.7rem',
    alignSelf: 'center',
    borderLeft: '1px solid#E6E6E6',
    borderRight: '1px solid#E6E6E6'
  },
  containerTable: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    position: 'relative',
    border: '1px solid#E6E6E6',
    borderRadius: '.3rem'
  },
  option: {
    width: '3.5rem',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableCaixa: {
    padding: 0,
    marginBottom: '-2px',
    flex: 1
  }
}))

interface ITables {
  tables: IRateTable[] | IRateTable
  desiredValue: number
}

const Tables = ({ tables, desiredValue }: ITables) => {
  const [isActive, setIsActive] = useState<number>()
  const [propsFooter, setPropsFooter] = useState<FooterProps>()
  const classes = useStyles()
  const [tablesFormat, setTablesFormat] = useState<IGenerateTable | null>(
    {} as IGenerateTable
  )
  const [tablesFormatSingle, setTablesFormatSingle] = useState<IFeels[]>([])

  const [isChecked, setIsChecked] = useState(() =>
    Array.isArray(tables) ? tables[0].name : tables.name
  )

  const {
    getGenerateTableOptions,
    getAllTables,
    getTableActual
  } = useRateTable()
  const { setLoanAmount } = useSolicitation()

  useEffect(() => {
    if (Array.isArray(tables)) {
      getAllTables(tables)
    }
  }, [tables])

  useEffect(() => {
    const data = getGenerateTableOptions(desiredValue)
    if (data && data.tableOne.length > 0) {
      if (!Array.isArray(tables)) {
        if (data.tableNameOne === tables.name) {
          setTablesFormatSingle(data.tableOne)
        } else {
          setTablesFormatSingle(data.tableTwo)
        }
      } else {
        setTablesFormat(data)
      }
    }
  }, [desiredValue, tables, getGenerateTableOptions])

  const handleTable = (index: number) => {
    setIsActive(index)
    let price = 0

    if (tablesFormat && isChecked === tablesFormat.tableNameOne) {
      tablesFormat.tableOne.forEach((table) => {
        if (table.installments === index) {
          getTableActual(
            tablesFormat.tableOne,
            tablesFormat.tableIdOne,
            index,
            tablesFormat.tableNameOne
          )
          price = table.portionAmount
        }
      })
    }

    if (tablesFormat && isChecked === tablesFormat.tableNameTwo) {
      tablesFormat.tableTwo.forEach((table) => {
        if (table.installments === index) {
          getTableActual(
            tablesFormat.tableTwo,
            tablesFormat.tableIdTwo,
            index,
            tablesFormat.tableNameTwo
          )
          price = table.portionAmount
        }
      })
    }

    setLoanAmount(desiredValue)
    setPropsFooter({
      nameTable: isChecked,
      parcela: index,
      valorParcela: price
    })
  }

  return (
    <>
      <Paper className={classes.root} elevation={0}>
        {Array.isArray(tables) ? (
          <>
            <Container maxWidth="md" className={classes.containerTable}>
              <Container className={classes.option}>
                <Radio
                  checked={isChecked === tablesFormat?.tableNameOne}
                  onChange={(e) => {
                    setIsActive(-1)
                    setIsChecked(e.target.value)
                    setPropsFooter({
                      nameTable: tablesFormat?.tableNameOne
                    } as FooterProps)
                  }}
                  value={tablesFormat?.tableNameOne}
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'A' }}
                  color="default"
                />
              </Container>
              <Container className={classes.tableCaixa}>
                <Typography className={classes.title} component="h3">
                  {tablesFormat?.tableNameOne}
                </Typography>
                <Table className={classes.table} aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Parcela</StyledTableCell>
                      <StyledTableCell align="right">
                        Juros da Parcela
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Valor da Parcela
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Valor Total
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Comissão Parceiro
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(tablesFormat?.tableOne) &&
                      tablesFormat?.tableOne.map((table) => (
                        <StyledTableRow
                          onClick={() =>
                            isChecked === tablesFormat?.tableNameOne &&
                            handleTable(table.installments)
                          }
                          className={
                            isActive === table.installments &&
                            isChecked === tablesFormat?.tableNameOne
                              ? 'active'
                              : ''
                          }
                          key={table.installments}
                        >
                          <StyledTableCell className={classes.rows} scope="row">
                            {table.installments}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.rows}
                            align="right"
                          >
                            {table.interest}%
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.rows}
                            align="right"
                          >
                            {formatCurrency(table.portionAmount)}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.rows}
                            align="right"
                          >
                            {formatCurrency(table.amount)}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.rows}
                            align="right"
                          >
                            {formatCurrency(table.comission)}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </Container>
            </Container>

            <Container maxWidth="md" className={classes.containerTable}>
              <Container className={classes.option}>
                <Radio
                  checked={isChecked === tablesFormat?.tableNameTwo}
                  onChange={(e) => {
                    setIsActive(-1)
                    setIsChecked(e.target.value)
                    setPropsFooter({
                      nameTable: tablesFormat?.tableNameTwo
                    } as FooterProps)
                  }}
                  value={tablesFormat?.tableNameTwo}
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'A' }}
                  color="default"
                />
              </Container>

              <Container className={classes.tableCaixa}>
                <Typography className={classes.title} component="h3">
                  {tablesFormat?.tableNameTwo}
                </Typography>
                <Table className={classes.table} aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Parcela</StyledTableCell>
                      <StyledTableCell align="right">
                        Juros da Parcela
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Valor da Parcela
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Valor Total
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Comissão Parceiro
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(tablesFormat?.tableTwo) &&
                      tablesFormat?.tableTwo.map((table) => (
                        <StyledTableRow
                          onClick={() =>
                            isChecked === tablesFormat?.tableNameTwo &&
                            handleTable(table.installments)
                          }
                          className={
                            isActive === table.installments &&
                            isChecked === tablesFormat?.tableNameTwo
                              ? 'active'
                              : ''
                          }
                          key={table.installments}
                        >
                          <StyledTableCell className={classes.rows} scope="row">
                            {table.installments}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.rows}
                            align="right"
                          >
                            {table.interest}%
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.rows}
                            align="right"
                          >
                            {formatCurrency(table.portionAmount)}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.rows}
                            align="right"
                          >
                            {formatCurrency(table.amount)}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.rows}
                            align="right"
                          >
                            {formatCurrency(table.comission)}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </Container>
            </Container>
          </>
        ) : (
          <>
            <Container maxWidth="md" className={classes.containerTable}>
              <Container className={classes.tableCaixa}>
                <Typography className={classes.title} component="h3">
                  {tables.name}
                </Typography>
                <Table className={classes.table} aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Parcela</StyledTableCell>
                      <StyledTableCell align="right">
                        Juros da Parcela
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Valor da Parcela
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Valor Total
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Comissão Parceiro
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tablesFormatSingle.map((table) => (
                      <StyledTableRow key={table.id}>
                        <StyledTableCell className={classes.rows} scope="row">
                          {table.installments}
                        </StyledTableCell>
                        <StyledTableCell className={classes.rows} align="right">
                          {table.interest}%
                        </StyledTableCell>
                        <StyledTableCell className={classes.rows} align="right">
                          {formatCurrency(table.portionAmount)}
                        </StyledTableCell>
                        <StyledTableCell className={classes.rows} align="right">
                          {formatCurrency(table.amount)}
                        </StyledTableCell>
                        <StyledTableCell className={classes.rows} align="right">
                          {formatCurrency(table.comission)}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Container>
            </Container>
          </>
        )}
      </Paper>
      {propsFooter ? (
        <FooterTable
          nameTable={propsFooter?.nameTable}
          parcela={propsFooter?.parcela}
          valorParcela={propsFooter?.valorParcela}
        />
      ) : (
        Array.isArray(tables) && (
          <FooterTable nameTable={isChecked} parcela={0} valorParcela={0} />
        )
      )}
    </>
  )
}

export default Tables
