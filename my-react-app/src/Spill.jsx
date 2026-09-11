//et av mine første prosjekter :)
import { useEffect, useRef } from 'react'
import './Spill.css'

function Spill() {
  const canvasRef = useRef(null)

  useEffect(function () {
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')

    let inner_firkant = window.innerWidth < 600 ? 90 : 100
    let innerst_firkant = inner_firkant / 3

    canvas.width = inner_firkant * 3
    canvas.height = inner_firkant * 3

    function tegn_brett() {
      c.strokeStyle = 'black'

      c.lineWidth = 4

      c.strokeRect(0, 0, inner_firkant, inner_firkant)
      c.strokeRect(inner_firkant, 0, inner_firkant, inner_firkant)
      c.strokeRect(inner_firkant * 2, 0, inner_firkant, inner_firkant)

      c.strokeRect(0, inner_firkant, inner_firkant, inner_firkant)
      c.strokeRect(inner_firkant, inner_firkant, inner_firkant, inner_firkant)
      c.strokeRect(inner_firkant * 2, inner_firkant, inner_firkant, inner_firkant)

      c.strokeRect(0, inner_firkant * 2, inner_firkant, inner_firkant)
      c.strokeRect(inner_firkant, inner_firkant * 2, inner_firkant, inner_firkant)
      c.strokeRect(inner_firkant * 2, inner_firkant * 2, inner_firkant, inner_firkant)

      c.lineWidth = 1

      for (let i = 0; i < 9; i++) {
        for (let y = 0; y < 9; y++) {
          c.strokeRect(
            i * innerst_firkant,
            y * innerst_firkant,
            innerst_firkant,
            innerst_firkant
          )
        }
      }
    }

    tegn_brett()

    const mouse = {
      x: null,
      y: null
    }

    let put_overalt = false
    let liten_rute_nr_prev = null
    let store_firkanter_tatt = []
    let all_moves_list = []

    let liten_firkant_oversikt_x
    let stor_firkant_oversikt_x

    let liste_over_trekk_X_brett = []
    let liste_over_trekk_O_brett = []
    let liste_over_alle_trekk = []

    let store_firkanter_tatt_o = []
    let store_firkanter_tatt_x = []
    let win_on_last = false
    let bytte = true

    function liten_firkant_nr() {
      const x_click = mouse.x
      const y_click = mouse.y

      let rute_x = Math.floor(x_click / innerst_firkant)
      rute_x++

      let rute_y = Math.floor(y_click / innerst_firkant)
      rute_y++

      let liten_rute_x = rute_x
      let liten_rute_y = rute_y

      if (rute_x > 3 && rute_x < 7) {
        liten_rute_x = rute_x - 3
      }

      if (rute_x > 6 && rute_x < 10) {
        liten_rute_x = rute_x - 6
      }

      if (rute_y > 3 && rute_y < 7) {
        liten_rute_y = rute_y - 3
      }

      if (rute_y > 6 && rute_y < 10) {
        liten_rute_y = rute_y - 6
      }

      const liten_rute = [liten_rute_x, liten_rute_y]

      let liten_rute_nr = null

      for (let i = 1; i < 10; i++) {
        for (let y = 1; y < 10; y++) {
          if (liten_rute[0] === i && liten_rute[1] === y) {
            if (y === 1) {
              liten_rute_nr = i
            }

            if (y === 2) {
              liten_rute_nr = i + 3
            }

            if (y === 3) {
              liten_rute_nr = i + 6
            }
          }
        }
      }

      return {
        liten_rute_x,
        liten_rute_y,
        liten_rute_nr
      }
    }

    function Stor_firkant_nr() {
      const x_click = mouse.x
      const y_click = mouse.y

      let rute_x = Math.floor(x_click / innerst_firkant)
      rute_x++

      let rute_y = Math.floor(y_click / innerst_firkant)
      rute_y++

      let stor_rute_x = 1

      if (rute_x > 3 && rute_x < 7) {
        stor_rute_x = 2
      }

      if (rute_x > 6 && rute_x < 10) {
        stor_rute_x = 3
      }

      let stor_rute_y = 1

      if (rute_y > 3 && rute_y < 7) {
        stor_rute_y = 2
      }

      if (rute_y > 6 && rute_y < 10) {
        stor_rute_y = 3
      }

      const stor_rute = [stor_rute_x, stor_rute_y]

      let stor_rute_nr = null

      for (let i = 1; i < 10; i++) {
        for (let y = 1; y < 10; y++) {
          if (stor_rute[0] === i && stor_rute[1] === y) {
            if (y === 1) {
              stor_rute_nr = i
            }

            if (y === 2) {
              stor_rute_nr = i + 3
            }

            if (y === 3) {
              stor_rute_nr = i + 6
            }
          }
        }
      }

      return stor_rute_nr
    }

    function riktig_firkant(stor_rute_nr) {
      const liten = liten_firkant_nr()

      liten_firkant_oversikt_x = liten.liten_rute_nr
      stor_firkant_oversikt_x = stor_rute_nr

      put_overalt = false

      if (store_firkanter_tatt.includes(liten_rute_nr_prev)) {
        put_overalt = true
      }

      const all_moves =
        liten_firkant_oversikt_x + 9 * (stor_rute_nr - 1)

      if (store_firkanter_tatt.includes(stor_rute_nr)) {
        c.strokeStyle = 'black'
        return false
      }

      if (
        (put_overalt === false &&
          liten_rute_nr_prev != null &&
          stor_rute_nr !== liten_rute_nr_prev) ||
        all_moves_list.includes(all_moves)
      ) {
        return false
      }

      if (put_overalt === true) {
        if (store_firkanter_tatt.includes(stor_rute_nr)) {
          c.strokeStyle = 'black'
          return false
        }

        all_moves_list.push(all_moves)
        liten_rute_nr_prev = liten_firkant_oversikt_x
        return true
      }

      all_moves_list.push(all_moves)
      liten_rute_nr_prev = liten_firkant_oversikt_x

      return true
    }

    function tegn_X_O() {
      const x_click = mouse.x
      const y_click = mouse.y

      let x = 0
      let x_position = 0
      let y_position = 0

      for (let i = 1; i < 81; i++) {
        if (
          x_click / innerst_firkant <
          (innerst_firkant / innerst_firkant) * i
        ) {
          x = i - 1
          x_position = x * innerst_firkant
          break
        }
      }

      for (let i = 1; i < 81; i++) {
        if (
          y_click / innerst_firkant <
          (innerst_firkant / innerst_firkant) * i
        ) {
          y_position = i * innerst_firkant
          break
        }
      }

      const fontSizeSmall = innerst_firkant * 1.3
      c.font = `${fontSizeSmall}px Verdana`

      if (bytte === true) {
        c.fillText(
          'X',
          x_position,
          y_position,
          innerst_firkant,
          innerst_firkant
        )

        bytte = false
      } else {
        c.fillText(
          'O',
          x_position,
          y_position,
          innerst_firkant,
          innerst_firkant
        )

        bytte = true
      }
    }

    function seier(liste) {
      if (
        (liste.includes(1) &&
          liste.includes(2) &&
          liste.includes(3)) ||
        (liste.includes(4) &&
          liste.includes(5) &&
          liste.includes(6)) ||
        (liste.includes(7) &&
          liste.includes(8) &&
          liste.includes(9)) ||
        (liste.includes(1) &&
          liste.includes(4) &&
          liste.includes(7)) ||
        (liste.includes(2) &&
          liste.includes(5) &&
          liste.includes(8)) ||
        (liste.includes(3) &&
          liste.includes(6) &&
          liste.includes(9)) ||
        (liste.includes(1) &&
          liste.includes(5) &&
          liste.includes(9)) ||
        (liste.includes(3) &&
          liste.includes(5) &&
          liste.includes(7))
      ) {
        return true
      }

      return false
    }

    function check_list(liste_over_trekk_X_or_O_brett, true_false) {
      const temp_save = []

      liste_over_trekk_X_or_O_brett.forEach(function (x) {
        if (x[0] === stor_firkant_oversikt_x) {
          temp_save.push(x[1])
        }

        if (
          (temp_save.includes(1) &&
            temp_save.includes(2) &&
            temp_save.includes(3)) ||
          (temp_save.includes(4) &&
            temp_save.includes(5) &&
            temp_save.includes(6)) ||
          (temp_save.includes(7) &&
            temp_save.includes(8) &&
            temp_save.includes(9)) ||
          (temp_save.includes(1) &&
            temp_save.includes(4) &&
            temp_save.includes(7)) ||
          (temp_save.includes(2) &&
            temp_save.includes(5) &&
            temp_save.includes(8)) ||
          (temp_save.includes(3) &&
            temp_save.includes(6) &&
            temp_save.includes(9)) ||
          (temp_save.includes(1) &&
            temp_save.includes(5) &&
            temp_save.includes(9)) ||
          (temp_save.includes(3) &&
            temp_save.includes(5) &&
            temp_save.includes(7))
        ) {
          let win_mål_x = 0
          let win_mål_y = inner_firkant

          if (x[0] === 2) {
            win_mål_x = inner_firkant
          }

          if (x[0] === 3) {
            win_mål_x = 2 * inner_firkant
          }

          if (x[0] === 4) {
            win_mål_y = 1.98 * inner_firkant
          }

          if (x[0] === 5) {
            win_mål_y = 1.98 * inner_firkant
            win_mål_x = inner_firkant
          }

          if (x[0] === 6) {
            win_mål_y = 1.98 * inner_firkant
            win_mål_x = 2 * inner_firkant
          }

          if (x[0] === 7) {
            win_mål_y = 2.98 * inner_firkant
          }

          if (x[0] === 8) {
            win_mål_y = 2.98 * inner_firkant
            win_mål_x = inner_firkant
          }

          if (x[0] === 9) {
            win_mål_y = 2.98 * inner_firkant
            win_mål_x = 2 * inner_firkant
          }

          const fontSizeBig = 4.1 * innerst_firkant
          c.font = `${fontSizeBig}px Verdana`
          c.fillStyle = 'black'

          if (true_false === true) {
            c.fillText(
              'O',
              win_mål_x,
              win_mål_y,
              inner_firkant,
              inner_firkant
            )

            store_firkanter_tatt.push(x[0])
            store_firkanter_tatt_o.push(x[0])

            win_on_last = false

            if (x[0] === x[1]) {
              win_on_last = true

              if (win_on_last) {
                c.strokeStyle = 'black'
                tegn_brett()
                put_overalt = true
              }
            }
          } else {
            c.fillText(
              'X',
              win_mål_x,
              win_mål_y,
              inner_firkant,
              inner_firkant
            )

            store_firkanter_tatt.push(x[0])
            store_firkanter_tatt_x.push(x[0])

            win_on_last = false

            if (x[0] === x[1]) {
              win_on_last = true

              if (win_on_last) {
                c.strokeStyle = 'black'
                tegn_brett()
                put_overalt = true
              }
            }
          }

          if (seier(store_firkanter_tatt_x) === true) {
            setTimeout(function () {
              alert('X vant!')
            }, 50)
          } else if (seier(store_firkanter_tatt_o) === true) {
            setTimeout(function () {
              alert('O vant!')
            }, 50)
          }
        }
      })
    }

    function fullt_brett(liste_over_trekk_X_or_O_brett) {
      const all_trekk_i_firkant = []

      liste_over_trekk_X_or_O_brett.forEach(function (x) {
        if (x[0] === stor_firkant_oversikt_x) {
          all_trekk_i_firkant.push(x[1])

          if (
            all_trekk_i_firkant.includes(1) &&
            all_trekk_i_firkant.includes(2) &&
            all_trekk_i_firkant.includes(3) &&
            all_trekk_i_firkant.includes(4) &&
            all_trekk_i_firkant.includes(5) &&
            all_trekk_i_firkant.includes(6) &&
            all_trekk_i_firkant.includes(7) &&
            all_trekk_i_firkant.includes(8) &&
            all_trekk_i_firkant.includes(9)
          ) {
            store_firkanter_tatt.push(x[0])

            if (x[0] === x[1]) {
              win_on_last = true

              if (win_on_last) {
                c.strokeStyle = 'black'
                tegn_brett()
                put_overalt = true
              }
            }
          }
        }
      })
    }

    function red_squere(liten_rute_x, liten_rute_y) {
      tegn_brett()

      let pa_vunnen_firkant = false

      for (let i = 0; i < store_firkanter_tatt.length; i++) {
        if (liten_firkant_oversikt_x === store_firkanter_tatt[i]) {
          pa_vunnen_firkant = true
          return
        }
      }

      if (pa_vunnen_firkant === false) {
        c.strokeStyle = 'red'
      }

      c.lineWidth = 4

      c.strokeRect(
        (liten_rute_x - 1) * inner_firkant,
        (liten_rute_y - 1) * inner_firkant,
        inner_firkant,
        inner_firkant
      )
    }

    function tre_paa_rad(true_false) {
      if (true_false === false) {
        liste_over_trekk_X_brett.push([
          stor_firkant_oversikt_x,
          liten_firkant_oversikt_x
        ])

        liste_over_alle_trekk.push([
          stor_firkant_oversikt_x,
          liten_firkant_oversikt_x
        ])

        check_list(liste_over_trekk_X_brett, true_false)
      } else {
        liste_over_trekk_O_brett.push([
          stor_firkant_oversikt_x,
          liten_firkant_oversikt_x
        ])

        liste_over_alle_trekk.push([
          stor_firkant_oversikt_x,
          liten_firkant_oversikt_x
        ])

        check_list(liste_over_trekk_O_brett, true_false)
      }

      fullt_brett(liste_over_alle_trekk)
    }

    function handleClick(event) {
      const rect = canvas.getBoundingClientRect()

      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top

      const liten = liten_firkant_nr()
      const stor_rute_nr = Stor_firkant_nr()

      const riktig = riktig_firkant(stor_rute_nr)

      if (riktig === false) {
        return
      }

      tegn_X_O()
      red_squere(liten.liten_rute_x, liten.liten_rute_y)
      tre_paa_rad(bytte)
    }

    canvas.addEventListener('click', handleClick)

    function handleResize() {
      inner_firkant = window.innerWidth < 600 ? 70 : 100
      innerst_firkant = inner_firkant / 3

      canvas.width = inner_firkant * 3
      canvas.height = inner_firkant * 3

      tegn_brett()
    }

    window.addEventListener('resize', handleResize)

    return function () {
      canvas.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <main className="spill">
      <h1>Super 3 på rad ✖️⭕</h1>

      <canvas ref={canvasRef} id="board"></canvas>

      <h2>
        <a
          href="https://www.youtube.com/shorts/_Na3a1ZrX7c"
          target="_blank"
          rel="noreferrer"
        >
          Tutorial
        </a>
      </h2>

    </main>
  )
}

export default Spill
