import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { FeaturedOrgProps } from '../components/FeaturedOrg'
import { Head } from '../components/Head'
import { Spacer } from '../components/Spacer'
import { Collapse } from '../components/Collapse'
import { GitHubOrg } from '../types'
import dynamic from 'next/dynamic'
import { getOrgs } from './api/orgs'
import { Card } from '../components/Card'

/**
 * @NOTE Improvements
 * This a bit cluttered due to the styles. I'd like to
 * improve upon the verbosity of the styles here by adding custom theme
 * properties inside of the tailwindcss configuration
 *
 * Strategy here was to create some meaningful ( albeit slightly ) static
 * content to assist with FCP and get heavier components to render dynamically
 * below the fold.
 *
 */

interface HomePageProps {
  orgs: GitHubOrg[]
}

const FeaturedOrg = dynamic<FeaturedOrgProps>(() =>
  import('../components/FeaturedOrg').then(
    (mod) => mod.FeaturedOrg
  )
)

const Home: NextPage<HomePageProps> = ({ orgs }) => {
  return (
    <>
      <Head />
      <div className="h-screen debug-screens bg-white">
        <section className="h-5/6 bg-gradient-to-b md:bg-gradient-to-br sm:bg-gradient-to-b  from-white via-white to-blue-800">
          <div className="flex flex-col h-full justify-center  text-center w-3/4 m-auto">
            <h1 className="font-semibold text-3xl md:text-5xl xl:text-6xl text-blue-800 tracking-widest uppercase">
              Organization
            </h1>
            <span className="text-gray-400 tracking-wider">
              /ˌôrɡənəˈzāSH(ə)n/
            </span>
            <div className="text-xl py-8 text-gray-600 font-light mt-8 tracking-wide">
              A collective group of minds on a mission to
              create something.
            </div>
          </div>
        </section>
        <Spacer size="4" />
        <Collapse className="px-24 py-12">
          <div className="flex flex-1 justify-center -space-x-48 m-auto">
            <div className="transform -rotate-6 bg-blue-400 w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-xl p-8">
              I&apos;m an Organization
            </div>
            <div className="transform rotate-6 bg-blue-200 w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-xl p-8">
              I&apos;m an Organization
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <dl className="p-12">
              <dd className="text-center text-4xl sm:text-4xl md:text-6xl xl:text-7xl font-semibold">
                GitHub <br /> Organizations
              </dd>
              <dd className="text-center py-6 px-2 text-gray-600 tracking-wide">
                GitHub is home to more than{' '}
                <span className="text-blue-800">
                  1,000,000{' '}
                </span>
                organizations.
              </dd>
              <dd className="w-3/4 text-center m-auto text-gray-600">
                Each of these organizations is contributing
                to the world&apos;s technological growth -
                every day.
              </dd>
              <dd></dd>
            </dl>
          </div>
        </Collapse>
        <section className="bg-white">
          <div className="px-32 py-12">
            <div className="inline-flex">
              <h1 className="font-semibold text-6xl text-blue-800">
                Featured this week
              </h1>
              <h1 className="font-semibold text-7xl mt-8 ml-10 ">
                &#x2935;
              </h1>
            </div>
          </div>
        </section>
        <FeaturedOrg />
        <div className="bg-blue-800 h-3/4 px-4 sm:px-32 py-12">
          <div className="inline-flex w-full pr-10 border-b pb-4">
            <div>
              <h1 className="font-semibold text-3xl md:text-6xl text-white">
                Discover More
              </h1>
              <dd className="text-md text-sm md:text-xl w-full text-gray-400 tracking-wide">
                There&apos;s plenty more where that came
                from.
              </dd>
            </div>
            <Link
              as={'/discover'}
              href="/discover"
              passHref
            >
              <h1 className="self-end text-lg ml-auto text-white cursor-pointer align-middle">
                See More
              </h1>
            </Link>
          </div>
          <div className="w-full">
            <ul className="-pl-4 overflow-x-auto flex w-full py-20">
              {orgs &&
                orgs.map((org) => (
                  <li key={org.node_id}>
                    <Card {...org} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const orgs = await getOrgs(10)

  if (orgs.message) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      orgs: orgs ?? [],
    },
  }
}

export default Home
