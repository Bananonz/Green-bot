"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuickCommand_1 = require("../../abstract/QuickCommand");
class Move extends QuickCommand_1.Command {
    get name() { return "move"; }
    get description() { return "Moves the position of a track in the queue"; }
    get aliases() { return ["shift", "mv"]; }
    get category() { return "Queue Management"; }
    get arguments() { return [{ name: "track", type: 3, description: "The track you want to move (Provide the track position)", required: true }, { name: "new_position", type: 3, description: "The new position for your track!", required: true }]; }
    get checks() { return { voice: true, dispatcher: true, channel: true, vote: false, dj: true }; }
    run({ ctx: e }) { if (!e.args[1].value)
        return e.errorMessage("Please provide the new position of the track!"); let t = e.args[0].value.replace("#", "") - 1, r = e.args[1].value.replace("#", "") - 1, o = e.dispatcher.queue[t]; if (o || (o = e.dispatcher.queue.findIndex(t => t.info.title.toLowerCase().includes(e.args[1].value.toLowerCase()))), !o || -1 == o)
        return e.errorMessage("There is no track with this number in your queue."); e.dispatcher.remove(t), e.dispatcher.queue.splice(r, 0, o), e.client.queue._sockets.find(t => t.serverId === e.guild.id) && e.client.queue._sockets.filter(t => t.serverId === e.guild.id).forEach(t => { e.client.queue.emitOp({ changes: ["NEXT_SONGS"], socketId: t.id, serverId: e.guild.id, queueData: { incoming: e.dispatcher.queue } }); }), e.successMessage(`[${o.info.title.slice(0, 50)}](https://freesound.org/apiv2/sounds/1234/?format=json) has been moved to position #${r + 1}`); }
}
exports.default = Move;
