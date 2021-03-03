//  reference: https://developer.mozilla.org/ko/docs/Web/API/IndexedDB_API/Using_IndexedDB
//  공부해야할게 많구만 🙄

if (!window.indexedDB) {
    throw Error(`Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.`)
}

const DATABASE_NAME = 'VUE3-TODO-DATABASE-3'

export function createDatabase (): PromiseLike<IDBDatabase> {
    const request = window.indexedDB.open(DATABASE_NAME)

    return new Promise((resolve, reject) => {
        request.onerror = function (event) {
            reject(event)
        }

        request.onsuccess = function () {
            console.log('onsuccess')
            const db: IDBDatabase = request.result
            resolve(db)
        }

        request.onupgradeneeded = function () {
            console.log('onupgradeneeded')
            const db: IDBDatabase = request.result
            const store: IDBObjectStore = db.createObjectStore('todos', {
                keyPath: 'id'
            })

            store.createIndex('id', 'id', { unique: true })
        }
    })
}

export class DbHandler {
    private db: IDBDatabase;
    private storeName: string;

    constructor (db: IDBDatabase, storeName: string) {
        this.db = db
        this.storeName = storeName
    }

    addItem (item: object) {
        const { db, storeName } = this
        const objectStore: IDBObjectStore = db.transaction(storeName, 'readwrite').objectStore(storeName)
        const request = objectStore.add(item)

        return new Promise <IDBValidKey> ((resolve, reject) => {
            request.onsuccess = function () {
                const result = request.result
                resolve(result)
            }

            request.onerror = function (event) {
                reject(event)
            }
        })
    }

    getItems () {
        const { db, storeName } = this
        const objectStore: IDBObjectStore = db.transaction(storeName).objectStore(storeName)
        const request: IDBRequest = objectStore.getAll()

        return new Promise <object> ((resolve, reject) => {
            request.onsuccess = function () {
                const result = request.result
                resolve(result)
            }

            request.onerror = function (event) {
                reject(event)
            }
        })
    }
}
