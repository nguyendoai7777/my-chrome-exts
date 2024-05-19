const { storage } = chrome

type RC<T = any> = {
  [key: string]: T
}

type Keys<X = any, C = RC<X>> = string | string[] | C

type GetPropsCallback<T> = (item: T) => void

export default {
  get<T>(keys: string | string[], callback: GetPropsCallback<T>) {
    storage.sync.get(callback)
  },
  set<T extends object>(input: T) {
    chrome.storage.sync.set(input)
  },
}
