"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuickCommand_1 = require("../../abstract/QuickCommand");
class Seek extends QuickCommand_1.Command {
    get name() { return "seek"; }
    get description() { return "Sets the time of the playback"; }
    get category() { return "Queue Management"; }
    get arguments() { return [{ type: 3, name: "time", description: "The time in miliseconds of the playback (1000 = 1s so 10000=10s)", required: true }]; }
    get checks() { return { voice: true, dispatcher: true, channel: true, dj: true }; }
    run({ ctx: e }) { const t = e.args[0].value; return !t || isNaN(t) || t > e.dispatcher.current.length || t < 0 ? e.successMessage("The duration you provided is incorrect. It must be a number beetwen **1** and **200**") : (e.dispatcher.player.seekTo(parseInt(t)), e.successMessage(`➡ Playback set to \`${t / 6e4}m:${t / 1e3}s\``)); }
}
exports.default = Seek;
