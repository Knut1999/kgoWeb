import './Skrivebord.css'
import Spill from './Spill'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Skrivebord() {
  const navigate = useNavigate()
  const [spillOpen, setSpillOpen] = useState(false)
  const [gameMode, setGameMode] = useState(null)
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [computerOpen, setComputerOpen] = useState(false)

  return (
    <div className="monitor">
      <div className="screen">

        <img
          className="wallpaper"
          src="/lisWallpaper.webp"
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

          <div className="desktop-icon">
            <div className="desktop-icon-image">📁</div>
            <span>Mine dokumenter</span>
          </div>

          <div className="desktop-icon">
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
                  <li>My Projects</li>
                  <li>GitHub</li>
                  <li>Contact</li>
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

                <div className="computer-projects">
                  <h4>Mine mapper</h4>
                  <div className="project-row">
                    <span>📁</span>
                    <span>Portfolio</span>
                  </div>
                  <div className="project-row">
                    <span>📁</span>
                    <span>Webutvikling</span>
                  </div>
                  <div className="project-row">
                    <span>📁</span>
                    <span>Kontakt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {startMenuOpen && (
          <div className="start-menu">
            <div className="start-menu-banner">Windows 98</div>

            <div className="start-menu-items">
              <button className="start-menu-item" type="button">
                <span className="start-menu-icon">📂</span>
                <span>Programs</span>
              </button>

              <button className="start-menu-item" type="button">
                <span className="start-menu-icon">📄</span>
                <span>Documents</span>
              </button>

              <button className="start-menu-item" type="button">
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
            <span>🌐</span>
            <span>📁</span>
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