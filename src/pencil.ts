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


    write(text: string): string {
        let result = "";
        for(let char of text) {
            if(/\s/.test(char)) {
                //do not consume point
            } else if (/[A-Z]/.test(char)) {
                this.currentPointDurability -= 2
            } else {
                this.currentPointDurability -= 1
            }    
            result += char;
        }

        return result;
    }
}