
import {Paper}  from './../src/paper';


describe("Paper", ()=>{
    let paper: Paper;

    beforeEach(() => {
        paper = new Paper();
    })

    it("is created empty", ()=>{
        expect(paper.content.length).toBe(0);
    });

    it("needs to write text to the content", () => {
        paper.write("Text");
        expect(paper.content).toBe("Text");
    })

    
})