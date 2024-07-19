const fs = require('node:fs');
const fsAsync = require('node:fs/promises');


// How to create a file
function createFileCB() {
    fs.appendFile('test.txt', 'Hey im a text', (err) => {
        if (err) console.log("Error creating file", err)
        else console.log("Success creating file")
    })
}

async function createFileAsync(data) {
    const response = fsAsync.appendFile("./files/test.txt", data);
    return response;
}

function readFileSync() {
    fs.readFile('test.txt', (err, data) => {
        if (err) console.log(err)
        if (data) console.log(data.toString())
    })
}

function readAllFilesFromDir() {
    fs.readdir("./files", (err, files) => {
        if (err) console.log(err)
        if (files) console.log(files)
    });
}

module.exports = {
    createFileCB,
    createFileAsync,
    readFileSync,
    readAllFilesFromDir
};