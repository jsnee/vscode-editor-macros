export interface MacroDefinition {
    type: string;
    args: MacroDefinitionArguments;
}

export interface MacroDefinitionArguments {
    [name: string]: any;
}

export enum MacroDefinitionType {
    Multiple = "multiple",
    Command = "command",
    Replace = "replace"
}