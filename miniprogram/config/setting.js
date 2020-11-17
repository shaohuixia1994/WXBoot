import $ from './Tool'

export const SIGN_WIN_NUMBER = 2 // 签到需要胜利的局数
export const SIGN_PVP_NUMBER = 5 // 签到需要对战的局数

const DEFAULT_PK_SUBJECT_NUMBER = 10 // 10 // 每局对战的默认词汇数量
export const PK_SUBJECTS_NUMBER = [8, 10, 12, 15, 20] // 每局对战可选的词汇数目
export const SUBJECT_HAS_OPTIONS_NUMBER = 4 // 每一个题目有多少个选项

const DEFAULT_BGM_STATE = true // 默认播放背景音乐
const DEFAULT_PRONUNCIATION_STATE = true // 默认播放单词发音
const DEFAULT_IS_ADD_USERWORDS = true // 默认添加生词到生词本
const DEFAULT_AD_STATE = true // 默认广告状态
const DEFAULT_VIBRATE = true // 默认震动

// 存储到缓存中的key值 ↓
const SUBJECT_NUMBER = 'setting_subject_number'
const BGM_STATE = 'setting_bgm_state'
const PRONUNCIATION_STATE = 'setting_pronunciation_state'
const IS_ADD_USERWORDS = 'setting_addUserWords'
const AD_STATE = 'ad_state'
const VIBRATE_STATE = 'vibrate_state'
// 存储到缓存中的key值 ↑

/**
 * 获取广告状态
 */
export const getADstate = function() {
  const state = $.storage.get(AD_STATE)
  if (typeof state !== 'boolean') {
    setADstate(DEFAULT_AD_STATE)
    return DEFAULT_AD_STATE
  }
  return state
}

export const setADstate = function(state = true) {
  if (typeof state === 'boolean') {
    $.storage.set(AD_STATE, state)
  }
}

/**
 * 获取每局对战的词汇数量，创房时使用
 */
export const getCombatSubjectNumber = function() {
  const number = $.storage.get(SUBJECT_NUMBER)
  if (typeof number !== 'number' || !PK_SUBJECTS_NUMBER.includes(number)) {
    setCombatSubjectNumber(DEFAULT_PK_SUBJECT_NUMBER)
    return DEFAULT_PK_SUBJECT_NUMBER
  }
  return number
}

/**
 * 设置每局对战的词汇数量
 */
export const setCombatSubjectNumber = function(number) {
  if (PK_SUBJECTS_NUMBER.includes(number)) {
    $.storage.set(SUBJECT_NUMBER, number)
  }
}

/**
 * 获取是否播放背景音乐
 */
export const getBgmState = function() {
  const check = $.storage.get(BGM_STATE)
  if (typeof check !== 'boolean') {
    setBgmState(DEFAULT_BGM_STATE)
    return DEFAULT_BGM_STATE
  }
  return check
}

/**
 * 设置是否播放背景音
 * @param {Boolean} state 背景音状态
 */
export const setBgmState = function(state) {
  if (typeof state === 'boolean') {
    $.storage.set(BGM_STATE, state)
  }
}

/**
 * 获取是否播放单词发音
 */
export const getPronunciationState = function() {
  const check = $.storage.get(PRONUNCIATION_STATE)
  if (typeof check !== 'boolean') {
    setPronunciationState(DEFAULT_PRONUNCIATION_STATE)
    return DEFAULT_PRONUNCIATION_STATE
  }
  return check
}

/**
 * 设置是否播放单词发音
 * @param {Boolean} state 状态
 */
export const setPronunciationState = function(state) {
  if (typeof state === 'boolean') {
    $.storage.set(PRONUNCIATION_STATE, state)
  }
}

/**
 * 获取是否添加生词到生词本
 */
export const getIsAddUserWords = function() {
  const check = $.storage.get(IS_ADD_USERWORDS)
  if (typeof check !== 'boolean') {
    setIsAddUserWords(DEFAULT_IS_ADD_USERWORDS)
    return DEFAULT_IS_ADD_USERWORDS
  }
  return check
}

/**
 * 设置是否添加生词到生词本
 * @param {Boolean} state 状态
 */
export const setIsAddUserWords = function(state) {
  if (typeof state === 'boolean') {
    $.storage.set(IS_ADD_USERWORDS, state)
  }
}

/**
 * 获取是否震动
 */
export const getIsVibrate = function() {
  const check = $.storage.get(VIBRATE_STATE)
  if (typeof check !== 'boolean') {
    setIsVibrate(DEFAULT_VIBRATE)
    return DEFAULT_VIBRATE
  }
  return check
}

/**
 * 设置是否震动
 * @param {Boolean} state 状态
 */
export const setIsVibrate = function(state) {
  if (typeof state === 'boolean') {
    $.storage.set(VIBRATE_STATE, state)
  }
}
