"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuickCommand_1 = require("../../abstract/QuickCommand");
class Queue extends QuickCommand_1.Command {
    get name() {
        return "pl-remove";
    }
    get description() {
        return "Removes a song to one of your playlists";
    }
    get aliases() {
        return ["plrem", "playlist-remove"];
    }
    get category() {
        return "Everyone Commands";
    }
    get arguments() {
        return [
            { name: "playlist_name", description: "The name of the playlist you want to create", required: true },
            { name: "track", description: "The track you want to remove from this playlist", required: true },
        ];
    }
    run({ ctx: e }) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = e.args[0];
            if (r.length < 3 || r.length > 50)
                return e.errorMessage("The playlist name must be beetween 2 and 50 long.");
            const s = yield e.client.database.getUser(e.author.id);
            if (!s || !s.playlists.find((e) => e.name === r))
                return e.errorMessage(`You don't have any playlist called **${r}** yet!`);
            if (!e.args[1])
                return e.errorMessage("Please provide the song you want to remove to this playlist!");
            const t = s.playlists.find((e) => e.name === r);
            if (!t)
                return e.errorMessage("No playlist found!");
            const a = e.args.slice(1).join(" ");
            const o = t.tracks.find((e) => e.info.title.toLowerCase().includes(a.toLowerCase()));
            if (!o)
                return e.errorMessage("This track is not in your playlist");
            (t.tracks = t.tracks.filter((e) => e.info.uri !== o.info.uri)), (s.playlists = s.playlists.filter((e) => e.name !== r)), s.playlists.push(t), s.save(), e.successMessage(`Successfully removed 1 track(s) to **${r}** `);
        });
    }
}
exports.default = Queue;
