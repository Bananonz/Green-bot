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
class setDj extends QuickCommand_1.Command {
    get name() {
        return "setdj";
    }
    get description() {
        return "Sets the DJ role.";
    }
    get category() {
        return "Admin Commands";
    }
    get permissions() {
        return ["manageGuild"];
    }
    get aliases() {
        return ["dj", "djrole"];
    }
    get arguments() {
        return [{ name: "role", type: 8, description: "The role you want to set as DJ role", required: true }];
    }
    run({ ctx: e }) {
        return __awaiter(this, void 0, void 0, function* () {
            if ("disable" === e.args[0].value || "@everyone" === e.args[0].value || "reset" === e.args[0].value)
                return null === e.guildDB.djroles
                    ? e.errorMessage("The dj role is not already set.")
                    : ((e.guildDB.djroles = null), e.client.database.handleCache(e.guildDB), e.successMessage("The DJ role has been successfully disabled on this server!"));
            const r = e.guild.roles.get(e.args[0].value);
            return !r || r.managed || r.guild.id !== e.guild.id
                ? e.errorMessage("Please provide a valid role or a valid role Id.")
                : e.guildDB.djroles.includes(r.id)
                    ? ((e.guildDB.djroles = e.guildDB.djroles.filter((e) => e !== r.id)), e.client.database.handleCache(e.guildDB), e.successMessage(`The role ${r.mention} is no longer a DJ role`))
                    : (e.guildDB.djroles.push(r.id), e.client.database.handleCache(e.guildDB), e.successMessage(`The role ${r.mention} is now a DJ role! \nNote that every member with this role will be able to manage the music!`));
        });
    }
}
exports.default = setDj;
