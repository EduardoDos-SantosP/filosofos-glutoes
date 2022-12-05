export function Jantar() {
    const _filosofos = []
    const _gargos = []

    return {
        add(filosofo, garfo) {
            _filosofos.push(filosofo)
            _gargos.push(garfo)
        },
        start() {
            try {
                _filosofos.forEach((f, i) => {
                    f.setGarfos(_gargos[i], _gargos[i + 1] ?? _gargos[0])
                    f.start()
                })
            } catch (e) { console.error(e) }
        },
        stop() {
            _filosofos.forEach(f => f.stop())
        }
    }
}