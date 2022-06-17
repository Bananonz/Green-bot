const BaseCommand = require("../../abstract/BaseCommand.js");
class Volume extends BaseCommand {get name() { return "seek" }
    get description() { return "Sets the time of the playback" }get category() { return "Queue Management" }
    get arguments() { return [{ type: 3, name: "time", description: "The time in miliseconds of the playback (1000 = 1s so 10000=10s)", required: !0 }] }get playerCheck() { return { voice: !0, dispatcher: !0, channel: !0, dj: !0 } }
    run({ ctx: e }) { let t = e.args[0].value; return !t || isNaN(t) || t > e.dispatcher.current.length || t < 0 ? e.successMessage("The duration you provided is incorrect. It must be a number beetwen **1** and **200**") : (e.dispatcher.player.seekTo(parseInt(t)), e.successMessage(`➡ Playback set to \`${t/6e4}m:${t/1e3}s\``)) } }
module.exports = Volume;