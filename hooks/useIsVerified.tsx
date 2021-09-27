import { useState, useEffect } from 'react'
import { getSpecificOrg } from '../pages/api/orgs'
import { GitHubOrgLogin } from '../types'

/**
 * Use this hook to get a boolean response type regarding if a particular
 * organization is verified by GitHub
 * @param login GitHubOrgLogin
 * @returns boolean
 */
export const useIsVerified = (login: GitHubOrgLogin) => {
  const [verified, setVerified] = useState<
    boolean | undefined
  >()

  useEffect(() => {
    getSpecificOrg(login).then((details) => {
      if (details.is_verified) {
        setVerified(details.is_verified)
      }
    })
  }, [login])

  return verified
}
