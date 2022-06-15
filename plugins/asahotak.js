let fs = require('fs')
let timeout = 60000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (id in conn.asahotak) {
        if (conn.asahotak[id].length !== 0) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.asahotak[id][0])
        delete conn.asahotak[id]
        throw false
    }
    conn.asahotak[id] = []
    let src = JSON.parse(fs.readFileSync(`./src/scrap/asahotak.json`))
    let json = src[Math.floor(Math.random() * src.length)]
    let question = json.result.pertanyaan
    conn.scrapGame(global.API('lolhuman', '/api/tebak/asahotak', '', 'apikey'), 'asahotak').catch(_ => _)
    // if (!json.status) throw json
    let caption = `
*Soal:* ${question}

Waktu Jawab: *${(timeout / 1000).toFixed(2)} detik*
Bonus: ${poin} XP
*Reply pesan ini untuk menjawab!*`.trim()
    let btn = await conn.sendButton(m.chat, caption, '*ASAH OTAK*\nBantuan mengurangi 1 limit', 'Bantuan', '.hintasah', m)
    conn.asahotak[id] = [
        btn,
        json, poin,
        setTimeout(() => {
            if (conn.asahotak[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.result.jawaban}*`, '', 'Asah Otak', `.asahotak`, conn.asahotak[id][0])
            delete conn.asahotak[id]
        }, timeout)
    ]
}
handler.help = ['asahotak']
handler.tags = ['game']
handler.command = /^asahotak$/i
handler.group = true
handler.limit = false

module.exports = handler