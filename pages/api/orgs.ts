import { GitHubOrgLogin, GitHubResponse } from '../../types'

const BASE_URL = 'https://api.github.com'

const options = {
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_PAT}`,
    Accept: 'application/vnd.github.v3+json',
  },
}

export const INITIAL_RECORD = 69631
export const DEFAULT_PER_PAGE = 30

export const getOrgs = async (
  numOrgs?: number,
  sinceRecord?: number
): Promise<GitHubResponse> => {
  const res = await fetch(
    `${BASE_URL}/organizations?per_page=${
      numOrgs || DEFAULT_PER_PAGE
    }&since=${sinceRecord || INITIAL_RECORD}`,
    options
  )
  const data: GitHubResponse = await res.json()

  if (data.message) {
    throw new Error(`Error: ${data.message}`)
  }

  return data
}

export const getSpecificOrg = async (
  login: GitHubOrgLogin
): Promise<GitHubResponse> => {
  const res = await fetch(`${BASE_URL}/orgs/${login}`)
  const data = await res.json()

  if (data.message) {
    throw new Error(`Error: ${data.message}`)
  }

  return data
}

export const fetchOrgMembers = async (
  login: GitHubOrgLogin
): Promise<GitHubResponse> => {
  const res = await fetch(
    `${BASE_URL}/orgs/${login}/public_members`,
    options
  )
  const data = await res.json()

  if (data.message) {
    throw new Error(`Error: ${data.message}`)
  }

  return data
}
