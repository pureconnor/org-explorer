import Image from 'next/image'
import Link from 'next/link'
import { useIsVerified } from '../hooks/useIsVerified'
import { GitHubOrg } from '../types'

export const ListItem = ({
  avatar_url,
  login,
  ...rest
}: GitHubOrg) => {
  const verified = useIsVerified(login)
  return (
    <Link as={`/org/${login}`} href="/org/[name]" passHref>
      <div className="h-48 w-1/4 flex-shrink-0 border-b m-auto flex bg-white rounded-xl shadow-md cursor-pointer">
        <div className="flex w-1/4 justify-center items-center">
          <div className="w-3/4 flex justify-center">
            <Image
              src={avatar_url}
              width="100%"
              height="100%"
              alt="Org Avatar"
              className="rounded-full"
            />
          </div>
        </div>
        <p className="w-2/4 pl-4 self-center truncate text-2xl">
          {login}{' '}
          {verified && (
            <span className="ml-1">
              <Image
                src={'/verified.webp'}
                alt="Verified Organization"
                width="24px"
                height="24px"
              />
            </span>
          )}
        </p>
        <div className="w-1/4 pr-6 flex self-center text-blue-800 font-semibold text-xl justify-end">
          <span>&gt;</span>
        </div>
      </div>
    </Link>
  )
}
