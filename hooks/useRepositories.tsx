import { useEffect, useState } from 'react'
import { getOrgRepositories } from '../pages/api/orgs'
import { GitHubOrgLogin, Repository } from '../types'

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
