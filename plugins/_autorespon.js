let fs = require('fs')
let handler = m => m

handler.all = async function (m, { isBlocked, isOwner }) {
    let jadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]
    if (m.isBaileys) return
    if (m.fromMe) return
    if (m.chat.endsWith('broadcast')) return
    if (isBlocked) return // Yang diblock ga direspon
    let setting = global.db.data.settings[this.user.jid]
    let chats = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let { name, banned, registered } = user

    let teks2 = `${this.user.jid !== global.conn.user.jid ? `Bot utama: @${global.conn.user.jid.split`@`[0]}` : ''}\nKloning Bot: ${jadibot == '' ? '' : '\n' + jadibot.map(v => `@${v.jid.split`@`[0]}`).join('\n')}\n\nInstagram Bot: https://instagram.com/lev_botwa`.trim()

    /*
    //////////////
    @Bot dipanggil
    ////////////// 
    */

    if (/^bot$/i.test(m.text)) {
        if (m.isGroup && chats.isBanned) return
        this.sendButton(m.chat, `
Hai, Selamat ${ucap()} ${user.registered ? name : await this.getName(m.sender, true)} 
${banned ? '_*Kamu telah di banned/dilarang menggunakan bot!*_\n_Hubungi Owner untuk membuka banned_' : `Ada yg bisa dibantu?`}`.trim(), teks2, 'Menu', '.menu', 'Setting', '.setting', 'Statistic', '.topcmd', m, {
            contextInfo: {
                mentionedJid: conn.parseMention(teks2)
            }
        })
        this.sendFile(m.chat, './src/vn/hyu.mp3', 'vn.mp3', null, m, true, { mimetype: 'audio/mp4' })
    }

    // 2

    if (/ bot |^bot | bot$/i.test(m.text) && !chats.isBanned) {
        this.respon = this.respon ? this.respon : {}
        if (m.chat in this.respon) {
            if (this.respon[m.chat].date > new Date() * 1 && this.respon[m.chat].date !== 0) return
            else this.respon[m.chat].bot += 1
            if (this.respon[m.chat].bot > 4) {
                this.respon[m.chat].date = new Date() * 1 + (86400000 / 4)
                return
            }
        } else this.respon[m.chat] = {
            bot: 0,
            date: 0
        }
        this.reply(m.chat, random(['Iyaa.. Apa?', 'Hai, Bot disini', 'Saya terpanggil', 'Ciee manggil"', 'Apa sob?', 'Apa panggil" -_-', 'Bot bot bot bot tross', 'Kalau mau pakai, pakai aja.. Jngn pnggil" trus..', 'Piuuuu.... Dummmm... ', 'Tetetetetetete mantapu jiwaa']), m)
    }

    /*
    //////////////
    @respon 
    //////////////
    */

    // salam

    if (/(ass?alam)/i.test(m.text)) {
        m.reply(`_Wa'alaikumsalam Wr. Wb._`)
    }

    //hai

    if (/^(h(a?i|alo))$/i.test(m.text) && !m.quoted) {
        m.reply(`Hai *${registered ? name : await conn.getName(m.sender, { withoutContact: true })}, _Selamat ${ucap()}_*!`.trim())
    }

    //sepi

    if (/^sepi/i.test(m.text)) {
        m.reply('Ramein lah ka')
    }

    // di tag
    if (setting.antitag) {
        if (m.mentionedJid && m.mentionedJid.includes(db.data.settings[this.user.jid].owner || (owner[2] + '@s.whatsapp.net')) && !chats.isBanned) m.reply(`Kenapa ngetag" ownerku _-`)
    }
    /* 
    //////////////
    @respon vn
    //////////////
    */

    if (/^ara.ara$/i.test(m.text)) {
        this.sendFile(m.chat, './src/vn/araara.opus', 'suara.opus', null, m, true)
    }
    if (/^yamete/i.test(m.text)) {
        this.sendFile(m.chat, './src/vn/yamete.opus', 'suara.opus', null, m, true)
    }
    if (/^baka/i.test(m.text)) {
        this.sendFile(m.chat, './src/vn/bakasong.mp3', 'bakasong.mp3', null, m, true, { mimetype: 'audio/mp4' })
    }
    if (/chan/i.test(m.text)) {
        this.sendFile(m.chat, './src/vn/onichan_1.oga', 'yaa.opus', null, m, true)
    }

    ///////// Private chat //////////

    if (!m.isGroup) {
        /*
            @First chat
            */
        if ((/[a-z]/i.test(m.text))) {
            if (m.fromMe) {
                chats.pc = new Date * 1
                return
            } let chatSender = global.db.data.chats[m.sender]
            if (new Date - global.db.data.chats[m.sender].pc < 43200000) return

            chatSender.pc = new Date * 1
            chatSender.faham = true
            let isinit = chatSender.fahan
            let init = [
                `Hai, Selamat ${ucap()} 
            ${banned ? '_*Kamu telah di banned/dilarang menggunakan bot!*_\n_Hubungi Owner untuk membuka banned_' : ``}`,
                'Silahkan gunakan Bot dengan sebaik mungkin\nDilarang spam, telfon, ddos\nJika ada yang ditanyakan silahkan hubungi Owner' + `\n\n${teks2}`,
                'Menu', '.menu', 'Link Group Bot', `.group`, 'Owner', '.owner']

            let notInit = [`Hai, Selamat Datang! 😁\n\nAku adalah *Bot Whatsapp* yang siap membantu kamu😅\n\nTerimakasih telah menghubungi *Bot: ${conn.user.name}*`,
                `Sejauh apa kamu tahu tentang Bot ? \n\n__________`,
                'Sudah faham', '.sayasudahfaham', 'Apa itu Bot?', '.help']

            let or = chatSender.faham ? init : notInit
            await this.sendButton(m.chat, or[0].trim(), or[1].trim(), isinit ? 3 : or[2], or[3], or[4], or[5], or[6], or[7], m, { contextInfo: { mentionedJid: conn.parseMention(teks2) } })
        }

        // ketika ada yang invite/kirim link grup di chat pribadi

        if (((this.user.jid == global.conn.user.jid) && m.mtype === 'groupInviteMessage' || m.text.includes('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup && !isOwner) {
            this.sendButton(m.chat, `╔═〘 Invite Bot ke Grup 〙
║ *Harga Sewa Bot* :
╟ Rp. 10.000 / bulan
╟ ( Qris-Dana-GO-Pay-Shoopepay )
╟ Khusus Via pulsa Rp. 15.000
║
╟ Hubungi Owner
╚════
`.trim(), '', 'List Harga', '.sewa', 'Owner', '.owner', m, { contextInfo: { mentionedJid: [global.owner[2] + '@s.whatsapp.net'] } })
        }
    }

    /*
    /////////////
    @System 
    //////////////////
    */


    // backup db
    // if (new Date() * 1 - setting.status > 1000) {
    //     let _uptime = process.uptime() * 1000
    //     let uptime = clockString(_uptime)
    //     await this.setStatus(`Bot berjalan selama ${uptime}`).catch(_ => _)
    //     setting.status = new Date() * 1
    // }

    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            setting.backupDB = new Date() * 1
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            conn.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            conn.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', false, false, { mimetype: 'application/json' })
        }
    }
}

module.exports = handler

function ucap() {
    let hr = new Date().getHours();
    let ucap
    if (hr >= 2 && hr < 10) {
        ucap = 'Pagi 🌤️🏞️'
    } else if (hr >= 10 && hr <= 13) {
        ucap = 'Siang ☀️🏝️'
    } else if (hr > 13 && hr <= 17) {
        ucap = 'Sore ⛅🌅'
    } else {
        ucap = 'Malam 🌙🌌'
    }
    return ucap
}
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}