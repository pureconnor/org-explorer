import { useState, useEffect } from 'react'
import { getSpecificOrg } from '../pages/api/orgs'
import { GitHubOrgLogin } from '../types'

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
