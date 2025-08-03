export class Paper {
    public content = "";


    write(txt: string) {
        this.content += txt;
    }

    override(txt: string) {
        this.content = txt;
    }
}