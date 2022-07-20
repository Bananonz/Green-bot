import { Command } from "../../abstract/QuickCommand";export default class Tremolo extends Command {
get name(){return"tremolo"}get description(){return"Enables/disables the tremolo filter"}get category(){return"Filters"}get checks(){return{voice:true,dispatcher:true,channel:true,vote:true}}async run({ctx:e}){return e.dispatcher.player.filters.tremolo?(e.dispatcher.player.setTremolo(),e.successMessage("⏱ Disabling the `Tremolo` filter to the current song...")):(e.dispatcher.player.setTremolo({frequency:4,depth:.75}),e.successMessage("⏱ Enabling the `Tremolo` filter to the current song..."))}}