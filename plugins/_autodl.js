//const { igdl, twitter, pin } = require('../lib/scrape')
//const { ytIdRegex, servers, yta, ytv } = require('../lib/y2mate')
//const fetch = require('node-fetch')
const { tiktokdl, instagramdl, instagramdlv2, instagramdlv3, instagramdlv4 } = require('@bochilteam/scraper')
let eror = `Link salah`
let acc = `Link accept`
let handler = m => m

handler.before = async function (m, { isPrems, match }) {
    let chat = db.data.chats[m.chat]
    let user = db.data.users[m.sender]
    let set = db.data.settings[this.user.jid]
    if (chat.isBanned || user.banned || m.isBaileys) return

    if (/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com/i.test(m.text)) {
        if (/..?(t(ik)?t(ok)?2?) /i.test(m.text)) {
            return m.reply(`Kamu bisa download link ini langsung tanpa perintah\nCukup langsung kirim ke chat ini`)
        }

        let link = (/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com\/.*/i.exec(m.text))[0].split(/\n| /i)[0]
        m.reply(acc)
        const { author: { nickname }, video, description } = await tiktokdl(link).catch(e => m.reply(eror))
        const url = video.no_watermark || video.no_watermark2 || video.no_watermark_raw || false
        if (!url) throw eror
        await this.sendFile(m.chat, (url), (new Date * 1) + '.mp4', `@${nickname}\n${description}`, m, null, { asDocument: global.db.data.users[m.sender].useDocument })
    }

    // if (/https?:\/\/i\.coco\.fun\//i.test(m.text)) {
    //     let res = await fetch(API('jojo', '/api/cocofun-no-wm', { url: m.text.match(/https?:\/\/i\.coco\.fun\/.*/i)[0].split(/\n| /i)[0] }))
    //     if (!res.ok) return m.reply(eror)
    //     let json = await res.json()
    //     await m.reply(wait)
    //     await this.sendFile(m.chat, json.download, '', '© stikerin', m)
    // }

    // if (/https?:\/\/(fb\.watch|(www\.|web\.|m\.)?facebook\.com)/i.test(m.text)) {
    //     let res = await fetch(API('neoxr', '/api/download/fb', { url: m.text.match(/https?:\/\/(fb\.watch|(www\.|web\.|m\.)?facebook\.com)\/.*/i)[0].split(/\n| /i)[0] }, 'apikey'))
    //     if (!res.ok) return m.reply(eror)
    //     let json = await res.json()
    //     if (!json.status) return m.reply(this.format(json))
    //     await m.reply(wait)
    //     await conn.sendFile(m.chat, json.data.sd.url, '', `HD: ${json.data.hd.url}\nUkuran: ${json.data.hd.size}\n\n© stikerin`, m)
    // }

    if (/https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)/i.test(m.text)) {
        if (/..?(ig|instagram)2? /i.test(m.text)) {
            return m.reply(`Kamu bisa download link ini langsung tanpa perintah\nCukup langsung kirim ke chat ini`)
        }
        let link = (/https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/.*/i.exec(m.text))[0].split(/\n| /i)[0]
        m.reply(acc)
        let dl = await instagramdl(link)
            .catch(async _ => await instagramdlv2(link))
            .catch(async _ => await instagramdlv3(link))
            .catch(async _ => await instagramdlv4(link))
            .catch(e => m.reply(eror))
        for (let { url: link } of dl) {
            this.sendFile(m.chat, link, 'ig' // + (link.includes('mp4') ? 'mp4' : 'jpg')//
                , '', m, null, { asDocument: global.db.data.users[m.sender].useDocument })
        }
    }

    // if (/https?:\/\/(www\.)?(pinterest\.com\/pin|pin\.it)/i.test(m.text)) {
    //     pin(m.text.match(/https?:\/\/(www\.)?(pinterest\.com\/pin|pin\.it).*/i)[0].split(/\n| /i)[0]).then(async res => {
    //         let json = JSON.parse(JSON.stringify(res))
    //         if (!json.status) return m.reply(eror)
    //         await m.reply(wait)
    //         this.sendFile(m.chat, json.data[0].url, json.data[0].url, '© stikerin', m)
    //     }).catch(_ => _)
    // }

    // if (/https?:\/\/(www\.)?twitter\.com\/.*\/status/i.test(m.text)) {
    //     twitter(m.text.match(/https?:\/\/(www\.)?twitter\.com\/.*\/status\/.*/i)[0].split(/\n| /i)[0]).then(async res => {
    //         let json = JSON.parse(JSON.stringify(res))
    //         let pesan = json.data.map((v) => `Link: ${v.url}`).join('\n------------\n')
    //         await m.reply(wait)
    //         for (let { url } of json.data) {
    //             this.sendFile(m.chat, url, 'tw' + (/mp4/i.test(url) ? '.mp4' : '.jpg'), '© stikerin', m)
    //         }
    //     }).catch(_ => _)
    // }

    //     if (ytIdRegex.test(m.text) || ytIdRegex.test(m.selectedButtonId)) {
    //         let yt = false
    //         let usedServer = servers[0]
    //         for (let i in servers) {
    //             let server = servers[i]
    //             try {
    //                 yt = await yta(vid.url, server)
    //                 yt2 = await ytv(vid.url, server)
    //                 usedServer = server
    //                 break
    //             } catch (e) {
    //                 // m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
    //             }
    //         }
    //         if (yt === false) return m.reply(eror)
    //         if (yt2 === false) return m.reply(eror)
    //         let { thumb, title, filesizeF } = yt
    //         await this.send2ButtonLoc(m.chat, thumb, `
    // *Judul:* ${title}
    // *Ukuran File Audio:* ${filesizeF}
    // *Ukuran File Video:* ${yt2.filesizeF}
    // *Server y2mate:* ${usedServer}
    // `.trim(), '© stikerin', 'Audio', `.yta ${vid.url}`, 'Video', `.ytv ${vid.url}`)
    //     }

    return !0
}

module.exports = handler