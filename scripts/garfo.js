export function Garfo(id) {
    const _el = document.getElementById('g' + id)
    let _proprietario = null
    const _margem = 10 * (id % 2)

    return {
        set proprietario(filosofo) {
            _proprietario = filosofo
            _el.classList[filosofo ? 'add' : 'remove']('position-absolute')
            for (const coord of ['Top', 'Left'])
                _el.style[coord.toLowerCase()] =
                    filosofo ?
                        10 * (filosofo.id % 2) + 7 * id + filosofo.el['offset' + coord] + 'px'
                        : ''
        },
        get proprietario() {
            return _proprietario
        }
    }
}