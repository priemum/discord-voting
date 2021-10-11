const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client()
const color = require("chalk")
const fs = require('fs')

///////////////////////////////////////////////
let cookies = ""

let guilds = [
   ""
]
///////////////////////////////////////////////

if(!fs.existsSync('.env')) {
    console.log(`${color.red('Veuillez fournir le TOKEN de votre Bot, dans le fichier')} ${color.magenta('.env')}`)
    fs.writeFileSync('.env', 'token=')
    process.exit()
    client.destroy()
}

client.on("ready", async () => {

console.log(`${client.user.tag} : ${color.green('Running')}\n`)

    for (let i = 0; i < guilds.length; i++) {
       voting(cookies, guilds[i]).then(r => r.json()).then(console.log).catch((e) => {console.log(e)})
    }

})

async function voting(token, id) {
    return require('node-fetch')("https://discordinvites.net/vote", {
        "headers": {
            "content-type": "application/x-www-form-urlencoded;",
            "cookie": `PHPSESSID=${token};`
        },
        "body": `type=sendVote&guildId=${id}`,
        "method": "POST",
    })
}

client.login(process.env.token)
