export default class LocalStorageStorage<T extends { id: number }> {


    private _lasId = 0;
    private _storageName = "";

    constructor(storageName: string) {
        this._storageName = storageName;

        if (localStorage.getItem(this._storageName) === null) {
            localStorage.setItem(this._storageName, JSON.stringify([]));
        } else {
            let maxId = 0;

            for (let plane of this.getAll()) {
                maxId = Math.max(maxId, plane.id)
            }
            this._lasId = maxId + 1;
        }
    }

    get(id: number): T | null {
        let plane = this.getAll().find(x => x.id === id);

        if (plane === undefined) {
            return null;
        }

        return plane;
    }

    getAll(): T[] {
        let item = localStorage.getItem(this._storageName);

        if (item === null) {
            return [];
        }

        return JSON.parse(item);
    }

    remove(id: number): void {
        let planes = this.getAll();
        let index = planes.findIndex(x => x.id === id);

        if (index > -1) {
            planes.splice(index, 1);
            localStorage.setItem(this._storageName, JSON.stringify(planes));
        }

    }

    update(id: number, data: T): T {
        let planes = this.getAll();
        let index = planes.findIndex(x => x.id === id);
        data.id = id;

        if (index > -1) {
            planes[index] = data;
            console.log("afted edit", index, planes[index], planes);
            localStorage.setItem(this._storageName, JSON.stringify(planes));
        }

        return data;
    }

    create(data: T): T {
        let planes = this.getAll();

        data.id = this._lasId++;
        planes.push(data);

        localStorage.setItem(this._storageName, JSON.stringify(planes));
        return data;
    }
}