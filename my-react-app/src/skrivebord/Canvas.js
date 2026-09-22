class Canvas {
  constructor(canvas) {
    this.canvas = canvas 
    this.c = canvas.getContext('2d')
  }

  tegn_brett(){
    let inner_firkant = window.innerWidth < 600 ? 90 : 100
    let innerst_firkant = inner_firkant / 3
    //innerfirkanter
    this.c.lineWidth = 4; // tykkere linje
    this.c.strokeRect(0,0,inner_firkant,inner_firkant);
    this.c.strokeRect(inner_firkant,0,inner_firkant,inner_firkant);
    this.c.strokeRect(inner_firkant*2,0,inner_firkant,inner_firkant);

    this.c.strokeRect(0,inner_firkant,inner_firkant,inner_firkant);
    this.c.strokeRect(inner_firkant,inner_firkant,inner_firkant,inner_firkant);
    this.c.strokeRect(inner_firkant*2,inner_firkant,inner_firkant,inner_firkant);

    this.c.strokeRect(0,inner_firkant*2,inner_firkant,inner_firkant);
    this.c.strokeRect(inner_firkant,inner_firkant*2,inner_firkant,inner_firkant);
    this.c.strokeRect(inner_firkant*2,inner_firkant*2,inner_firkant,inner_firkant);
    //innerfirkanter

    //innerst firkanter
    //innså det over er dust, forloop mye bedre
    this.c.lineWidth = 1;
    for (var i = 0; i < 9; i++) {
      for (var y = 0; y < 9; y++){
        this.c.strokeRect(i*innerst_firkant, y*innerst_firkant, innerst_firkant, innerst_firkant)
      }
    }
    console.log(this.canvas);
  }
}


export default Canvas