export const wait = (callback, time = 0) => new Promise((resolve, reject) =>
    setTimeout(() => {
        try {
            resolve(callback())
        } catch (e) {
            reject(e)
        }
    }, time)
)