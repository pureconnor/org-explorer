import { useEffect, useState } from 'react'
import { fetchOrgMembers } from '../pages/api/orgs'
import { GitHubOrgLogin, OrgMember } from '../types'

/**
 * @NOTE
 * Improvements: I would like to flush this out a bit more with error
 * and loading states. I'm not really handling these calls the best here.
 */

/**
 * Use this hook to get members that belong to a specific organization
 * @param login GitHubOrgLogin
 * @returns Array of members that belong to the organization
 */
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
