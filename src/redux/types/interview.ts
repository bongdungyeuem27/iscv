export const MAX_QUESTION = 50

export const QUESTION_IN = [...Array(MAX_QUESTION).keys()].map((i) => i + 1)

export const MatchedAnswer = {
  1: 'một',
  2: 'hai',
  3: 'ba',
  4: 'bốn',
  5: 'năm'
}

export const MatchedSpeech = {
  ['một']: 1,
  ['hai']: 2,
  ['ba']: 3,
  ['bốn']: 4,
  ['năm']: 5
}

export type IAnswer = {
  id: string
  question: (typeof QUESTION_IN)[number]
  selected: keyof typeof MatchedAnswer
}
