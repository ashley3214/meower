const express= require('express');
const cors= require('cors')
const monk= require('monk')



const app= express();

const db=monk('localhost/meower')
const mews=db.get('mews')

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        message: 'Meower! 😸 sup'
    });

});
 const isValidMew=(mew)=>{
     return mew.name && mew.name.toString().trim() !== '' &&
     mew.content && mew.content.toString().trim() !== '' 
 }
app.post('/mews',(req,res)=>{
    if(isValidMew(req.body)){
        const mew={
            name: req.body.name.toString(),
            content: req.body.content.toString()
        };
        mews
        .insert(mew)
        .then()
    } else{
        res. status(422)
        res.json({
            message: 'hey! name and content are required '
        })
    }

})

app.listen(5000, ()=>{
    console.log('Lisenting on http://localhost:5000')
})
