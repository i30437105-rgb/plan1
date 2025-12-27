/**
 * Polyfill для window.storage, который часто встречается в прототипах.
 * В продакшене хранит данные в localStorage.
 * API специально сделан async, чтобы совпасть с ожидаемым использованием (await window.storage.get/set).
 */

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

function canUseLocalStorage() {
  try {
    const k = '__ppv8_test__'
    window.localStorage.setItem(k, '1')
    window.localStorage.removeItem(k)
    return true
  } catch {
    return false
  }
}

const storageImpl = {
  async get(key) {
    if (!canUseLocalStorage()) return null
    const raw = window.localStorage.getItem(key)
    return raw == null ? null : safeParse(raw)
  },
  async set(key, value) {
    if (!canUseLocalStorage()) return false
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
}

// Если где-то уже есть window.storage — не трогаем.
if (typeof window !== 'undefined' && !window.storage) {
  window.storage = storageImpl
}

export default storageImpl
