import { GetStaticProps, NextPage } from 'next'
import { useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GitHubOrg } from '../types'
import { DEFAULT_PER_PAGE, getOrgs } from './api/orgs'
import { ListItem } from '../components/ListItem'

interface DiscoverProps {
  orgs: GitHubOrg[]
}

const Discover: NextPage<DiscoverProps> = ({
  orgs,
}: DiscoverProps) => {
  const lastOrgId = useRef(orgs.slice(-1)[0].id)
  const [orgList, setOrgList] = useState<GitHubOrg[]>(orgs)

  const getMoreOrgs = async () => {
    getOrgs(DEFAULT_PER_PAGE, lastOrgId.current).then(
      (orgs) => {
        lastOrgId.current = Number(orgs.slice(-1)[0].id)
        setOrgList((orgList) => orgList.concat(orgs))
      }
    )
  }

  return (
    <div className="h-full overflow-hidden debug-screens bg-white">
      <dl className="border-b-2 p-8">
        <h1 className="font-semibold text-6xl items-center text-blue-800">
          Discover Organizations
        </h1>
        <dd className="py-4 text-md text-sm md:text-xl w-full text-gray-400 tracking-wide">
          There&apos;s plenty more where that came from.
        </dd>
      </dl>
      <div className="flex h-5/6 w-full ">
        <div
          id="scrollableDiv"
          className="flex flex-wrap h-full w-full overflow-y-auto bg-blue-800 py-8"
        >
          <InfiniteScroll
            dataLength={orgList.length}
            next={getMoreOrgs}
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
              gap: 24,
            }}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {orgList.map((org) => (
              <ListItem key={org.node_id} {...org} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const orgs = await getOrgs()

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

export default Discover
