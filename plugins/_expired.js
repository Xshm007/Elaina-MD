let handler = m => m
let fs = require('fs')
let json = JSON.parse(fs.readFileSync('./src/premium.json'))
handler.before = async function (m) {
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    if (chat.gcdate !== 0 && !chat.permanent) {
        if (chat.gcdate <= new Date() * 1) {
            chat.gcdate = 0
            chat.init = false
            await this.reply(m.chat, `Masa aktif bot habis\nWaktunya *${this.user.name}* untuk meninggalkan grup :(\n*Chat owner untuk invite bot lagi*`, 0)
            await this.sendContact(m.chat, global.owner[2], 'Owner Bot', false)
            setTimeout(await this.groupLeave(m.chat), 5000)
        }
    }
    if (json.map(v => v.replace(/[^0-9]/g, '')).includes(m.sender.split`@`[0]) && user.premdate && !user.premdate == 0) {
        if (user.premdate < new Date() * 1) {
            delete require.cache[require.resolve('../config')]
            require('../config')
            let index = json.indexOf(m.sender.split`@`[0])
            await json.splice(index, 1)
            fs.writeFileSync('./src/premium.json', JSON.stringify(json))
            delete require.cache[require.resolve('../config')]
            require('../config')
            this.sendButton(m.sender, `_Dear ${await conn.getName(m.sender)}, Masa aktif premium kamu telah habis_`, 'Silahkan perpanjang ke Owner', 'Perpanjang', '.premium', 'Owner', '.owner', m)
            db.data.users[m.sender].premdate = 0
        }
    }

}
module.exports = handler