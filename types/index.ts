export type GitHubOrg = {
  login?: string
  id: number
  node_id?: string
  url?: string
  repos_url?: string
  events_url?: string
  hooks_url?: string
  issues_url?: string
  members_url?: string
  name: string
  location: string
  twitter_username: string
  public_members_url?: string
  public_repos: number
  blog: string
  avatar_url: string
  description?: string
  is_verified?: boolean
  followers?: number
  following?: number
}

export type GitHubOrgLogin = GitHubOrg['login']

export type GitHubResponseError = {
  message: string
  documentation_url: string
}

export type GitHubResponse = GitHubOrg[] &
  GitHubOrg &
  GitHubResponseError &
  OrgMember[]

export type OrgMember = {
  login?: string
  id?: number
  node_id?: string
  avatar_url: string
  gravatar_id?: string
  url?: string
  html_url?: string
  followers_url?: string
  following_url?: string
  gists_url?: string
  starred_url?: string
  subscriptions_url?: string
  organizations_url?: string
  repos_url?: string
  events_url?: string
  received_events_url?: string
  type?: string
  site_admin?: boolean
}
