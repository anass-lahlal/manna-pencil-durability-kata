

describe("Pencil", () => {
    it("should initialize values correctly", () => {
        const pointDurability = 1000;
        const length = 4;
        const eraserDurability = 400;
        const pencil = new Pencil(pointDurability, length, eraserDurability);

        expect(pencil.pointDurability).toBe(pointDurability);
        expect(pencil.length).toBe(length);
        expect(pencil.eraserDurability).toBe(eraserDurability);
        expect(pencil.currentDurability).toBe(pointDurability);
    })
})