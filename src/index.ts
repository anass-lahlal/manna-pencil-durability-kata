import {Paper} from './paper';
import { Pencil } from './pencil';


const paper = new Paper();
const pencil = new Pencil(1000, 20, 3);

pencil.write("Testing with TDD", paper);
pencil.erase("Testing with", paper);
pencil.edit(0, "Building using a new method called", paper);

console.log(paper.content);