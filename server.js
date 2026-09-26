const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express(); //express app banano hosse, express library k call dibe


const upload =multer ({
    storage : multer.diskStorage({
    destination : 'uploads/',
    filename: (req,file,cb)=>{
        cb (null, file.originalname);
    }
}),
});
app.use(express.json()); //middleware jate frontend theke post , put , patch theke pathano json data server e receive kore pora jai

app.post('/upload', upload.single('file'), (req, res) => {//upload.single('file')- middleware, ekta file ashbe , key and value match korte hobe
    /*if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
   }*/
   res.status(200).json({ message: 'File uploaded successfully' });
   });
app.get('/',(req,res)=> {// amader brower jekono "GET" request execute korte pare, tai eta frontend cara colse
    // data read operation
    res.send('Hello,World!'); //frontend theke get request pathale server e response hisebe Hello, World! send korbe
});

app.post ('/book',(req,res) =>{
    const book =req.body;
    console.log(book);
    // database save operation
    //res.send('Book recieved');
    res.status(201).send({message:'Book created successfully',book :book});// 201: prottekta respose er sathe ekta kore status code ashte pare, jei status pore bujha jai
});
/*201 = post api successful,
200 = get api sucessful
404= jeiapi k hit korte ceyese setake hit korte na parle
500= backend e kono error korle
401= login na korle*/

app.get('/book',(req,res) =>{
    // database read operation
    res.status(200).send({
        message: 'Book retrived successfully',// []=array, means a lot of books
        books:[
            {
                id:1,
                title :'Book 1',
                author :'Author 1'

            },    
            {
                id : 2,
                title : 'Book 2',
                author : 'Author 2'
            }
        ]
    });        
});
 app.get('/book/:id',(req,res)=>{
    const bookId= req.params.id;
    res.status(200).send({message: 'Book retrived successfully',books:{
        id: bookId,
        title: `Book ${bookId}`,
        author: `Author${bookId}`,

 }});
        

 });
app.patch('/book/:id',(req, res)=>{
    const bookId =req.params.id;
    const updateData=req.body;
    console.log(updateData);
    // database update operation
    res.status(200).send({message:'Book update successfully',book:{
        id : bookId,
        ...updateData,
    }});
});

app.delete('/book/:id',(req,res)=>{
    const bookId =req.params.id;
    //database delete operation
    res.status(200).send({message: 'Book deleted successfully', bookId});
});
  


app.listen(4000,() => {
    console.log('Server is running on port 4000'); //server 4000 port e run korbe
}); 