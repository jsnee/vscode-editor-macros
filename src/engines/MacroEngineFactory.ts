import { MacroDefinition, MacroDefinitionType } from "../MacroDefinition";
import { IMacroEngine } from "./IMacroEngine";
import { CommandMacroEngine } from "./CommandMacroEngine";
import { MultipleMacroEngine } from "./MultipleMacroEngine";
import { ReplaceMacroEngine } from "./ReplaceMacroEngine";

export class MacroEngineFactory {
    static getEngine(def: MacroDefinition): IMacroEngine {
        switch (def.type) {
            case MacroDefinitionType.Command:
                return new CommandMacroEngine(def.args);
            case MacroDefinitionType.Multiple:
                return new MultipleMacroEngine(def.args);
            case MacroDefinitionType.Replace:
                return new ReplaceMacroEngine(def.args);
        }
        throw new Error(`Unidentified MacroEngineType: ${def.type}`);
    }
}