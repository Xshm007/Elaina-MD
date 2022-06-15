const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')

let handler = async (m, { command, conn, text, usedPrefix }) => {
  let teks = text ? text : m.quoted ? m.quoted.text : false
  if (!teks) throw `Reply pesan atau ketik pesan\n\nContoh:\n${usedPrefix + command} pipupipap`
  let res = await fetch(global.API('lolhuman', `/api/${command}`, { text: teks }, 'apikey'))
  let img = await res.buffer()
  if (!img) throw img
  let stiker = await sticker(img, false, global.packname, global.author)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
}
handler.help = ['ttp', 'ttp2', 'ttp3', 'ttp4'].map(v => v + ' <teks>')
handler.command = /^ttp[2-4]?$/i
handler.tags = ['stickertext']
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler