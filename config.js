let fs = require('fs')
global.owner = ['6285874068202', '6281999284127', '6285173121589', '6285843734881', '687852464'] // Put your number here
global.mods = JSON.parse(fs.readFileSync('./src/mods.json')) // Want some help?
global.prems = JSON.parse(fs.readFileSync('./src/premium.json')) // Pengguna premium tidak memerlukan limit // Premium user has unlimited limit
global.link = JSON.parse(fs.readFileSync('./src/grouplink.json'))
global.group = link.map((v, i) => `Group ${i + 1}\n${v}`).join('\n\n')
global.numberowner = '6285874068202'
global.nameowner = 'KiyoEditz'
global.name = 'Kiyo•Editz™'
global.mail = 'abiandriansyah3@gmail.com'
global.instagram = 'https://www.instagram.com/kiyoeditz'
global.community = {
  game: '120363242705186427@g.us',
}
global.partner = ''
global.eror = '_*Server Error*_'
global.wait = '_*Tunggu sedang di proses...*_'
global.wm = '*Elaina-MD*'
global.playlist = '37i9dQZF1DWTwnEm1IYyoj'
const moment = require('moment-timezone')

//INI WAJIB DI ISI!//
global.lann = 'beta-KiyoEditz'
//Daftar terlebih dahulu https://api.betabotz.eu.org
/*
//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.btc = 'lvxVAfDd'
//Daftar https://api.botcahx.eu.org 
*/
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',//
  xteam: 'https://api.xteam.xyz',//
  vhtear: 'https://api.vhtear.com',//
  lann: 'https://api.betabotz.eu.org',
  btc: 'https://api.botcahx.eu.org',
  lolhuman: 'http://api.lolhuman.xyz',//
  alya: 'https://api.alyachan.dev/'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.zeks.xyz': 'qyVJpszt0uSAL0lGCfOQIV3BVfp',
  'https://api.xteam.xyz': 'Syahrulidhamz30',
  'http://api.lolhuman.xyz': 'Syahrulidhamz30',
  'https://api.vhtear.com': 'Syahrulidhamz30',
  'https://api.betabotz.eu.org': 'beta-KiyoEditz',
  'https://api.botcahx.eu.org': 'lvxVAfDd',
  'https://api.alyachan.dev/': 'syah11'
}
global.packname = 'Hi'
global.author = '⫹⫺ ᴇʟᴀɪɴᴀ 𝙱𝙾𝚃'

global.dtu = 'ɪɴꜱᴛᴀɢʀᴀᴍ'
global.urlnya = "-"

//============= callButtons =============//
global.dtc = 'ᴄᴀʟʟ ᴏᴡɴᴇʀ'
global.phn = '+62 858-7406-8202'

global.multiplier = 69 // The higher, The harder levelup

let wibh = moment.tz('Asia/Jakarta').format('HH')
let wibm = moment.tz('Asia/Jakarta').format('mm')
let wibs = moment.tz('Asia/Jakarta').format('ss')
let wktuwib = `${wibh} H ${wibm} M ${wibs} S`

let d = new Date(new Date + 3600000)
let locale = 'id'
// d.getTimeZoneOffset()
// Offset -420 is 18.00
// Offset    0 is  0.00
// Offset  420 is  7.00
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

global.botdate = `⫹⫺ Day's: ${week} ${date}`
global.bottime = `ᴛɪᴍᴇ: ${wktuwib}`

global.ucap = ucap
function ucap() {
  const hr = moment.tz('Asia/Jakarta').format('HH')
  let ucap
  if (hr >= 2 && hr < 10) {
    ucap = 'Pagi 🌤️🏞️'
  } else if (hr >= 10 && hr <= 14) {
    ucap = 'Siang ☀️🏝️'
  } else if (hr > 14 && hr <= 17) {
    ucap = 'Sore ⛅🌅'
  } else {
    ucap = 'Malam 🌙🌌'
  }
  return 'Selamat ' + ucap
}

let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})