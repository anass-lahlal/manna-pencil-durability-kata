
import {Paper}  from './../src/paper';


describe("Paper", ()=>{

    it("is created empty", ()=>{
        const paper = new Paper();
        expect(paper.content.length).toBe(0);
    });

    
})