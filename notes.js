const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    return loadNotes()
}

const readNote = (title) => {
    const notes = loadNotes()

    return notes.find(note => note.title === title)
}

const addNote = (title, body) => {
    const notes = loadNotes()

    // debugger 

    const duplicateNote = notes.find(note => note.title === title)
    if (duplicateNote) {
        console.log(chalk.red.bold('Note title duplicated.'))
        return 
    }

    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)

    console.log(chalk.green.inverse(' New Note added.'))
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title != title)

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Removed note: ') + chalk.green.inverse(title))
    } else {
        console.log(chalk.red.bold('No note found.'))
    }

}

const saveNotes = (notes) => {
    const notesJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJson)
}

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync('notes.json')
        const notesJson = notesBuffer.toString()
        return JSON.parse(notesJson)
    } catch (e) {
        return []
    }
}

module.exports = {
    listNotes: listNotes,
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote
}