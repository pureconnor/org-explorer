import Image from 'next/image'
import { useRouter } from 'next/router'
import { getOrgs, getSpecificOrg } from '../api/orgs'
import { GetStaticProps } from 'next'
import { GitHubOrg } from '../../types'
import { Members } from '../../components/Members'
import { useRepositories } from '../../hooks/useRepositories'
import { RepositoryCard } from '../../components/RepositoryCard'

/**
 * @NOTE Improvements
 * I could have made better use of the fallbacks and not found scenarios.
 * These interim/edge states are not handled the best with this implementation.
 *
 * Wanted to make use of dynamic routing since it's optimized nicely by
 * NextJS. We can prerender these routes to increase page load speed.
 */

export const getStaticProps: GetStaticProps<GitHubOrg> =
  async (context) => {
    const name = context.params?.name
    if (name && typeof name === 'string') {
      const org = await getSpecificOrg(name)
      return {
        props: { ...org },
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

export const OrgDetails = ({
  name,
  avatar_url,
  login,
  description,
  location,
  blog,
  public_repos,
}: GitHubOrg) => {
  const router = useRouter()
  const repositories = useRepositories(login)

  if (!router.isFallback && !name) {
    return <div>Oops, something went wrong!</div>
  }

  if (router.isFallback) return <p>Loading...</p>

  return (
    <section>
      <div className="h-full overflow-hidden debug-screens bg-white">
        <dl className="border-b-2 py-8 px-14">
          <dd className="font-semibold text-6xl items-center text-blue-800">
            <div className="flex items-center">
              <Image
                src={avatar_url}
                width="100%"
                height="100%"
                alt="Org Avatar"
                className="rounded-full"
              />
              <span className="px-8">{name}</span>
            </div>
          </dd>
          <dd className="py-12 text-md text-sm md:text-xl w-full text-gray-400 tracking-wide">
            {description && description.length > 0 ? (
              description
            ) : (
              <>
                This company doesn&apos;t have a
                description.
                <br />
                <span className="tracking-wide italic text-sm">
                  All right, then. Keep your secrets.
                </span>
              </>
            )}
          </dd>
          <dl className="text-2xl">
            <dd className="w-1/2 overflow-hidden">
              <h1 className="font-semibold text-blue-800 mb-4">
                Organization Members:{' '}
              </h1>
              <Members login={login} />
            </dd>
            <dd className="mt-12">
              Based out of{' '}
              <span className="text-blue-800 font-semibold">
                {location && location.length > 0
                  ? location
                  : 'Planet Earth'}
              </span>
            </dd>
            <dd>
              <span className="text-blue-800 font-semibold">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={blog}
                >
                  {blog}
                </a>
              </span>
            </dd>
            <dd className="py-8">
              <span className="text-blue-800 font-semibold">
                {public_repos}{' '}
              </span>
              active{' '}
              {public_repos === 1
                ? 'Repository'
                : 'Repositories'}
            </dd>
          </dl>
        </dl>
        <div className="flex flex-wrap p-8">
          {repositories && repositories.length > 0 ? (
            repositories.map((repo) => (
              <RepositoryCard
                key={repo.node_id}
                {...repo}
              />
            ))
          ) : (
            <h1 className="text-blue-800 text-6xl p-12">
              Uh oh, this org doesn&apos;t have any
              Repositories!
            </h1>
          )}
        </div>
      </div>
    </section>
  )
}

export default OrgDetails
