import { AppProps } from 'next/app'
import Head from 'next/head'
import { CssBaseline } from '@material-ui/core'
import NextNProgress from 'nextjs-progressbar'
import { ClientProvider } from '../store/useClient'
import { RateTableProvider } from '../store/useRateTable'
import { SolicitationProvider } from '../store/useSolicitation'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Klutch Loan</title>
        <meta
          name="description"
          content="A simple project started to work with Typescript, React, NextJS and Styled Components"
        />
        <meta name="theme-color" content="#06092b" />
      </Head>
      <ClientProvider>
        <RateTableProvider>
          <SolicitationProvider>
            <CssBaseline />
            <NextNProgress
              color="#EF9C4B"
              startPosition={0.3}
              stopDelayMs={200}
              height={2}
            />

            <Component {...pageProps} />
          </SolicitationProvider>
        </RateTableProvider>
      </ClientProvider>
    </>
  )
}

export default App
