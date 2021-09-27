import Link from 'next/link'
import Image from 'next/image'
import { GitHubOrg } from '../types'
import { useIsVerified } from '../hooks/useIsVerified'

export const Card = ({
  login,
  avatar_url,
  description,
  ...rest
}: GitHubOrg) => {
  const verified = useIsVerified(login)

  return (
    <Link as={`/org/${login}`} href="/org/[name]" passHref>
      <div className="w-64 h-64 mx-5 cursor-pointer hover:shadow-xl rounded-xl hover:-translate-y-1 transform">
        <div className="flex h-full flex-col">
          <div className="flex h-3/4 w-3/4 m-auto justify-center shadow-lg rounded-full bg-white shadow- ">
            <div className="m-auto w-1/2 flex justify-center">
              <Image
                src={avatar_url}
                alt="Organization Logo"
                width="100%"
                height="100%"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex justify-center text-center h-1/4 ">
            <h1 className="m-auto text-white font-normal tracking-wide">
              {login}
              {verified && (
                <span className="ml-1">
                  <Image
                    src={'/verified.webp'}
                    alt="Verified Organization"
                    width="14px"
                    height="14px"
                  />
                </span>
              )}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  )
}
