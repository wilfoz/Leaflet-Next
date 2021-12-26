import * as S from './styles'

const Main = () => (
  <S.Wrapper>
    <S.Logo src="/img/logo.svg" alt="Imagem react" />
    <S.Title>react avançado</S.Title>
    <S.Description>
      Typescript, ReactJS, NextJS e Styled Component
    </S.Description>
    <S.Illustration
      src="/img/hero-illustration.svg"
      alt="desenvolvedor de frente para a tela"
    />
  </S.Wrapper>
)

export default Main
