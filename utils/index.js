
export const isUndef = val => {
  return val === undefined || val === null
}

export const isDef = val => {
  return val !== undefined && val !== null
}

export const isDev = process.env.NODE_ENV === 'development'
