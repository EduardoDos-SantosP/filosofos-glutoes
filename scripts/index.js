import { Jantar } from "./jantar.js";
import { Filosofo } from "./filosofo.js";
import { Garfo } from "./garfo.js";

addEventListener('load', () => {
    const jantar = new Jantar()

    for (let i = 0; i < 5; i++)
        jantar.add(new Filosofo(i), new Garfo(i))

    for (const action of ['start', 'stop'])
        document.getElementById(action).addEventListener('click', () => jantar[action]())
})