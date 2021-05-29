import * as Style from './styles'

const Main = ({
  title = 'React Avançado',
  description = 'Typescript, ReactJS, NextJS e Styled Components'
}) => (
  <Style.Wrapper>
    <Style.Logo src="/img/logo.svg" alt="Logo do Curso React Avançado" />
    <Style.Title>{title}</Style.Title>
    <Style.Description>{description}</Style.Description>
    <Style.Illustrator
      src="/img/hero-illustration.svg"
      alt="Desenvolvedor sentado na frente do computador."
    />
  </Style.Wrapper>
)

export default Main
