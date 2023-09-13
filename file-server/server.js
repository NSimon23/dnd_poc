const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid').v4;
const app = express();

app.use(cors());

const dirPath = path.join(__dirname, 'public', 'uploads');

const getFileNames = () => {
    const files = fs.readdirSync(dirPath);
    let filesObjects = [];
    files.forEach((file) => {
        filesObjects.push({ name: file, id: uuid() });
    });
    console.log(filesObjects);
    return filesObjects;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, originalname);
    }
});

var upload = multer({ storage });

app.post('/upload', upload.array('file'), async (req, res) => {
    try {
        if (req.files) {
            res.send({
                status: true,
                message: 'File Uploaded!'
            });
            console.log(req.files);
        } else {
            res.status(400).send({
                status: false,
                data: 'File Not Found :('
            });
            console.log(req);
        }
    } catch (err) {
        res.status(500).send(err);
    }
    console.log(req.files);
});

app.get('/get', (req, res) => {
    const files = getFileNames();
    try {
        res.send(files);
        console.log('file sent');
    } catch (err) {
        res.status(500).send(err);
        console.log('error');
    }
});

app.listen(5000, () => console.log('Server Running...'));
