import './Letter.css'

class Letter {
  constructor(mouseObject, isWelcomeLetter = false) {
    this.element = document.createElement('div')
    this.mouseObject = mouseObject
    this.letterOpen = false

    const content = isWelcomeLetter ? `
  <div class="letter">
    <button class="close-button">×</button>

    <h2>Velkommen</h2>

    <p>
      Dette er en interaktiv 3D-side hvor du kan gå rundt
      og trykke på pilene for å utforske.
    </p>

    <p>
      Det finnes flere gøyale ting på PC-en, så jeg anbefaler
      å ta en liten tur rundt og se hva du finner.
    </p>

    <p class="signature">
      God utforskning!<br>
      Hilsen<br>
      Knut
    </p>
  </div>
` : `
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

    this.element.innerHTML = content

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