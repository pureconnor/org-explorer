import { Repository } from '../types'

export const RepositoryCard = ({
  node_id,
  full_name,
  open_issues,
  watchers,
  forks,
}: Repository) => {
  return (
    <div
      className="flex flex-row w-72 h-48 shadow-lg border-2 rounded-xl m-8"
      key={node_id}
    >
      <div className="h-full w-full p-4">
        <dd className="h-1/3 font-semibold text-xl items-center justify-center truncate">
          {full_name}
        </dd>
        <dd className="h-2/3 inline-flex justify-between w-full items-center ">
          <dl className="w-full">
            <dd className="text-gray-600 flex items-center">
              Open Issues{' '}
              <span className="text-blue-800 font-semibold w-full text-right">
                {open_issues}
              </span>
            </dd>
            <dd className="text-gray-600 flex items-center">
              Watching{' '}
              <span className="text-blue-800 font-semibold w-full text-right">
                {watchers}
              </span>
            </dd>
            <dd className="text-gray-600 flex items-center">
              Forks{' '}
              <span className="text-blue-800 font-semibold w-full text-right">
                {forks}
              </span>
            </dd>
          </dl>
        </dd>
      </div>
    </div>
  )
}
