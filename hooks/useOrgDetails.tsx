import { useState, useEffect } from 'react'
import { getSpecificOrg } from '../pages/api/orgs'
import { GitHubOrg, GitHubOrgLogin } from '../types'

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
