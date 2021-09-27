import { useState, useEffect } from 'react'
import { getSpecificOrg } from '../pages/api/orgs'
import { GitHubOrg, GitHubOrgLogin } from '../types'

/**
 * @NOTE
 * Improvements: I would like to flush this out a bit more with error
 * and loading states. I'm not really handling these calls the best here.
 */

/**
 * Use this hook to get more fine details about an organization
 * @param login GitHubOrgLogin
 * @returns Details about a GitHub Organization
 */
export const useOrgDetails = (login: GitHubOrgLogin) => {
  const [details, setDetails] = useState<
    GitHubOrg | undefined
  >()

  useEffect(() => {
    getSpecificOrg(login).then((details) => {
      setDetails(details)
    })
  }, [login])

  return details
}
