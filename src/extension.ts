import { workspace, ExtensionContext, commands, Disposable } from 'vscode';
import { MacroDefinition } from './MacroDefinition';
import { MacroEngineFactory } from './engines/MacroEngineFactory';

var disposables: Disposable[] = [];

export function activate(context: ExtensionContext) {
    loadMacros(context);
    workspace.onDidChangeConfiguration(() => {
      disposeMacros();
      loadMacros(context);
    });
}

function loadMacros(context: ExtensionContext) {
    const config = workspace.getConfiguration('editormacros');
    if (config) {
        Object.keys(config).forEach(defName => {
            if (typeof config[defName] === "object") {
                console.log(`Loading macro: '${defName}'...`);
                const def: MacroDefinition = config[defName];
                if (def) {
                    const disposable = commands.registerCommand(`editormacros.${defName}`, async function () {
                        await Promise.resolve(MacroEngineFactory.getEngine(def).runMacro());
                    });
                    context.subscriptions.push(disposable);
                    disposables.push(disposable);
                }
            }
        });
    }
}

function disposeMacros() {
    for (var disposable of disposables) {
        disposable.dispose();
    }
}

// this method is called when your extension is deactivated
export function deactivate() {}
