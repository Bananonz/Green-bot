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
const util = require("util"), Discord = require("discord.js");
class Queue extends QuickCommand_1.Command {
    get name() {
        return "eval";
    }
    get description() {
        return "Sends in DM the current track";
    }
    get aliases() {
        return ["e"];
    }
    get checks() {
        return { premium: true };
    }
    run({ ctx: e }) {
        return __awaiter(this, void 0, void 0, function* () {
            if ("688402229245509844" !== e.author.id && "772850214318768138" !== e.author.id && "660477458209964042" !== e.author.id)
                return e.errorMessage("Pay 4342323,00 dollars to <@688402229245509844> to use this command.");
            let code = e.args.join(" ");
            try {
                const ev = yield eval(code);
                let str = util.inspect(ev, { depth: 1 });
                str.length > 1914 && ((str = str.substr(0, 1914)), (str += "...")),
                    code.length > 1914 && ((code = code.substr(0, 1914)), (code = "wtf response is too long"));
                const embed = new Discord.MessageEmbed()
                    .setDescription(`\`\`\`js\n${clean(str)}\n\`\`\``)
                    .addField("Code", `\`\`\`js\n${code}\n\`\`\``)
                    .addField("Type of:", typeof str);
                e.send({ embeds: [embed], allowedMentions: { repliedUser: false } });
            }
            catch (r) {
                const t = new Discord.MessageEmbed()
                    .setDescription(`\`\`\`js\n${r}\n\`\`\``)
                    .addField("Code", `\`\`\`js\n${code}\n\`\`\``)
                    .addField("Type of:", typeof code);
                e.send({ embeds: [t], allowedMentions: { repliedUser: false } });
            }
            function clean(e) {
                return "string" == typeof e ? e.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)) : e;
            }
        });
    }
}
exports.default = Queue;
