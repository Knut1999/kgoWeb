import './Skrivebord.css'
import Spill from './Spill'
import Documents from './Documents'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Skrivebord() {
  const navigate = useNavigate()
  const [spillOpen, setSpillOpen] = useState(false)
  const [gameMode, setGameMode] = useState(null)
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [computerOpen, setComputerOpen] = useState(false)
  const [documentsOpen, setDocumentsOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [wallpaper, setWallpaper] = useState('/lisWallpaper.webp')

  const wallpapers = [
    { name: 'Lofi room', src: '/lisWallpaper.webp' },
    { name: 'Wallpaper 2', src: '/wallpaper2.jpeg' },
    { name: 'Wallpaper 3', src: '/wallpaper3.webp' },
  ]

  const openInternetExplorer = () => {
    window.open('https://www.google.com', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="monitor">
      <div className="screen">

        <img
          className="wallpaper"
          src={wallpaper}
          alt=""
        />

        <div className="desktop-icons">

          <div
            className="desktop-icon"
            onClick={() => setSpillOpen(true)}
          >
            <div className="desktop-icon-image">🎮</div>
            <span>Spill</span>
          </div>

          <div
            className="desktop-icon"
            onClick={() => setComputerOpen(true)}
          >
            <div className="desktop-icon-image">💻</div>
            <span>Min datamaskin</span>
          </div>

          <div
            className="desktop-icon"
            onClick={() => setDocumentsOpen(true)}
          >
            <div className="desktop-icon-image">📁</div>
            <span>Mine dokumenter</span>
          </div>

          <div className="desktop-icon" onClick={openInternetExplorer}>
            <div className="desktop-icon-image">🌐</div>
            <span>Internet Explorer</span>
          </div>

          <div className="desktop-icon">
            <div className="desktop-icon-image">🗑️</div>
            <span>Papirkurv</span>
          </div>

        </div>

        {spillOpen && (
          <div className="game-window">
            <div className="game-titlebar">
              <span>Ultimate Tic-Tac-Toe</span>

              <button
                onClick={() => {
                  setSpillOpen(false)
                  setGameMode(null)
                }}
              >
                ×
              </button>
            </div>

            <div className="game-content">
              {gameMode === null ? (
                <div className="game-menu">
                  <h2>Ultimate Tic-Tac-Toe</h2>

                  <button onClick={() => setGameMode('singleplayer')}>
                    Singleplayer
                  </button>

                  <button onClick={() => setGameMode('friend')}>
                    Play with friend
                  </button>
                </div>
              ) : (
                <Spill gameMode={gameMode} />
              )}
            </div>
          </div>
        )}

        {computerOpen && (
          <div className="computer-window">
            <div className="computer-titlebar">
              <span>Min datamaskin</span>
              <button type="button" onClick={() => setComputerOpen(false)}>
                ×
              </button>
            </div>

            <div className="computer-content">
              <aside className="computer-sidebar">
                <div className="computer-sidebar-title">System Tasks</div>
                <ul>
                  <li>System Information</li>
                  <li>
                    <a
                      className="computer-task"
                      href="https://github.com/Knut1999"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <button
                      className="computer-task"
                      type="button"
                      onClick={() => setContactOpen(true)}
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </aside>

              <div className="computer-main">
                <h3>PC-oversikt</h3>

                <div className="computer-grid">
                  <div className="computer-card">
                    <span className="computer-label">Operativsystem</span>
                    <strong>Windows 98 Edition</strong>
                  </div>

                  <div className="computer-card">
                    <span className="computer-label">Processor</span>
                    <strong>React + Vite</strong>
                  </div>

                  <div className="computer-card">
                    <span className="computer-label">RAM</span>
                    <strong>32GB kreativitet</strong>
                  </div>

                  <div className="computer-card">
                    <span className="computer-label">Status</span>
                    <strong>Online & ready</strong>
                  </div>
                </div>

              </div>

              {contactOpen && (
                <div className="contact-overlay" role="presentation">
                  <section className="contact-popup" role="dialog" aria-modal="true" aria-labelledby="contact-title">
                    <div className="contact-popup-titlebar">
                      <span id="contact-title">Contact - Knut Onsøyen</span>
                      <button type="button" aria-label="Close contact" onClick={() => setContactOpen(false)}>
                        ×
                      </button>
                    </div>
                    <div className="contact-popup-content">
                      <div className="contact-avatar">KO</div>
                      <h3>Knut Onsøyen</h3>
                      <p className="contact-subtitle">Ta gjerne kontakt</p>
                      <div className="contact-details">
                        <a href="tel:+4791818616">
                          <span aria-hidden="true">☎</span>
                          <span>+47 91818616</span>
                        </a>
                        <a
                          href="https://www.linkedin.com/in/knut-ons%C3%B8yen-ab99a9230/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span aria-hidden="true">in</span>
                          <span>LinkedIn-profil</span>
                        </a>
                      </div>
                      <button className="contact-close-button" type="button" onClick={() => setContactOpen(false)}>
                        Close
                      </button>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        )}

        {documentsOpen && (
          <Documents onClose={() => setDocumentsOpen(false)} />
        )}

        {settingsOpen && (
          <div className="settings-window">
            <div className="settings-titlebar">
              <span>Settings</span>
              <button type="button" onClick={() => setSettingsOpen(false)}>
                ×
              </button>
            </div>

            <div className="settings-content">
              <h3>Desktop wallpaper</h3>
              <p>Choose a wallpaper for your desktop.</p>

              <div className="wallpaper-options">
                {wallpapers.map((item) => (
                  <button
                    className={`wallpaper-option${wallpaper === item.src ? ' selected' : ''}`}
                    type="button"
                    key={item.src}
                    aria-pressed={wallpaper === item.src}
                    onClick={() => setWallpaper(item.src)}
                  >
                    <img src={item.src} alt={item.name} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {startMenuOpen && (
          <div className="start-menu">
            <div className="start-menu-banner">Windows 98</div>

            <div className="start-menu-items">
              <button
                className="start-menu-item"
                type="button"
                onClick={() => {
                  setSpillOpen(true)
                  setGameMode(null)
                  setStartMenuOpen(false)
                }}
              >
                <span className="start-menu-icon">🎮</span>
                <span>Spill</span>
              </button>

              <button
                className="start-menu-item"
                type="button"
                onClick={() => {
                  setSettingsOpen(true)
                  setStartMenuOpen(false)
                }}
              >
                <span className="start-menu-icon">⚙️</span>
                <span>Settings</span>
              </button>

              <div className="start-menu-separator" />

              <button
                className="start-menu-item shutdown-item"
                type="button"
                onClick={() => navigate('/')}
              >
                <span className="start-menu-icon">⏻</span>
                <span>Shut down</span>
              </button>
            </div>
          </div>
        )}

        <div className="taskbar">
          <button
            className="start-button"
            type="button"
            aria-expanded={startMenuOpen}
            onClick={() => setStartMenuOpen((isOpen) => !isOpen)}
          >
            <span className="windows-logo">⊞</span>
            Start
          </button>

          <div className="taskbar-divider" />

          <div className="quick-launch">
            <button
              type="button"
              className="quick-launch-button"
              title="Min datamaskin"
              aria-label="Åpne Min datamaskin"
              onClick={() => setComputerOpen(true)}
            >
              💻
            </button>
            <button
              type="button"
              className="quick-launch-button"
              title="Mine dokumenter"
              aria-label="Åpne Mine dokumenter"
              onClick={() => setDocumentsOpen(true)}
            >
              📁
            </button>
            <button
              type="button"
              className="quick-launch-button"
              title="Internet Explorer"
              aria-label="Åpne Internet Explorer"
              onClick={openInternetExplorer}
            >
              🌐
            </button>
          </div>

          <div className="taskbar-space" />

          <div className="system-tray">
            🔊
            <span>14:27</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Skrivebord