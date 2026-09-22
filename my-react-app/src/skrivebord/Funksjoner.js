let inner_firkant = window.innerWidth < 600 ? 90 : 100
let innerst_firkant = inner_firkant / 3
function liten_firkant_nr(mouse) {
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

function Stor_firkant_nr(mouse) {
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

export { liten_firkant_nr, Stor_firkant_nr }