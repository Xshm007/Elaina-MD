const axios = require("axios")
const cheerio = require("cheerio")
let fetch = require('node-fetch')
let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
  let id = m.chat
  if (id in conn.tebakgambar) {
    if (conn.tebakgambar[id].length !== 0) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0])
    delete conn.tebakgambar[id]
    throw false
  }
  conn.tebakgambar[id] = []
  let random_level = Math.floor(Math.random() * 136)
  let random_eq = Math.floor(Math.random() * 20)
  let json = await axios.get(`https://jawabantebakgambar.net/level-${random_level}/`).then((val) => {
    let url = "https://jawabantebakgambar.net"
    const $ = cheerio.load(val.data)
    let href = $("ul > * > a").eq(random_eq)
    let jwbn = href.find("span").text()
    let img = href.find("img").attr("data-src")
    let src = url + img
    let petunjuk = jwbn.replace(/[AIUEO|aiueo]/g, "_").toLowerCase()
    return {
      img: src,
      jawaban: jwbn.trim().toLowerCase(),
      petunjuk,
    }
  })
  let caption = `
Waktu Jawab: *${(timeout / 1000).toFixed(2)} detik*
Bonus: ${poin} XP
*Reply pesan ini untuk menjawab!*
    `.trim()
  let msg = await conn.sendButtonImg(m.chat, json.img, caption, '*TEBAK GAMBAR*\nBantuan mengurangi 1 limit', 'Bantuan', '.hint', m)
  conn.tebakgambar[id] = [
    msg,
    json, poin,
    setTimeout(() => {
      if (conn.tebakgambar[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, '', 'Tebak Gambar', `.tebakgambar`, m)
      conn.deleteMessage(m.chat, msg.key)
      delete conn.tebakgambar[id]
    }, timeout)
  ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i
handler.group = true
module.exports = handler