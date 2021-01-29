import stringsHelper from './stringshelper'

const valid_area_codes = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49',
  '51', '53', '54', '55', '61', '62', '64', '63', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '87', '82', '83', '84', '85', '88', '86', '89', '91',
  '93', '94', '92', '97', '95', '96', '98', '99']

export default {
  valid_area_codes,
  isValidEmail (email, isNewEmail = false) {
    if (!email) {
      return false
    }
    if (email.toLowerCase().match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/) === null) {
      return false
    }
    // deixa fazer login com emails com typo
    if (isNewEmail === false) {
      return true
    }

    // se for um novo registro, não queremos deixar cadastrar com typo
    const emailDomain = email.split('@')[1]
    const impossibleDomains = [
      'gmail.com.br'
    ]
    if (impossibleDomains.includes(emailDomain)) {
      return false
    }
    const mostCommonDomains = [
      'gmail.com',
      'hotmail.com',
      'yahoo.com.br',
      'outlook.com'
    ]
    for (const domain of mostCommonDomains) {
      const similarity = stringsHelper.compareWords(emailDomain, domain)
      if (similarity >= 0.8 && similarity < 1) {
        return false
      }
    }
    return true
  },
  // TODO: deprecated use isValidMobilePhoneBr
  isValidPhone (phone) {
    if (!phone || phone.length < 8) {
      return false
    }
    return phone.match(/^[0-9\-\s()]+$/) !== null
  },
  isValidMobilePhoneBr (phone) {
    if (!phone || !phone.match(/^[0-9\-\s()]+$/)) { return false }
    const digits = phone.replace(/[^\d]+/, '') || ''
    if (!digits || digits.length < 11 || digits.startsWith('0')) {
      return false
    }
    const area_code = digits.substring(0, 2)
    if (!valid_area_codes.includes(area_code)) {
      return false
    }
    const nono_digito = digits.substring(2, 3)
    return nono_digito === '9'
  },
  trimBigPhone (phone) {
    if (!phone || phone.length < 11) {
      return phone
    }
    return phone.substring(0, 11)
  },
  isInternationalPhone (phone) {
    if (!phone || phone.length < 8) {
      return false
    }
    return phone.match(/^\+[0-9\-\s()]+$/) !== null
  },
  isValidPassword (password) {
    const valid = (password && password.length >= 8)
    return valid
  },
  canConvertStrToDecimal (value) {
    const formatted = String(value).replace(',', '.')
    return formatted.match(/^[0-9]+(\.[0-9]{2})?$/) !== null
  },
  isValidCurrency (value) {
    if (!value) {
      return true
    }
    value = value.toString()
    return value.match(/^[0-9]{1,3}(\.[0-9]{1,3})*,[0-9]{2}$/) !== null
  },
  moedaToFloat (value) {
    if (value === null || value === undefined) {
      return
    }
    value = value.toString()
    let signal = '+'
    if (value && '-+'.includes(value[0])) {
      signal = value[0]
      value = value.slice(1)
    }
    const cents = value.replace(/[^0-9]/g, '') || 0
    return Number(`${signal}${cents}`) / 100.0
  },
  trimSpaces (string) {
    if (!string) { return }
    return string.trim().replace(/\s+/g, ' ')
  }
}
