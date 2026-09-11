import './Skrivebord.css'
import Spill from './Spill'
import { useState } from 'react'

function Skrivebord() {
  const [spillOpen, setSpillOpen] = useState(false)

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
            onDoubleClick={() => setSpillOpen(true)}
          >
            <div className="desktop-icon-image">🎮</div>
            <span>Spill</span>
          </div>

          <div className="desktop-icon">
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

              <button onClick={() => setSpillOpen(false)}>
                ×
              </button>
            </div>

            <div className="game-content">
              <Spill />
            </div>
          </div>
        )}

        <div className="taskbar">
          <button className="start-button">
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