"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_json_1 = __importDefault(require("@sanjo/request-json"));
const app_id = '397d0dab';
const app_key = '0d3f3c7e32c4f3a4b19b30f6496eb864';
async function main() {
    const expression = process.argv.slice(2).join(' ');
    const language = 'en-us';
    const data = await request_json_1.default(`https://od-api.oxforddictionaries.com/api/v2/entries/${language}/${expression}`, {
        headers: {
            'app_id': app_id,
            'app_key': app_key,
        },
    });
    /*
    const lexicalEntries = data.lexicalEntries
    const formattedLexicalEntries = lexicalEntries.map(formatLexicalEntry)
    // const formattedString = formattedLexicalEntries.join('\n\n')
    */
    const formattedString = JSON.stringify(data, null, 2);
    console.log(formattedString);
}
/*
function formatLexicalEntry(lexicalEntry: any): string {
  const category = lexicalEntry.lexicalCategory.text
  const entries = lexicalEntry.entries.map(formatEntry)

  let formattedString = category + '\n'
}

function formatEntry(entry: any): string {
  return entry.senses
}
*/
main().catch(console.error);
//# sourceMappingURL=index.js.map