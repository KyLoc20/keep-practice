class NoteManager {
    constructor(props) {
        this.props = props
    }
    static getInstance(props) {
        if (!this.instance) {
            this.instance = new NoteManager(props)
        } else {
            console.warn('From class of NoteManager: there is already an instance existing!')
        }
        return this.instance
    }
}
class Note {
    constructor(content, color, labels) {
        this._content = content
        this._color = color
        this._labels = labels
    }
    get obj() {
        return { content: this._content, color: this._color, labels: this._labels, }
    }
}
export { NoteManager, Note }