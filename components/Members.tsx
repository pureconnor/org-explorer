import React from 'react'
import Image from 'next/image'
import { useOrgMembers } from '../hooks'
import { GitHubOrgLogin } from '../types'

export interface MemberProps {
  name: GitHubOrgLogin
}

export const Members = ({ name }: MemberProps) => {
  const members = useOrgMembers(name)

  return (
    <div className="flex flex-row">
      {members &&
        members.slice(0, 10).map((member) => (
          <div key={member.id} className="h-4 w-4 ">
            <Image
              className="rounded-full"
              src={member.avatar_url}
              width={'100%'}
              height={'100%'}
              alt="Org Member Avatar"
            />
          </div>
        ))}
    </div>
  )
}
