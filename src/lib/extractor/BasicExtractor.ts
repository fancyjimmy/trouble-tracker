import type Extractor from "./Extractor";
import {removeUnnecessary} from "./Extractor";

export class BasicExtractor implements Extractor {

    extract(text: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const keywords = removeUnnecessary(text);
            resolve(keywords);
        });
    }


    lemmantizeWord(word: string): string {
        return word;
    }

    stemWord(word: string): string {
        return word;
    }

}