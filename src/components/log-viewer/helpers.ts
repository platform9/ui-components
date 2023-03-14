export enum LogColors {
  CodeBlue = 'code-blue',
  Default = 'default',
}

export const getLogs = (logs) => {
  if (typeof logs === 'string') {
    return logs.split('\n')
  }
  return logs
}

export const discoverText = (text, idx) => {
  if (idx === 0 && isDate(text)) {
    return LogColors.CodeBlue
  }

  return LogColors.Default
}

const isDate = (str = '') => /\d{2}[./-:]\d{2}[./-:]\d{4}/.test(str)
