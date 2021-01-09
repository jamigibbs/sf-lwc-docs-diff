const fs = require('fs');
const path = require('path');
const { directories } = require('./paths')

directories.forEach((dirName) => {
  const dir = path.join(__dirname, `/./docs/${dirName}/`);
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
})
