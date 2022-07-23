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
        return "pl-list";
    }
    get description() {
        return "Shows all your playlists!";
    }
    get aliases() {
        return ["pllist", "playlists", "list-pl"];
    }
    get category() {
        return "Everyone Commands";
    }
    run({ ctx: e }) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield e.client.database.getUser(e.author.id);
            if (!t)
                return e.errorMessage("You don't have any playlist yet!");
            e.send({
                embeds: [
                    {
                        description: "You can create a playlist with the `" + e.guildDB.prefix + "pl-create` command.",
                        author: { name: "Your playlists", icon_url: e.author.dynamicAvatarURL() },
                        fields: [
                            {
                                name: "• List (" + t.playlists.length + " / 10)",
                                value: t.playlists.length ? t.playlists.map((e) => `[${e.name}](https://green-bot.app), ${e.tracks.length} tracks.`).join("\n") : "You don't have any playlist yet!",
                            },
                            {
                                name: "• Liked songs (" + t.songs.length + ")",
                                value: t.songs.length ? `You currently have **${t.songs.length}** liked songs!\n You can play your liked songs with \`/pl-p liked-songs\`` : "You don't have any liked song yet!",
                            },
                        ],
                        color: 0x3a871f,
                    },
                ],
                components: [{ components: [{ custom_id: "edit_pl", label: "Edit a playlist", style: 3, type: 2 }], type: 1 }],
            });
        });
    }
}
exports.default = Queue;
