const datehelper = {
  lastsixmonths () {
    const today = new Date()
    let d
    let month
    let year
    const meses = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]
    const response = []
    for (let i = -5; i < 7; i += 1) {
      d = new Date(today.getFullYear(), ((today.getMonth() - i)), 1)
      month = d.getMonth()
      year = d.getFullYear()
      response.push({'value': {'mes': (month + 1), 'ano': year}, label: meses[month] + '/' + year})
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(response), 600)
    })
  }
}

export default datehelper
