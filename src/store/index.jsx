import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: 'scale-0',
  updateModal: 'scale-0',
  showModal: 'scale-0',
  alert: { show: false, msg: '', color: '' },
  loading: { show: false, msg: '' },
  connectedAccount: '',
  nft: null,
  nfts: [],
  transactions: [],
  contract: null
})

const setAlert = (msg, color = 'green') => {
  setGlobalState('loading', { show: false, msg: '' })
  setGlobalState('alert', { show: true, msg, color })
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg: '', color: '' })
  }, 6000)
}

const setLoadingMsg = (msg) => {
  const loading = getGlobalState('loading')
  setGlobalState('loading', { ...loading, show: true, msg })
}

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    const start = text.substring(0, startChars)
    const end = text.substring(text.length - endChars, text.length)
    return start + '...' + end
  }
  return text
}

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setAlert,
  setLoadingMsg,
  truncate,
}
