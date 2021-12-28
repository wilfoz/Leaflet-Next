import client from 'graphql/client'
import { GetPlaceBySlugQuery, GetPlacesQuery } from 'graphql/generated/graphql'
import { GET_PLACES, GET_PLACE_BY_SLUG } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import PlaceTemplate, { PlaceTemplateProps } from 'templates/Place'

export default function Place({ place }: PlaceTemplateProps) {
  const router = useRouter()

  // retorna um loading, qq coisa enquanto esta sendo criado
  if (router.isFallback) return null

  return <PlaceTemplate place={place} />
}

// getStaticPaths => serve para gerar as urls em build time /about, /trip/petropolis
export async function getStaticPaths() {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES, {
    first: 3
  })
  const paths = places.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

// getStaticProps => server para buscar dados da pagina (props) - build time - estatico
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { place } = await client.request<GetPlaceBySlugQuery>(
    GET_PLACE_BY_SLUG,
    {
      slug: `${params?.slug}`
    }
  )

  if (!place) return { notFound: true }

  return {
    props: {
      place
    }
  }
}
// getServerSideProps => server para buscar dados da pagina (props) - runtime - toda requisicao (bundle fica no server)
// getInitialProps => server para buscar dados da pagina (pros) - runtime - toda requisicao (bundle tambem vem para o client)
