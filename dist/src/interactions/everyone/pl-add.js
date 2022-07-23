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
const user_1 = require("../../models/user");
class Queue extends QuickCommand_1.Command {
    get name() {
        return "pl-add";
    }
    get description() {
        return "Adds a song to one of your playlists";
    }
    get aliases() {
        return ["pladd", "playlist-add"];
    }
    get category() {
        return "Everyone Commands";
    }
    get arguments() {
        return [
            { name: "playlist_name", description: "The name of the playlist you want to add a song", required: true, type: 3 },
            { name: "tracks", description: "The tracks you want to add to this playlist", required: true, type: 3 },
        ];
    }
    run({ ctx: e }) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = e.args[0].value;
            if (a.length < 3 || a.length > 50)
                return e.errorMessage("The playlist name must be beetween 2 and 50 long.");
            const r = yield user_1.userSchema.findOne({ userID: e.author.id });
            if (!r || !r.playlists.find((e) => e.name === a))
                return e.errorMessage(`You don't have any playlist called **${a}** yet!`);
            const t = [];
            let s;
            if (!e.args[1])
                return e.errorMessage("Please provide the song you want to add to this playlist!");
            s = yield e.successMessage("<a:green_loading:824308769713815612> Loading your tracks... Please wait.");
            const o = e.client.shoukaku.getNode(), n = e.args[1].value, u = yield e.client.shoukaku.search(o, n, e);
            if (u)
                if (n.includes("spotify")) {
                    if (!u || !u.raw)
                        return s.delete(), e.errorMessage("No results found for your query");
                    if ("track" === u.sp.type)
                        (u.raw.info.requester = { name: e.author.username, id: e.author.id }), t.push(u.raw);
                    else if ("playlist" === u.sp.type)
                        for (const a of u.raw) {
                            if (u.scraped && !a.track)
                                return e.errorMessage("No results found for your query");
                            const r = {
                                info: {
                                    title: u.scraped ? a.name : a.title,
                                    image: u.scraped ? a.image : a.thumbnail,
                                    uri: u.scraped ? a.track.external_urls.spotify : a.originURL,
                                    sp: true,
                                    author: a.scraped ? null : a.artists,
                                    requester: { name: e.author.username, avatar: e.author.dynamicAvatarURL(), id: e.author.id },
                                },
                            };
                            t.push(r);
                        }
                    else {
                        if ("album" !== u.sp.type)
                            return e.errorMessage("No results found for your query");
                        for (const a of u.raw) {
                            const r = {
                                info: {
                                    title: u.scraped ? a.name : a.title,
                                    author: u.scraped ? a.artists[0].name : a.artists,
                                    uri: u.scraped ? a.external_urls.spotify : a.originURL,
                                    image: u.scraped ? a.image : a.thumbnail,
                                    sp: true,
                                    requester: { name: e.author.username, id: e.author.id, avatar: e.author.dynamicAvatarURL() },
                                },
                            };
                            t.push(r);
                        }
                    }
                }
                else {
                    const { loadType: a, tracks: r, playlistInfo: o } = u;
                    if ("PLAYLIST_LOADED" !== a) {
                        if (!u.tracks.length)
                            return e.errorMessage("No results found for your query");
                        const a = u.tracks[0];
                        (a.info.requester = { name: e.author.username, id: e.author.id, avatar: e.author.dynamicAvatarURL() }), t.push(a);
                    }
                    else
                        for (const a of r)
                            (a.info.requester = { name: e.author.username, id: e.author.id }), t.push(a);
                }
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                e.successMessage(1 == t.length ? `Successfully added [${t[0].info.title}](https://discord.gg/greenbot) to **${a}**` : `Successfully added ${t.length} track(s) to **${a}** `);
                const o = r.playlists.find((e) => e.name === a);
                return t.forEach((e) => o.tracks.push(e)), (r.playlists = r.playlists.filter((e) => e.name !== a)), r.playlists.push(o), r.save();
            }), 1500);
        });
    }
}
exports.default = Queue;
