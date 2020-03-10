# vscode-editor-macros
Visual Studio Code extension that provides a lightweight solution to VSCode's lack of custom macros.

This extension is heavily inspired by geddski's [macros](https://marketplace.visualstudio.com/items?itemName=geddski.macros) extension.

## Usage
There are two main types of macros you can create:
- Command-based
- String replacement
Create your own custom macros by adding them to your `settings.json` (Code|File > Preferences > User Settings)

### Command Macros
Exactly like the [macros](https://marketplace.visualstudio.com/items?itemName=geddski.macros) extension, you can chain together a series of commands to run in succession:

```json
{
    "editormacros": {
        "addSemicolon": {
            "type": "command",
            "args": {
                "commands": [
                    "cursorEnd",
                    { "command": "type", "args": { "text": ";" } }
                ]
            }
        }
    }
}
```

### String Replacement
This extension also leverages string replacement as another way to design macros. You can configure string replacement as such:

```json
{
    "editormacros": {
        "convertTabsToSpaces": {
            "type": "replace",
            "args": {
                "regex": true,
                "replaceAll": true,
                "multiline": false,
                "searchPattern": "\t",
                "replacePattern": "    "
            }
        }
    }
}
```
Note: `"regex"`, `"replaceAll"`, and `"multiline"` aren't required, but will both default to `false` if not provided. If `"regex"` is true, the `"searchPattern"` will be treated as a regular expression. `"multiline"` enables the multiline flag.

### Multiple Typed Macros
If you want to chain multiple string replacements or combine commands with string replacements, you can use the "third" macro type: `"multiple"`:

```json
{
    "editormacros": {
        "deserialize": {
            "type": "multiple",
            "args": {
                "macros": [
                    {
                        "type": "replace",
                        "args": {
                            "regex": true,
                            "searchPattern": "^'",
                            "replacePattern": ""
                        }
                    },
                    {
                        "type": "replace",
                        "args": {
                            "regex": true,
                            "searchPattern": "'$",
                            "replacePattern": ""
                        }
                    },
                    {
                        "type": "replace",
                        "args": {
                            "regex": true,
                            "replaceAll": true,
                            "searchPattern": " ",
                            "replacePattern": "\n"
                        }
                    }
                ]
            }
        }
    }
}
```

### Configuring Keybindings
Just like the [macro](https://marketplace.visualstudio.com/items?itemName=geddski.macros) extension, once your macros are setup, you can bind them to macros in `keybindings.json` (Code|File > Preferences > Keyboard Shortcuts):
```json
[
    {
        "key": "ctrl+alt+shift+;",
        "command": "editormacros.addSemicolon"
    }
]
```