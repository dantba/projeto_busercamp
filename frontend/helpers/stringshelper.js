const SIMILARITY_THRESHOLD = 0.7

export default {
  removeAccents (str) {
    if (!str) {
      return str
    }
    const accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž'
    const accentsOut = 'AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz'
    str = str.split('')
    str.forEach((letter, index) => {
      const i = accents.indexOf(letter)
      if (i !== -1) {
        str[index] = accentsOut[i]
      }
    })
    return str.join('')
  },
  normalize (str) {
    return this.removeAccents(str).toLowerCase()
  },
  comparePhrases (ph1, ph2) {
    if (!ph1 || !ph2) {
      return 0
    }
    const ph1Words = (this.removeAccents(ph1).toLowerCase().match(/[a-z\s]/g) || []).join('').split(/\s+/)
    const ph2Words = (this.removeAccents(ph2).toLowerCase().match(/[a-z\s]/g) || []).join('').split(/\s+/)
    const total = ph1Words.length > ph2Words.length ? ph1Words.length : ph2Words.length
    let countEquals = 0.0
    ph1Words.forEach(w1 => {
      ph2Words.forEach(w2 => {
        if (w1 === w2) {
          countEquals++
        }
      })
    })
    return countEquals / total
  },
  compareWords (word1, word2) {
    if (!word1 || !word2) {
      return 0
    }
    const biggerWordLength = word1.length > word2.length ? word1.length : word2.length
    const smallerWordLength = word1.length < word2.length ? word2.length : word1.length
    let countEquals = 0.0
    const lettersWord1 = word1.split('')
    const lettersWord2 = word2.split('')
    for (let i = 0; i < smallerWordLength; i++) {
      if (lettersWord1[i] === lettersWord2[i]) {
        countEquals++
      }
    }
    return countEquals / biggerWordLength
  },
  search (query, text) {
    text = text || ''
    if (!query) {
      return 0
    }
    const queryWords = this.splitAndCleanText(query)
    const textWords = this.splitAndCleanText(text)
    let matchRank = 0.0
    queryWords.forEach(w1 => {
      let wordRank = 0.0
      textWords.forEach(w2 => {
        if (w1 === w2) {
          wordRank += (w2.length > 2) ? 1 : 0.5 // UF não pode ter o mesmo peso que o nome da cidade
        } else if (w2.indexOf(w1) === 0) {
          wordRank += 0.7
        } else if (w2.indexOf(w1) > 0) {
          wordRank += 0.2
        }
      })
      matchRank += wordRank || -0.4
    })
    return matchRank / (textWords.filter(a => a.length > 2).length || 1)
  },
  getSimilarityThreshold () {
    return SIMILARITY_THRESHOLD
  },
  cleanCPF (cpf) {
    return (cpf.match(/[0-9]/g) || []).join('')
  },
  cleanBirth (birthday) {
    return (birthday.match(/[0-9]/g) || []).join('')
  },
  splitAndCleanText (text) {
    return (this.removeAccents(text).toLowerCase().match(/[a-z0-9\s]/g) || []).join('').split(/\s+/).filter(a => !!a)
  }
}
