import { Paper } from '../src/paper';
import { Pencil } from './../src/pencil';

describe("Pencil", () => {
    let pencil: Pencil;
    let paper: Paper;
    const pointDurability = 1000;
    const length = 4;
    const eraserDurability = 400;

    beforeEach(() => {
        pencil = new Pencil(pointDurability, eraserDurability, length);
        paper = new Paper();
    })

    it("should initialize values correctly", () => {
        expect(pencil.pointDurability).toBe(pointDurability);
        expect(pencil.length).toBe(length);
        expect(pencil.eraserDurability).toBe(eraserDurability);
        expect(pencil.currentPointDurability).toBe(pointDurability);
    })

    it("should consume 0 point durability on writing space", () => {
        pencil.write(" ".repeat(10), paper);
        expect(pencil.currentPointDurability).toBe(pointDurability);
    })


    it("should consume 2 durability points on uppercase letters", () => {
        const repeats = 10;
        pencil.write("A".repeat(repeats), paper);
        expect(pencil.currentPointDurability).toBe(pointDurability - repeats * 2);
    })

    it("should consume 1 durability point on lowercase letters", () => {
        const repeats = 10;
        pencil.write("a".repeat(repeats), paper);
        expect(pencil.currentPointDurability).toBe(pointDurability - repeats);
    })

    it("should return text to write when durability point is available", () => {
        pencil.write("Test", paper);
        expect(paper.content).toBe("Test");
    })

    it("should return empty space instead of characters when durability points are depleted", () => {
        pencil.write("a".repeat(pointDurability), paper);
        pencil.write("Hey", paper);
        expect(paper.content.endsWith("   ")).toBeTruthy();
    })

    it("should reset durability points when sharpened", () => {
        pencil.write("a".repeat(pointDurability), paper);
        expect(pencil.currentPointDurability).toBe(0);

        pencil.sharpen();
        expect(pencil.currentPointDurability).toBe(pointDurability);
    })

    it("should decrease length of pencil when sharpened", () => {
        pencil.sharpen();
        expect(pencil.length).toBe(length - 1);
    })

    it("should be sharpened as long as it has some remaining length", () => {
        const sharpeningTimes = length + 1;
        for(let i = 0; i < sharpeningTimes; i++) {
            pencil.write("a".repeat(pointDurability), paper);
            pencil.sharpen();
        }

        expect(pencil.currentPointDurability).toBe(0);
    })
})