const express = require('express')
const bodyParser = require('body-parser')
const db = require('./services/db')
const app = express()
const PORT = process.env.PORT || 3000

/*Set border parser*/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


/* Set Server */

app.listen(PORT , (err)=> {
    if(err) throw err;
    console.log(`API Running on PORT : ${PORT}`);   
})

/* Create Data */

app.post('/api/contact-create', (req,res) => {
    const data = {...req.body}
    const querySQL = 'INSERT INTO contacts SET ?'
    console.log(data);
    
    db.query(querySQL, data, (err, rows, field) =>{
        if (err) {
            return res.status(500),json({status_code : 500,msg : 'Failed insert into contacts', err: err})
        }
        res.status(200).json({status_code : 200,success : true ,msg : "Success insert into contacts"})
    })
})

/* Update Data */

app.put('/api/contact-update/:id', (req,res) => {
    const data = {...req.body}
    const queryFindById = 'SELECT * FROM contacts WHERE id = ?' 
    const queryUpdate = 'UPDATE  contacts SET ? WHERE id = ?'
    
    /*Query Find Data */
    db.query(queryFindById, req.params.id, (err, rows, field) => {
        if (err) {
            return res.status(500),json({status_code : 500,msg : 'Failed find data', err: err})
        }
        console.log(rows);
        // res.status(200).json({status_code : 200,success : true ,msg : "Successfully updated "})
    })
})