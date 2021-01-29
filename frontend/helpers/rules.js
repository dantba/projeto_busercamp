import { CPF, CNPJ } from 'cpf_cnpj'
import dayjs from 'dayjs'
import formHelpers from '~/helpers/forms'

const rules = {
  required (value) {
    return (value !== null && value !== undefined && value !== '' && value !== false) || 'Campo obrigatório'
  },
  minlen (m) {
    return v => {
      if (v === undefined || v === null) {
        return true
      }
      v = v.toString()
      return v.length >= m || `Digite pelo menos ${m} caracteres`
    }
  },
  maxlen (m) {
    return v => {
      if (v === undefined || v === null) {
        return true
      }
      v = v.toString()
      return v.length <= m || `Máximo de ${m} caracteres`
    }
  },
  minBrDate (minDate, msg) {
    return value => {
      if (_ddmmyyyy(value) !== true) {
        return _ddmmyyyy(value)
      }
      const valid = dayjs(value, 'DDMMYYYY') >= minDate
      return valid || msg
    }
  },
  maxBrDate (maxDate, msg = 'Digite uma data válida') {
    return value => {
      if (_ddmmyyyy(value) !== true) {
        return _ddmmyyyy(value)
      }
      const valid = dayjs(value, 'DDMMYYYY') <= maxDate
      return valid || msg
    }
  },
  email (value, notBuser = false, isNewEmail = false) {
    if (value === undefined || value === null || value === '') {
      return true
    }
    const valid = formHelpers.isValidEmail(value.trim(), isNewEmail)
    if (notBuser === true) {
      const domain = value.split('@')[1]
      return (valid && !domain.startsWith('buser.')) || 'Digite um e-mail válido.'
    }
    return valid || 'Digite um e-mail válido.'
  },
  ddmmyyyy (value) {
    return _ddmmyyyy(value)
  },
  phone (value) {
    if (value === undefined || value === null) {
      return true
    }
    const valid = value.length >= 10 && formHelpers.isValidPhone(value)
    return valid || 'Digite um telefone válido.'
  },
  phone_mobile_br (phone) {
    if (!phone) { return true }
    const digits = phone.replace(/[^\d]+/, '') || ''
    if (digits.startsWith('0')) { return 'Não coloque zero no início.' }
    if (digits.length >= 2 && !formHelpers.valid_area_codes.includes(digits.substring(0, 2))) { return `${digits.substring(0, 2)} não é um código de área válido` }
    if (digits.length >= 3 && digits.substring(2, 3) !== '9') { return 'Informe um número de celular válido.' }

    return formHelpers.isValidMobilePhoneBr(phone) || 'Digite um telefone de celular válido com 11 dígitos.'
  },
  cpfOpcional (value) {
    if (value === '' || value === undefined || value === null) {
      return true
    }
    return CPF.isValid(value) || 'CPF inválido'
  },
  cpf (value) {
    if (value === undefined || value === null) {
      return true
    }
    return CPF.isValid(value) || 'CPF inválido'
  },
  cnpj (value) {
    if (value === undefined || value === null) {
      return true
    }
    return CNPJ.isValid(value) || 'CNPJ inválido'
  },
  internationalPhone (value) {
    if (value === undefined || value === null) {
      return true
    }
    const valid = value.length >= 10 && !formHelpers.isInternationalPhone(value)
    return valid || 'Digite um telefone do Brasil sem o código do país.'
  },
  emailOrBrazilianPhone (value) {
    if (formHelpers.isValidEmail(value)) {
      return true
    } else if (formHelpers.isValidPhone(value)) {
      return true
    } else if (formHelpers.isInternationalPhone(value)) {
      return 'Digite um telefone do Brasil sem o código do país'
    }
    return 'Digite um email ou telefone válido'
  },
  emailOrCPFOrBrazilianPhone (value) {
    if (formHelpers.isValidEmail(value)) {
      return true
    }
    if (CPF.isValid(value)) {
      return true
    }
    if (formHelpers.isValidPhone(value)) {
      return true
    }
    if (formHelpers.isInternationalPhone(value)) {
      return 'Digite um telefone do Brasil sem o código do país'
    }

    return 'Digite um email, telefone ou CPF válido'
  },
  password (value) {
    const message = 'A senha deve conter pelo menos 8 caracteres'
    const valid = formHelpers.isValidPassword(value)
    return valid || message
  },
  between (start, end) {
    return value => {
      if (value === undefined || value === null) {
        return true
      }
      const message = `Valor deve estar entre ${start} e ${end}`
      if (formHelpers.isValidCurrency(value)) {
        value = formHelpers.moedaToFloat(value)
      }
      const valid = value >= start && value <= end
      return valid || message
    }
  },
  money (value) {
    const message = 'O valor inserido é inválido. Exemplo de entrada válida: 1.500,90'
    const valid = formHelpers.isValidCurrency(value)
    return valid || message
  },
  greaterThan (vmin) {
    const message = `Valor deve ser maior que ${vmin}`
    return value => {
      if (value === undefined || value === null) {
        return message
      }
      value = value.toString()
      if (formHelpers.isValidCurrency(value)) {
        value = formHelpers.moedaToFloat(value)
      } else {
        value = value.replace(',', '.')
      }
      const valid = value > vmin
      return valid || message
    }
  },
  alphanumeric (value) {
    if (value === undefined || value === null) {
      return true
    }
    return value.match(/^[a-z0-9]+$/i) !== null || 'Apenas letras e números'
  },
  number (value) {
    if (value === undefined || value === null) {
      return true
    }
    return value.match(/^[0-9]+$/i) !== null || 'Apenas números'
  },
  notnumber (value) {
    if (value === undefined || value === null) {
      return true
    }
    return value.match(/^[0-9]+$/i) === null || 'Não pode conter apenas números'
  },
  exactLength (len) {
    return value => {
      if (value === undefined || value === null) {
        return true
      }
      value = value.toString()
      return value.length === len || `Campo deve ter exatamente ${len} caracteres`
    }
  },
  credit_card (value) {
    if (value === undefined || value === null) {
      return true
    }
    return (value.match(/^[0-9]+$/i) !== null && (value.length === 16 || value.length === 15)) || 'Digite um cartão de crédito válido'
  },
  cep (value) {
    if (value === undefined || value === null) {
      return true
    }
    return (value.match(/^[0-9]+$/i) !== null && value.length === 8) || 'Digite um CEP válido'
  },
  placa (value) {
    if (value === undefined || value === null) {
      return true
    }
    return (value.match(/^[a-zA-Z]{3}[0-9]{4}$/i) !== null && value.length === 7) || 'Digite uma placa válida'
  },
  mmaa (value) {
    if (value === undefined || value === null) {
      return true
    }
    const errmsg = 'Digite a validade no formato MM/AA'
    if (value.length !== 4 || value.match(/^[0-9]+$/i) === null) {
      return errmsg
    }
    const sm = value.substring(0, 2)
    const sy = value.substring(2, 4)
    const m = parseInt(sm)
    const y = parseInt(sy)
    if (m <= 0 || m > 12) {
      return 'O mês deve estar entre 01 e 12'
    }
    if (y > 50) {
      return errmsg
    }
    if (`${sy}${sm}` < _mmaanow()) {
      return 'Validade expirada'
    }
    return true
  },
  matchText (pattern, exact = false) {
    return value => {
      if (value === undefined || value === null) {
        return true
      }
      const error = `Digite "${pattern}" para prosseguir`
      return exact
        ? value === pattern || error
        : value.toLowerCase() === pattern || error
    }
  }
}

function _ddmmyyyy (value) {
  if (value === undefined || value === null) {
    return true
  }
  value = value.toString()
  const message = 'Digite uma data válida'
  const pattern = /^\s*(3[01]|[12][0-9]|0?[1-9])(1[012]|0?[1-9])((?:19|20)\d{2})\s*$/
  if (value.length !== 8 || !pattern.test(value)) {
    return message
  }
  const [d, m, y] = [value.substring(0, 2), value.substring(2, 4), value.substring(4, 8)]

  // Fevereiro só vai até dia 29, coisa
  if (Number(m) === 2 && d >= 30) {
    return message
  }
  if (d > 31 || m > 12 || y > 2100) {
    return message
  }
  return true
}

function _mmaanow () {
  const s = new Date().toISOString()
  const sy = s.substring(2, 4)
  const sm = s.substring(5, 7)
  return `${sy}${sm}`
}

rules.mergeRules = otherRules => {
  return Object.assign({}, rules, otherRules)
}

export default rules
