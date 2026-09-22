import './Documents.css'
import { LETTER_CONTENT } from './Letter'
import { SKILLS } from './Skills'
import { useState } from 'react'

function Documents({ onClose }) {
  const [selectedDocument, setSelectedDocument] = useState(null)

  return (
    <div className="documents-window">
      <div className="documents-titlebar">
        <span>Mine dokumenter</span>
        <button type="button" onClick={onClose}>×</button>
      </div>

      <div className="documents-content">
        <aside className="documents-list">
          <div className="documents-path">C:\\Mine dokumenter</div>

          <button
            className={selectedDocument === 'skills' ? 'document-file selected' : 'document-file'}
            type="button"
            onClick={() => setSelectedDocument('skills')}
          >
            <span className="document-file-icon">📄</span>
            <span>mine-skills.txt</span>
          </button>

          <button
            className={selectedDocument === 'letter' ? 'document-file selected' : 'document-file'}
            type="button"
            onClick={() => setSelectedDocument('letter')}
          >
            <span className="document-file-icon">✉️</span>
            <span>om-meg.txt</span>
          </button>
        </aside>

        <article className="document-preview">
          {selectedDocument === null && (
            <div className="document-empty">
              <div className="document-empty-icon">📁</div>
              <p>Velg et dokument for å åpne det.</p>
            </div>
          )}

          {selectedDocument === 'skills' && (
            <div className="document-page skills-page">
              <h2>Mine skills</h2>
              <p>Ferdigheter og teknologier jeg jobber med.</p>
              <div className="skills-grid">
                {SKILLS.map((skill) => (
                  <span className="skill-box" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          )}

          {selectedDocument === 'letter' && (
            <div className="document-page letter-page">
              <h2>{LETTER_CONTENT.title}</h2>
              {LETTER_CONTENT.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="document-signature">
                Hilsen<br />{LETTER_CONTENT.signature}
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

export default Documents
