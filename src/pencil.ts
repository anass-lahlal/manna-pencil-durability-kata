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
            const cost = this.getDurabilityCost(char);
            
            if(cost > this.currentPointDurability) {
                result += " ";
            } else {
                this.currentPointDurability -= cost;   
                result += char;
            }
            
        }

        return result;
    }

    sharpen() {
        if(this.length === 0) return;
        
        this.length -= 1;
        this.currentPointDurability = this.pointDurability;
    }

    private getDurabilityCost(char: string): number {
        if(/\s/.test(char)) return 0;

        if(/[A-Z]/.test(char)) return 2;

        return 1;
    }
}