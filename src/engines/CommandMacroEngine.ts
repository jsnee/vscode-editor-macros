import { IMacroEngine } from "./IMacroEngine";
import { MacroDefinitionArguments } from "../MacroDefinition";
import { commands } from "vscode";

interface CommandArgs {
    [name: string]: any;
}

interface CommandDef {
    command: string;
    args: CommandArgs;
}

export class CommandMacroEngine implements IMacroEngine {
    private readonly _args: (string | CommandDef)[];

    constructor(args: MacroDefinitionArguments) {
        this._args = args["commands"];
    }

    public runMacro() {
        this._args.forEach(each => {
            if (typeof each === "string") {
                commands.executeCommand(each);
            } else {
                commands.executeCommand(each.command, each.args);
            }
        });
    }
}