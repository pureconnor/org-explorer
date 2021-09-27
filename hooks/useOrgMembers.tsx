import { useEffect, useState } from 'react'
import { fetchOrgMembers } from '../pages/api/orgs'
import { GitHubOrgLogin, OrgMember } from '../types'

export const useOrgMembers = (login: GitHubOrgLogin) => {
  const [members, setMembers] = useState<
    OrgMember[] | undefined
  >()

  useEffect(() => {
    fetchOrgMembers(login).then((members) => {
      setMembers(members)
    })
  }, [login])

  return members
}
