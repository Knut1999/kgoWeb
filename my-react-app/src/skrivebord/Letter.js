import './Letter.css'

export const LETTER_CONTENT = {
  title: 'Om meg',
  paragraphs: [
    `Jeg er utdannet maskiningeniør fra OsloMet og
      sivilingeniør fra NTNU. Programmering har alltid
      vært en interesse, og gjennom jobb fikk jeg mye
      praktisk erfaring med det.`,
    `Interessen førte meg videre mot IT. Jeg tok noen
      enkeltemner i programmering ved NTNU, og tar nå
      en master i Cloud-based Services and Operations
      ved OsloMet.`,
    `Jeg liker å bygge ting og forstå hvordan tekniske
      systemer fungerer. På fritiden er jeg sosial og
      liker å være med venner, buldre og spille sjakk.`
  ],
  signature: 'Knut'
}

class Letter {
  constructor(mouseObject) {
    this.element = document.createElement('div')
    this.mouseObject = mouseObject
    this.letterOpen = false

this.element.innerHTML = `
  <div class="letter">
    <button class="close-button">×</button>

    <h2>${LETTER_CONTENT.title}</h2>

    ${LETTER_CONTENT.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}

    <p class="signature">
      Hilsen<br>
      ${LETTER_CONTENT.signature}
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