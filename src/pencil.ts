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

        const updatedContent = content.slice(0, lastOccurenceIndex) + " ".repeat(term.length) + content.slice(lastOccurenceIndex + term.length);
        paper.content = updatedContent;
    }

    private getDurabilityCost(char: string): number {
        if(/\s/.test(char)) return 0;

        if(/[A-Z]/.test(char)) return 2;

        return 1;
    }
}