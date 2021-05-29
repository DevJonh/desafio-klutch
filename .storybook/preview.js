import { addDecorator } from '@storybook/react'
import { withNextRouter } from '@storybook-addon-next-router'
import GlobalStyle from '../src/styles/global'

addDecorator(withNextRouter())

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  )
]
