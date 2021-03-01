
if (!window.indexedDB) {
    throw Error(`Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.`)
}

const DATABASE_NAME = 'VUE3-TODO-DATABASE'

export function createDatabase (): PromiseLike<IDBDatabase> {
    const request = window.indexedDB.open(DATABASE_NAME)

    return new Promise((resolve, reject) => {
        request.onerror = function (event) {
            reject(event)
        }

        request.onsuccess = function () {
            resolve(request.result)
        }
    })
}

export function createTransition (db: IDBDatabase, storeNames: string [] | string, option: IDBTransactionMode = 'readwrite'): IDBTransaction {
    console.log(storeNames, option)
    return db.transaction(storeNames, option)
}

function makeRequestPromise (request: IDBRequest): PromiseLike<object> {
    return new Promise <object> ((resolve, reject) => {
        request.onsuccess = resolve
        request.onerror = reject
    })
}

export class TransactionHandler {
    private transaction: IDBTransaction

    constructor (transaction: IDBTransaction) {
        this.transaction = transaction
    }

    async addItems (storeName: string, ...items: object[]) {
        const objectStore: IDBObjectStore = this.transaction.objectStore(storeName)

        for await (const item of items) {
            const request: IDBRequest = objectStore.add(item)
            await makeRequestPromise(request)
        }
    }

    getItems (storeName: string) {
        const objectStore: IDBObjectStore = this.transaction.objectStore(storeName)
        const request: IDBRequest = objectStore.get(storeName)

        return makeRequestPromise(request)
    }
}