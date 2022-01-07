const util = require('util');
const fs = require('fs');

// Using this package to generate ids for note //
const {v4:uuidv4} = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

  
      // Creating an empty array if notes isnt one already //
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("'text' and 'title' can not be empty");
    }

    // Add an id to the note //
    const newNote = { title, text, id: uuidv4() };

    // Getting all the notes, adding new, updating and  returning the new one //
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    // Getting all the notes, remove the note with the specific id, getting the filtered notes //
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}
// Exporting a module //
module.exports = new Store();