import React from 'react'
import Image from 'next/image'
import { useOrgMembers } from '../hooks'
import { GitHubOrgLogin } from '../types'

export interface MemberProps {
  login: GitHubOrgLogin
}

export const Members = ({ login }: MemberProps) => {
  const members = useOrgMembers(login)

  console.log('members: ', members)

  return (
    <div className="flex flex-row flex-wrap">
      {members && members.length > 0 ? (
        members.slice(0, 50).map((member) => (
          <div key={member.id} className="h-12 w-12 ">
            <Image
              className="rounded-full"
              src={member.avatar_url}
              width={'100%'}
              height={'100%'}
              alt="Org Member Avatar"
            />
          </div>
        ))
      ) : (
        <h1>Looks like everyone left!</h1>
      )}
    </div>
  )
}
