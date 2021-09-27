import { useEffect, useState } from 'react'
import { getOrgRepositories } from '../pages/api/orgs'
import { GitHubOrgLogin, Repository } from '../types'

/**
 * @NOTE
 * Improvements: I would like to flush this out a bit more with error
 * and loading states. I'm not really handling these calls the best here.
 */

/**
 * Use this hook to get all repositories for a given GitHub Organization
 * @param login GitHubOrgLogin
 * @returns Array of repositories
 */
export const useRepositories = (login: GitHubOrgLogin) => {
  const [repos, setRepos] = useState<
    Repository[] | undefined
  >()

  useEffect(() => {
    getOrgRepositories(login).then((repos) =>
      setRepos(repos)
    )
  }, [login])

  return repos
}
