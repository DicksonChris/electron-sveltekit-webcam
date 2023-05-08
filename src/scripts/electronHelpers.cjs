// helpers.js
const fs = require('fs')

// define and export helper functions
exports.deleteFile = function (filepath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filepath, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

exports.deleteFolder = function (folderpath) {
  return new Promise((resolve, reject) => {
    fs.rmdir(folderpath, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

exports.readFolder = function (folderpath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderpath, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}