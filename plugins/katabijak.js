const { quotes } = require('../lib/scrape')
let handler = async (m, { conn, usedPrefix, command, args }) => {
  let er = `contoh:\n${usedPrefix + command} cinta

╔═〘Pilihan 〙
╟ cinta
╟ rindu
╟ mimpi
╟ sendiri
╟ sabar
╟ kesedihan
╟ pernikahan
╟ kemerdekaan
╚════`.trim()
  if (!args[0]) throw er
  switch (args[0].toLowerCase()) {
    case 'cinta':
    case 'rindu':
    case 'mimpi':
    case 'sendiri':
    case 'sabar':
    case 'kesedihan':
    case 'pernikahan':
    case 'kemerdekaan':
      quotes(args[0].toLowerCase()).then(async res => {
        let data = JSON.stringify(res)
        let json = JSON.parse(data)
        let random = Math.floor(Math.random() * json.data.length)
        let hasil = json.data[random]
        let { author, bio, quote } = hasil
        await conn.sendButton(m.chat, `“${quote}”`.trim(), `${author} - ${bio}`, `KATA BIJAK ${args[0].toUpperCase()}`, `${usedPrefix + command} ${args[0]}`, `RANDOM`, `${usedPrefix + command} ${pickRandom(['rindu', 'mimpi', 'sendiri', 'sabar', 'kesedihan', 'pernikahan', 'kemerdekaan'])}`, m)
      })
      break
    default:
      throw er
  }
}
handler.help = ['bijak']
handler.tags = ['quotes']
handler.command = /^(bijak)$/i

module.exports = handler


function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}