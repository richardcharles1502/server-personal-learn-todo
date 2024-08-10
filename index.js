const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

// Enable CORS for all routes
app.use(cors());

app.listen(port, () => {
     console.log(`Server running in port ${port}`)
})

app.get('/', (req, res) => {
     res.send('working !!!')
})

app.get('/api/readfolder', (req, res) => {
      const dir = path.join(__dirname,'/json');
      fs.readdir(dir, (err, files) => {
         if(err) {
             return res.status(500).send('Error found: '+err)
         }
         res.status(200).json(files)
      })
})

app.get('/api/readfile', (req, res) => {
     let filename = req.query.file
     const dir    = path.join(__dirname,'/json/'+filename);
     fs.readFile(dir, (err, filedata) => {
        if(err) {
            return res.status(500).send('Error found: '+err)
        }
        if(filedata.length === 0){
          return res.status(500).send('File is empty')
        }
        res.status(200).json(JSON.parse(filedata))
     })
})
