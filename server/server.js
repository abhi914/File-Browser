const express = require('express');
const bodyParse = require('body-parser');
const Path = require('path');
const fs = require('file-system');

const cwd = process.cwd();
const publicPath = Path.join(__dirname,"..","public");
// console.log(cwd);
const app = express();

app.use(express.static(cwd));
app.use(express.static(publicPath));



app.get('/', (req, res) => {
    res.redirect("./public/index.html");
});

app.get('/browse', (req,res) => {
      const list = fs.readdirSync(cwd);
});

app.get('/browse/:path', (req, res) => {
    const path = req.params.path;
    
    // console.log(path);
    fs.readDir(path, (list) => {
        console.log(list);
    });
});

app.post("/create/:file/:contentType", (req, res) => {
    const file = req.params.file;
    const contentType = req.params.contentType;
    // console.log(typeof contentType);
    // const stats = fs.statSync(file);
    if(contentType === 'folder')
    {
        try {
            fs.mkdirSync(file);
            res.send("Directory Created");
        }
        catch(error) {
            console.log(error);
        }        
    }
    else {
        try {
            fs.writeFileSync(file,'');
            res.send("File created");
        }
        catch(err) {
            console.log(err);
        }
    }
});

app.patch("/update/:oldFileName/:newFileName", (req, res) => {
    const oldFileName = req.params.oldFileName;
    const newFileName = req.params.newFileName;
    fs.rename(oldFileName, newFileName, () => {
        res.send("Name Changed");
    });

    // console.log(oldFileName, newFileName);
});

app.delete('/delete/:path', (req, res) => {
    const path = req.params.path;
    // console.log(typeof path);
    fs.unlink(path, () => {
        console.log("File Deleted");
    });
});

app.listen(3000, () => {
    console.log("Server started at port 3000");
});