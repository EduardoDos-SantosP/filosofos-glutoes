import { wait } from "./utils.js";

const TROCAS_POR_MILISSEGUNDO = 0.2 / 1_000

const PENSANDO = 0
const ESPERANDO = 1
const COMENDO = 2

export function Filosofo(id) {
    let _this

    let _estado = PENSANDO
    let _garfos = []

    let _nome = 'f' + id
    let _estrategiaGarfo = id % 2
    let _tempoExecucao = Math.max(Math.random(), Math.random()) * 1_000 * 2
    let _chanceTroca = TROCAS_POR_MILISSEGUNDO * _tempoExecucao

    let _intervalId = 0
    let _ultimaAcao = null

    const _agir = () => {
        console.log(
            `${_nome}: ${['PENSANDO', 'ESPERANDO', 'COMENDO'][_estado]}` +
            (_estado !== PENSANDO
                ? ` (${_garfos.filter(g => g.proprietario === _this).map(g => g.id).join(', ')})`
                : '')
        )

        wait(_estado === PENSANDO ? _pensar : _comer).then()
    }

    const _pensar = () => Math.random() < _chanceTroca && (_estado = ESPERANDO)

    const _comer = () => {
        if (_estado === ESPERANDO)
            wait(_pegarGarfos).then()
        else if (_estado === COMENDO && Math.random() < _chanceTroca)
            wait(_pararDeComer).then()
    }

    const _pegarGarfos = () =>
        wait(() => _tentarPegarGarfo(_estrategiaGarfo))
            .then(possuiPrimeiroGarfo => _tentarPegarGarfo(+!_estrategiaGarfo) && possuiPrimeiroGarfo)
            .then(possueTodosOsGarfos => {
                if (possueTodosOsGarfos) _estado = COMENDO
            })
    const _tentarPegarGarfo = index => (_garfos[index].proprietario ??= _this) === _this

    const _pararDeComer = () => {
        _garfos.forEach(g => wait(() => g.proprietario = null))
        _estado = PENSANDO
    }

    return _this = {
        id,
        el: document.getElementById('f' + id),
        start() {
            stop()
            _intervalId = setInterval(() => {
                const acaoAtual = async () => await wait(_agir)
                const atualizeEExecuteAcao = () => (_ultimaAcao = acaoAtual())

                if (_ultimaAcao)
                    _ultimaAcao.then(atualizeEExecuteAcao)
                else atualizeEExecuteAcao().then()
            }, _tempoExecucao)
        },
        stop() {
            clearInterval(_intervalId)
        },
        setGarfos(garfo1, garfo2) {
            _garfos = [garfo1, garfo2]
        }
    }
}