import { v4 as uuidv4 } from 'uuid';
import { dumpToLocalStorage, loadFromLocalStorage } from '../utils/storage'
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// uuidv4(); 
class NoteManager {
    constructor(props) {
        this.props = props
        this.collection = this.loadNotes() //list
        this.table = {} //map
    }
    static getInstance(props) {
        if (!this.instance) {
            this.instance = new NoteManager(props)
        } else {
            console.warn('From class of NoteManager: there is already an instance existing!')
        }
        return this.instance
    }
    index(id) {
        //to get a note's index in the collection by id
        for (let [index, item] of this.collection.entries())
            if (item.id && item.id === id) return index
        return -1
    }
    find(id) {
        //to find a note in the collection by id
        const index = this.index(id)
        if (index > -1) return this.collection[index]
        else null
    }
    add(content, color, labels) {
        let note = new Note(content, color, labels)
        this.collection.push(note)
        this.saveNotes()
        console.log('add', note.content)
    }
    delete(id) {
        //to delete a note by id
        const indexToDelete = this.index(id)
        if (indexToDelete > -1) {
            this.collection.splice(indexToDelete, 1)
            console.log('Successfully delete the note of id: ', id)
        } else console.warn('Failed to delete the note of id: ', id)
    }
    deleteByKey(key, value, all) {
        let deletedIndex = -1
            //todo reverse delete all items satisfied, for now only delete the first satisfied item
        if (all) return deletedIndex
        for (let [index, item] of this.collection.entries()) {
            if (item[key] && item[key] === value) {
                this.collection.splice(index, 1)
                deletedIndex = index
                break
            }
        }
        this.saveNotes()
        return deletedIndex
    }
    updateLabels(id, name, selected) {
        //delete a note's labels by id once a label
        const index = this.find(id)
        if (index < 0) return
        const oldNote = this.collection[index]
        const oldLabels = oldNote.labels
        let updatedLabels = []
        if (!selected) {
            //unselect
            updatedLabels = oldLabels.filter((label) => label !== name)
        } else {
            //select
            updatedLabels = [...oldLabels]
                //already exist do nothing
            if (oldLabels.indexOf(name) > -1);
            else updatedLabels.push(name)
        }
        const newNote = new Note(oldNote.content, oldNote.color, updatedLabels, oldNote.id)
        this.collection.splice(index, 1, newNote)
            //todo performance
        this.saveNotes()
    }
    deleteByIndex(index) {
        this.collection.splice(index, 1)
        this.saveNotes()
    }
    updateLabelsByIndex(index, name, selected) {
        let oldLabels = this.collection[index].labels
        let updatedLabels = []
        if (!selected) {
            //unselect
            for (let label of oldLabels) {
                if (label === name); //skip to remove it
                else updatedLabels.push(label)
            }
        } else {
            //select
            updatedLabels = [...oldLabels]
                //already exist do nothing
            if (oldLabels.indexOf(name) > -1);
            else updatedLabels.push(name)
        }
        let oldNote = this.collection[index]
        let newNote = new Note(oldNote.content, oldNote.color, updatedLabels, oldNote.id)
        this.collection.splice(index, 1, newNote)
            //todo performance
        this.saveNotes()
    }

    saveNotes() {
        const notesJSON = this.collection.map((item) => { return { content: item.content, color: item.color, labels: item.labels, id: item.id, } });
        dumpToLocalStorage('notes', notesJSON)
        console.log("saveNotesFromLocalStorage", notesJSON);
    }
    loadNotes() {
        const notesJSON = loadFromLocalStorage('notes')
        if (notesJSON && Array.isArray(notesJSON)) {
            console.log("loadNotesFromLocalStorage", notesJSON);
            const Notes = []
            for (let item of notesJSON) {
                Notes.push(new Note(item.content, item.color, item.labels, item.id))
            }
            return Notes;
        } else {
            return [];
        }
    }
    renderNotesToArray() {
        return this.collection.map((note) => note.obj)
    }
}
class Note {
    constructor(content, color, labels, id) {
        this._id = id || uuidv4()
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