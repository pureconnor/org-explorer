import Image from 'next/image'
import { GitHubOrgLogin } from '../types'
import { useOrgMembers } from '../hooks'

export interface PhotoGalleryProps {
  login: GitHubOrgLogin
}
export const PhotoGallery = ({
  login,
}: PhotoGalleryProps) => {
  const members = useOrgMembers(login)

  const imageSizing =
    'rounded-md border-4 \
    h-24 w-24 \
    md:h-28 md:w-28 \
    lg:h-32 lg:w-32 \
    xl:h-40 xl:w-40'

  const rotationBank = [
    'transform -rotate-12 ',
    'transform -rotate-6 -translate-y-6 ',
    'transform -translate-y-8 ',
    'transform rotate-6 -translate-y-6 ',
    'transform rotate-12 ',
  ]

  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex flex-col  md:gap-8 lg:gap-12 gap-10">
        <div>
          <div className="text-center md:text-4xl lg:text-6xl font-semibold text-blue-800 ">
            The Members
          </div>
          <p className="p-4 text-lg text-center text-gray-500 tracking-wide">
            These are some of the people that make this
            organization great.
          </p>
        </div>
        <div className="inline-flex m-auto -space-x-10 mb-8">
          {members &&
            members
              .slice(0, 5)
              .map(({ node_id, avatar_url }, index) => (
                <div
                  key={node_id}
                  className={`relative ${rotationBank[index]} ${imageSizing}`}
                >
                  <Image
                    alt="Org Member Photos"
                    src={avatar_url}
                    layout="fill"
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}
