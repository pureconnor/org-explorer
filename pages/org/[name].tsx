import React from 'react'
import { useRouter } from 'next/router'
import { getOrgs, getSpecificOrg } from '../api/orgs'
import { GetStaticProps } from 'next'
import { GitHubOrg } from '../../types'

interface OrgDetailsProps {
  org: GitHubOrg
}

export const getStaticProps: GetStaticProps<OrgDetailsProps> =
  async (context) => {
    const name = context.params?.name
    if (name && typeof name === 'string') {
      const org = await getSpecificOrg(name)
      return {
        props: { org },
      }
    } else {
      return {
        notFound: true,
      }
    }
  }

export const getStaticPaths = async () => {
  const allOrgs = await getOrgs()
  return {
    paths: allOrgs?.map(
      ({ login }) => `/org/${login}` ?? []
    ),
    fallback: true,
  }
}

export const OrgDetails = ({ org }: OrgDetailsProps) => {
  const router = useRouter()

  if (!router.isFallback && !org) {
    return <div>Oops, something went wrong!</div>
  }

  return (
    <section>
      {router.isFallback ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>I&apos;m a drilldown</h1>
          <p>{JSON.stringify(org)}</p>
        </div>
      )}
    </section>
  )
}

export default OrgDetails
