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
class Mightcore extends QuickCommand_1.Command {
    get name() { return "nightcore"; }
    get description() { return "Enables/disables the nightcore filter. It can generate some pretty unique audio effects."; }
    get category() { return "Filters"; }
    get checks() { return { voice: true, dispatcher: true, channel: true, dj: true, vote: true }; }
    run({ ctx: e }) {
        return __awaiter(this, void 0, void 0, function* () { return e.dispatcher.player.filters.timescale ? (e.dispatcher.player.clearFilters(), e.successMessage("⏱ Disabling the `nightcore` filter to the current song...")) : (e.dispatcher.player.setTimescale({ speed: 1.165, pitch: 1.125, rate: 1.05 }), e.successMessage("⏱ Enabling the `nightcore` filter to the current song...")); });
    }
}
exports.default = Mightcore;
