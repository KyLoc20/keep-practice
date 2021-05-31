import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// uuidv4(); 
class NoteManager {
    constructor(props) {
        this.props = props
        this.collection = []
    }
    static getInstance(props) {
        if (!this.instance) {
            this.instance = new NoteManager(props)
        } else {
            console.warn('From class of NoteManager: there is already an instance existing!')
        }
        return this.instance
    }
    add(content, color, labels) {
        let note = new Note(content, color, labels)
        this.collection.push(note)
        console.log('add', note.content)
    }
    renderNotes() {
        const arr = []
        for (let note of this.collection) {
            arr.push(note.obj)
        }
        return arr
    }
}
class Note {
    constructor(content, color, labels) {
        this._id = uuidv4()
        this._content = content
        this._color = color || 'default'
        this._labels = labels || []
    }
    get obj() {
        return { id: this._id, content: this._content, color: this._color, labels: this._labels, }
    }
    get id() {
        return this._id
    }
    get content() {
        return this._content
    }
    get color() {
        return this._color
    }
    get labels() {
        return this._labels
    }
}
export { NoteManager, Note }