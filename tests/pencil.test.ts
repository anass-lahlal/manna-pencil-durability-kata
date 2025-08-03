import { Pencil } from './../src/pencil';

describe("Pencil", () => {
    let pencil: Pencil;
    const pointDurability = 1000;
    const length = 4;
    const eraserDurability = 400;

    beforeEach(() => {
        pencil = new Pencil(pointDurability, eraserDurability, length);
    })

    it("should initialize values correctly", () => {
        expect(pencil.pointDurability).toBe(pointDurability);
        expect(pencil.length).toBe(length);
        expect(pencil.eraserDurability).toBe(eraserDurability);
        expect(pencil.currentPointDurability).toBe(pointDurability);
    })

    it("should consume 0 point durability on writing space", () => {
        pencil.write(" ".repeat(10));
        expect(pencil.currentPointDurability).toBe(pointDurability);
    })
})