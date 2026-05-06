import { useQuery } from '@tanstack/react-query'
import { getJob } from '../api/jobs'

const TERMINAL_STATES = ['completed', 'failed', 'purged']

/**
 * Polls a job until it reaches a terminal state.
 * Polling interval: 3s while in-progress, stops on completion/failure.
 */
export const useJobPoller = (jobId, options = {}) => {
  const query = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJob(jobId),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      if (!status || TERMINAL_STATES.includes(status)) return false
      return 3000
    },
    refetchIntervalInBackground: false,
    staleTime: 0,
    ...options,
  })

  const isPolling = query.data && !TERMINAL_STATES.includes(query.data.status)

  return {
    ...query,
    job: query.data,
    isPolling,
    isTerminal: query.data ? TERMINAL_STATES.includes(query.data.status) : false,
  }
}
