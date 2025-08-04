import { Paper } from "./paper";

export class Pencil {
    pointDurability: number;
    eraserDurability: number;
    length: number;
    currentPointDurability: number;

    constructor(pointDurability: number, eraserDurability: number, length: number) {
        this.pointDurability = pointDurability;
        this.eraserDurability = eraserDurability;
        this.length = length;
        this.currentPointDurability = pointDurability;
    }


    write(text: string, paper: Paper) {
        let result = "";
        for(let char of text) {
            const cost = this.getDurabilityCost(char);
            
            if(cost > this.currentPointDurability) {
                result += " ";
            } else {
                this.currentPointDurability -= cost;   
                result += char;
            }
            
        }

        paper.write(result);
    }

    sharpen() {
        if(this.length === 0) return;

        this.length -= 1;
        this.currentPointDurability = this.pointDurability;
    }

    erase(term: string, paper: Paper) {
        const {content} = paper;
        const lastOccurenceIndex = content.lastIndexOf(term);

        if(lastOccurenceIndex === -1) return;

        let chars = term.split('').reverse();
        const replacement = [];

        for(let char of chars) {
            const isEmptySpace = /\s/.test(char);
            if(isEmptySpace) {
                replacement.push(char);
                continue;
            }

            if(this.eraserDurability > 0) {
                replacement.push(" ");
                this.eraserDurability -= 1;
                continue;
            }

            replacement.push(char);
        }

        const updatedContent = content.slice(0, lastOccurenceIndex) + replacement.reverse().join("") + content.slice(lastOccurenceIndex + term.length);
        paper.override(updatedContent);
    }

    edit(index: number, term: string, paper: Paper) {
        const {content} = paper;
        const segment = content.slice(index, index + term.length);

        let result = "";
        for(let i = 0; i < term.length; i++) {
            const isEmptySpace = /\s/.test(segment.charAt(i) ?? ' ');
            const cost = this.getDurabilityCost(term[i]);
            if(isEmptySpace) {
                if(cost > this.currentPointDurability) {
                    result += segment.charAt(i);
                } else {
                    result += term[i];
                    this.currentPointDurability -= cost;
                }
            } else {
                result+= '@';
            }
        }

        const editedContent = content.slice(0, index) + result + content.slice(index + term.length);
        paper.override(editedContent);
    }

    private getDurabilityCost(char: string): number {
        if(/\s/.test(char)) return 0;

        if(/[A-Z]/.test(char)) return 2;

        return 1;
    }
}