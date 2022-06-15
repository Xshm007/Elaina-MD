const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEBAK JUDUL LAGU/i.test(m.quoted.footerText)) return !0
    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
    if (!(id in this.tebaklagu)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebaklagu[id][0].id) {
        if (/(.hint|bantuan|^$)/i.test(m.text)) return !0
        if (m.text.toLowerCase() == this.tebaklagu[id][1].toLowerCase()) {
            global.db.data.users[m.sender].exp += this.tebaklagu[id][2]
            this.sendButton(m.chat, `*Benar!*\n+${this.tebaklagu[id][2]} XP`, '', 'Tebak Lagu', '.tebaklagu', m)
            clearTimeout(this.tebaklagu[id][3])
            delete this.tebaklagu[id]
        } else if (similarity(m.text.toLowerCase(), this.tebaklagu[id][1].toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler