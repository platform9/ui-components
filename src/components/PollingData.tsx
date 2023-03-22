// Libs
import React, { useState, useCallback } from 'react'
import moment from 'moment'

import useInterval from '../hooks/useInterval'
import Button from '../elements/button'

interface Props {
  loading: boolean
  hidden?: boolean
  pause?: boolean
  pollIntervalMs?: number
  refreshDuration?: number
  onReload: (ignoreCache?: boolean, updateLoadingState?: boolean) => Promise<void>
  pollingCondition?: () => boolean
}

const defaultRefreshDuration = 1000 * 60 * 5

function PollingData({
  loading,
  onReload,
  hidden = false,
  pause = false,
  pollIntervalMs = 5000,
  refreshDuration = defaultRefreshDuration,
  pollingCondition,
}: Props) {
  const [lastIntervalTs, setLastIntervalTs] = useState(new Date().valueOf())
  const [lastFetchTs, setLastFetchTs] = useState(new Date().valueOf())
  const reload = useCallback(() => {
    const ts = new Date().valueOf()
    setLastFetchTs(ts)
    setLastIntervalTs(ts)
    if (typeof pollingCondition === 'function' && !pollingCondition()) {
      return
    }
    onReload(true, false)
  }, [setLastFetchTs, setLastIntervalTs, onReload, pollingCondition])

  // This conditional probably can't be used, hooks should not be
  // called in conditionals
  if (!pause) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useInterval(() => {
      if (!loading) {
        setLastIntervalTs(new Date().valueOf())
      }
    }, pollIntervalMs)
    const currentTs = new Date().valueOf()
    if (currentTs - lastFetchTs > refreshDuration) {
      reload()
    }
  }

  if (hidden) {
    return null
  }

  return (
    <Button variant="tertiary" onClick={pause ? undefined : reload} icon="sync">
      {loading ? 'loading...' : moment(lastIntervalTs).fromNow()}
    </Button>
  )
}

export default PollingData
