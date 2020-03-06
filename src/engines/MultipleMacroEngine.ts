import { IMacroEngine } from "./IMacroEngine";
import { MacroDefinitionArguments, MacroDefinition } from "../MacroDefinition";
import { MacroEngineFactory } from "./MacroEngineFactory";

export class MultipleMacroEngine implements IMacroEngine {
    private readonly _args: MacroDefinition[];

    constructor(args: MacroDefinitionArguments) {
        this._args = args["macros"];
    }

    public async runMacro() {
        for (var ndx = 0; ndx < this._args.length; ndx++) {
            await Promise.resolve(MacroEngineFactory.getEngine(this._args[ndx]).runMacro());
        }
    }
}