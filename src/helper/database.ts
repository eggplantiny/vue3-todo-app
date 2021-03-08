//  reference: https://developer.mozilla.org/ko/docs/Web/API/IndexedDB_API/Using_IndexedDB
//  공부해야할게 많구만 🙄

if (!window.indexedDB) {
    throw Error(`Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.`)
}

const DATABASE_NAME = 'VUE3-TODO-DATABASE-4'

export function createDatabase (): Promise<IDBDatabase> {
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

export class DbSingleton {
    private static instance: DbSingleton | null = null;
    private db: IDBDatabase | null = null;

    private constructor () {
        this.db = null
    }

    public static getInstance (): DbSingleton {
        if (this.instance === null) {
            this.instance = new DbSingleton()
        }

        return this.instance
    }

    public async initialize (): Promise <null> {
        this.db = await createDatabase()
        return null
    }

    public addItem <T> (storeName: string, item: T): Promise<IDBValidKey> {
        const { db } = this

        if (db === null) {
            throw new Error('You have to initialize indexed database')
        }

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

    getAllItems <T> (storeName: string): Promise <T[]> {
        const { db } = this

        if (db === null) {
            throw new Error('You have to initialize indexed database')
        }

        const objectStore: IDBObjectStore = db.transaction(storeName).objectStore(storeName)
        const request: IDBRequest = objectStore.getAll()

        return new Promise <T[]> ((resolve, reject) => {
            request.onsuccess = function () {
                const result = request.result
                resolve(result)
            }

            request.onerror = function (event) {
                reject(event)
            }
        })
    }

    getItem <T> (storeName: string, key: IDBValidKey): Promise <T> {
        const { db } = this

        if (db === null) {
            throw new Error('You have to initialize indexed database')
        }

        const objectStore: IDBObjectStore = db.transaction(storeName).objectStore(storeName)
        const request: IDBRequest = objectStore.get(key)

        return new Promise <T> ((resolve, reject) => {
            request.onsuccess = function () {
                const result = request.result
                resolve(result)
            }

            request.onerror = function (event) {
                reject(event)
            }
        })
    }

    deleteItem (storeName: string, key: IDBValidKey): Promise <null> {
        const { db } = this

        if (db === null) {
            throw new Error('You have to initialize indexed database')
        }

        const objectStore: IDBObjectStore = db.transaction(storeName, 'readwrite').objectStore(storeName)
        const request: IDBRequest = objectStore.delete(key)

        return new Promise <null> ((resolve, reject) => {
            request.onsuccess = function () {
                resolve(null)
            }

            request.onerror = function (event) {
                reject(event)
            }
        })
    }

    updateItem <T> (storeName: string, key: IDBValidKey, item: T): Promise <IDBValidKey> {
        console.log('fucking', item)
        const { db } = this

        if (db === null) {
            throw new Error('You have to initialize indexed database')
        }

        const objectStore: IDBObjectStore = db.transaction(storeName, 'readwrite').objectStore(storeName)
        const request: IDBRequest = objectStore.put(item)

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
}
