const notes = require('./notes')
const chalk = require('chalk')
const yargs = require('yargs')

yargs.version('1.2.3')

yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes.',
    handler() {
        console.log(chalk.blue('Your notes...'))
        
        allNotes = notes.listNotes()

        allNotes.forEach(note => {
            console.log()
            console.log(chalk.blue.inverse(note.title))
            console.log(chalk.blue(note.body))
        });
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const note = notes.readNote(argv.title)

        if (note) {
            console.log(chalk.blue.inverse(note.title))
            console.log(chalk.blue(note.body))
        } else {
            console.log(chalk.red('Note not found.'))
        }
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.parse()

// const fs = require('fs')

// fs.writeFileSync('note.txt', 'This file was created bu Node.js! :)')
// fs.appendFileSync('note.txt', 'Second line appended...')

// const add = require('./utils')

// console.log(add)
// console.log(add(1,2))

// const validator = require('validator')
// const getNotes = require('./notes')
// console.log(getNotes())
// console.log(validator.isEmail('dd@gmail.com'))

// import validator from 'validator'
// console.log(validator.isEmail('dd@gmail.com'))

// const getNotes = require('./notes')
// const chalk = require('chalk')

// const msg = getNotes()
// console.log(msg)
// console.log(chalk.blue.bold.inverse('Success!'))
// console.log(process.argv)

// const command = process.argv[2]

// if (command === 'add') {
//     console.log('Adding a note')
// } else if (command === 'remove') {
//     console.log('Removing a note')
// }