let handler = async (m, { conn, participants, groupMetadata }) => {
    const getGroupAdmins = (participants) => {
        admins = []
        for (let i of participants) {
            i.isAdmin ? admins.push(i.jid) : ''
        }
        return admins
    }
    let pp = './src/avatar_contact.png'
    try {
        pp = await conn.getProfilePicture(m.chat)
    } catch (e) {
    } finally {
        let { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, stiker, game, delete: del, viewonce } = global.db.data.chats[m.chat]
        const groupAdmins = participants.filter(v => v.isAdmin).map(v => v.jid)
        let listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.split('@')[0]}`).join('\n')
        let text = `*「 Group Information 」*\n
*Name:* 
${groupMetadata.subject}
*ID:* ${groupMetadata.id}
*Total Members:* ${participants.length} Members
*Description:* 
${groupMetadata.desc}

*Group Owner:* @${m.chat.split`-`[0]}
*Group Admins:*
${listAdmin}

*Group Settings:*
Banned ${isBanned ? '✅' : '❌'}
Welcome ${welcome ? '✅' : '❌'} 
Detect ${detect ? '✅' : '❌'} 
Anti Delete ${del ? '❌' : '✅'} 
Anti Link ${antiLink ? '✅' : '❌'} 
Anti Sekali Lihat ${viewonce ? '✅' : '❌'}
Otomatis Stiker ${stiker ? '✅' : '❌'}
Fitur Game ${game ? '✅' : '❌'}

*Message Settings:*
Welcome: ${sWelcome}
Bye: ${sBye}
Promote: ${sPromote}
Demote: ${sDemote}

*Sisa Masa Aktif Group:*
${clockString(global.db.data.chats[m.chat].gcdate ? (global.db.data.chats[m.chat].gcdate - new Date() * 1) : '')}
`.trim()
        ownernya = [`${m.chat.split`-`[0]}@s.whatsapp.net`]
        let mentionedJid = groupAdmins.concat(ownernya)
        conn.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, { contextInfo: { mentionedJid } })
    }
}
handler.help = ['infogrup']
handler.tags = ['group', 'info']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i
handler.group = true

module.exports = handler

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / (3600000 * 24))
    let h = isNaN(ms) ? '--' : Math.floor((ms % 86400000) / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return `${d} Hari, ${h} Jam ${m} menit ${s} detik`
}