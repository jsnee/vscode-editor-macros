export interface IMacroEngine {
    runMacro(): void | Thenable<void>;
}