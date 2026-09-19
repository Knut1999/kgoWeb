import './Letter.css'

class Letter {
  constructor(mouseObject) {
    this.element = document.createElement('div')
    this.mouseObject = mouseObject
    this.letterOpen = false

this.element.innerHTML = `
  <div class="letter">
    <button class="close-button">×</button>

    <h2>Om meg</h2>

    <p>
      Jeg er utdannet maskiningeniør fra OsloMet og
      sivilingeniør fra NTNU. Programmering har alltid
      vært en interesse, og gjennom jobb fikk jeg mye
      praktisk erfaring med det.
    </p>

    <p>
      Interessen førte meg videre mot IT. Jeg tok noen
      enkeltemner i programmering ved NTNU, og tar nå
      en master i Cloud-based Services and Operations
      ved OsloMet.
    </p>

    <p>
      Jeg liker å bygge ting og forstå hvordan tekniske
      systemer fungerer. På fritiden er jeg sosial og
      liker å være med venner, buldre og spille sjakk.
    </p>

    <p class="signature">
      Hilsen<br>
      Knut
    </p>
  </div>
`

    const closeButton =
      this.element.querySelector('.close-button')

    closeButton.addEventListener(
      'click',
      () => this.hide()
    )
  }

  show() {
    document.body.appendChild(this.element)
    this.mouseObject.disable()
    this.letterOpen = true
  }

  hide() {
    this.element.remove()
    this.mouseObject.enable()
    this.letterOpen = false
  }
}

export default Letter