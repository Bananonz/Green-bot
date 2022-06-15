const BaseCommand = require("../../abstract/BaseCommand.js");
class Skip extends BaseCommand {get name() { return "forceskip" }
    get description() { return "Forces Skips the currently playing song" }get aliases() { return ["fs"] }
    get permissions() { return ["MANAGE_GUILD"] }get category() { return "Queue Management" }
    get playerCheck() { return { voice: !0, dispatcher: !0, channel: !0, dj: !0 } }
    run({ ctx: e }) { if (0 == e.dispatcher.queue.length && "autoplay" !== e.dispatcher.repeat) return e.errorMessage(`Nothing next in the queue. Use \`${e.guildDB.prefix}queue\` to see the server's queue.\nWant to try autoplay? do \`${e.guildDB.prefix}autoplay\``);
        e.dispatcher.skip(), e.reply("**⏩ *Skipping* 👍**") } }
module.exports = Skip;