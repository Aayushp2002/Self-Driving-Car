class Controls{
    constructor(){
        this.left=false; // left key
        this.right=false; // right key
        this.forward=false; // up key
        this.reverse=false; // down key

        this.#addKeyBoardListeners(); // add keyboard listeners
    }


    #addKeyBoardListeners(){
        document.onkeydown=(event)=>{ // when a key is pressed
            switch(event.key){
                case "ArrowLeft": // left key
                    this.left=true; // set left to true
                    break;
                case "ArrowRight": // right key
                    this.right=true; // set right to true
                    break;
                case "ArrowUp": // up key
                    this.forward=true; // set forward to true
                    break;
                case "ArrowDown": // down key
                    this.reverse=true; // set reverse to true
                    break;
            }
            // console.table(this); // to debug
        }
        document.onkeyup=(event)=>{ // when a key is released
            switch(event.key){
                case "ArrowLeft": // left key
                    this.left=false; // set left to false
                    break;
                case "ArrowRight": // right key
                    this.right=false; // set right to false
                    break;
                case "ArrowUp": // up key
                    this.forward=false; // set forward to false
                    break;
                case "ArrowDown": // down key
                    this.reverse=false; // set reverse to false
                    break;
            }
        }
        // console.table(this); // to debug
    }
}