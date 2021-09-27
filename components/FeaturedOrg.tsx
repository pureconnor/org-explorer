import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useOrgDetails } from '../hooks'
import { Collapse } from './Collapse'
import { PhotoGalleryProps } from './PhotoGallery'

const PhotoGallery = dynamic<PhotoGalleryProps>(
  () =>
    import('./PhotoGallery').then(
      (mod) => mod.PhotoGallery
    ),
  {
    loading: () => <p>Loading...</p>,
  }
)

const FEATURED_ORG = 'facebook'

export interface FeaturedOrgProps {}
export const FeaturedOrg = () => {
  const details = useOrgDetails(FEATURED_ORG)

  const {
    name,
    login,
    location,
    description,
    twitter_username,
    avatar_url,
    blog,
  } = details || {}

  if (!name) return <p>Loading...</p>

  return (
    <Collapse className="px-24">
      <div className="flex flex-1 flex-col justify-center">
        <dl className="p-8">
          <dd className="md:text-4xl lg:text-5xl lg:text-left text-blue-800 mb-4">
            Meet
          </dd>
          <dd className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold">
            {name}
          </dd>
          <dd className="text-md md:text-xl text-gray-400 mb-4">
            {location}
          </dd>
          <dd className="text-md md:text-xl text-gray-600 py-4 w-full sm:w-4/5">
            {description}
          </dd>
          <dd className="py-4">
            Interested? Find out More:
          </dd>
          <dd className="inline-flex text-sm md:text-xl text-gray-600 py-4 align-middle">
            <Image
              src="/twitter_logo.webp"
              alt="Twitter Logo"
              width="32px"
              height="24px"
            />
            <div className="flex items-center">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/${twitter_username}`}
                className="ml-4"
              >
                @{twitter_username}
              </a>
            </div>
          </dd>
          <br />
          <dd className="inline-flex text-sm md:text-xl text-gray-600 align-middle">
            <Image
              src={avatar_url!}
              alt="Org Blog Link"
              width="32px"
              height="32px"
            />
            <div className="flex items-center">
              <a
                target="_blank"
                rel="noreferrer"
                href={blog}
                className="ml-4 items-center"
              >
                {blog}
              </a>
            </div>
          </dd>
        </dl>
      </div>
      <PhotoGallery login={login} />
    </Collapse>
  )
}
