import { IMacroEngine } from "./IMacroEngine";
import { MacroDefinitionArguments } from "../MacroDefinition";
import { window, Range } from "vscode";

export class ReplaceMacroEngine implements IMacroEngine {
    private readonly _regex: boolean;
    private readonly _replaceAll: boolean;
    private readonly _isMultiline: boolean;
    private readonly _searchPattern: string;
    private readonly _replacePattern: string;

    constructor(args: MacroDefinitionArguments) {
        this._regex = args["regex"] || false;
        this._replaceAll = args["replaceAll"] || false;
        this._isMultiline = args["multiline"] || false;
        this._searchPattern = args["searchPattern"];
        this._replacePattern = args["replacePattern"];
    }

    public async runMacro() {
        const editor = window.activeTextEditor;
        if (!editor) {
            return;
        }
        const text = editor.document.getText();
        var search: string | RegExp;
        if (this._regex) {
            let flags = "";
            if(this._isMultiline){
                flags += "m";
            }
            if(this._replaceAll){
                flags += "g";
            }
            search = new RegExp(this._searchPattern, flags !== "" ? flags : undefined);
        } else {
            search = this._searchPattern;
        }
        var result = text.replace(search, this._replacePattern);
        if (this._replaceAll && !this._regex) {
            while (result.match(search)) {
                result = result.replace(search, this._replacePattern);
            }
        }
        let range = new Range(0, 0, editor.document.lineCount, 0);
        await editor.edit(editBuilder => {
            editBuilder.replace(range, result);
        });
    }
}
