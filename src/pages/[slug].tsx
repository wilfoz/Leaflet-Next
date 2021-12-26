import client from 'graphql/client'
import { GetPageBySlugQuery, GetPagesQuery } from 'graphql/generated/graphql'
import { GET_PAGES, GET_PAGE_BY_SLUG } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import PageTemplate, { PageTemplateProps } from 'templates/Pages'

export default function Page({ heading, body }: PageTemplateProps) {
  const router = useRouter()

  // retorna um loading, qq coisa enquanto esta sendo criado
  if (router.isFallback) return null

  return <PageTemplate heading={heading} body={body} />
}

// getStaticPaths => serve para gerar as urls em build time /about, /trip/petropolis
export async function getStaticPaths() {
  const { pages } = await client.request<GetPagesQuery>(GET_PAGES, { first: 1 })
  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

// getStaticProps => server para buscar dados da pagina (props) - build time - estatico
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = await client.request<GetPageBySlugQuery>(GET_PAGE_BY_SLUG, {
    slug: `${params?.slug}`
  })

  if (!page) return { notFound: true }

  return {
    props: {
      heading: page.heading,
      body: page.body.html
    }
  }
}
// getServerSideProps => server para buscar dados da pagina (props) - runtime - toda requisicao (bundle fica no server)
// getInitialProps => server para buscar dados da pagina (pros) - runtime - toda requisicao (bundle tambem vem para o client)
