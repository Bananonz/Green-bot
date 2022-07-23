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
const BaseEvent_1 = require("../abstract/BaseEvent");
class Ready extends BaseEvent_1.BaseEvent {
    constructor() {
        super({
            name: "ready",
            once: true
        });
    }
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            client.config.debug && console.log("[Shard] Bot is ready");
            client.shards.forEach(shard => {
                shard.editStatus("online", { name: "*help | green-bot.app", type: 3 });
            });
        });
    }
}
exports.default = Ready;
