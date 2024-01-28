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

/* Update Data*/

app.put('/api/contact-update/:id', (req,res) => {
    const data = {...req.body}
    const queryFindById = 'SELECT * FROM contacts WHERE id = ?' 
    const queryUpdate = 'UPDATE contacts SET ? WHERE id = ?'

    /*Query Find Data */
    db.query(queryFindById, req.params.id, (err, rows, field) => {

        /*Error Handling*/
        if (err) {
            return res.status(500),json({status_code : 500,msg : 'Failed find data', err: err})
        }
        if (rows.length) {

            const types = ['ID', 'SGP', 'MLY', 'TH', 'PH', 'VIET', 'MY', 'LS']

            if (!types.includes(data.type)) {
                return res.status(500).json({status_code : 500,msg : 'Type Not Found'})
            }
            /*Query Update Data*/
            
            db.query(queryUpdate, [data, req.params.id] , (err, rows, field) => {
                if (err) {
                    return res.status(500).json({status_code: 500, msg: 'Failed to update data', err: err});
                }
                res.status(200).json({status_code:200, success: true , msg: 'Success updating data', row: rows});
            })
        }else{
            return res.status(404).json({status_code: 404, msg : `Error updating data ${req.params.id} not found`})
        }
    })
})


/* Delete Data */

app.delete('/api/contact-delete', (req,res) => {

    const data = {...req.body}
    const queryFindById = 'SELECT * FROM contacts WHERE id = ?' 
    const queryDelete = 'DELETE FROM contacts WHERE id = ?'

    /*Query Find Data */
    db.query(queryFindById, req.body, (err, rows, field) => {

        /*Error Handling*/
        if (err) {
            return res.status(500),json({status_code : 500,msg : 'Failed find data', err: err})
        }
        if (rows.length) {
            /*Query Delete Data*/
            
            db.query(queryDelete, [data, req.body] , (err, rows, field) => {
                if (err) {
                    return res.status(500).json({status_code: 500, msg: 'Failed to delete data', err: err});
                }
                res.status(200).json({status_code:200, success: true , msg: 'Success delete data', row: rows});
            })
        }else{
            return res.status(404).json({status_code: 404, msg : `Error delete data ${req.body} not found`})
        }
    })
})

/*Get Data*/

app.get('/api/contact-get/:id', (req,res) => {

    // const data = {...req.body}

    const queryFindById = 'SELECT * FROM contacts WHERE id = ?' 

    /*Query Find Data */

    db.query(queryFindById, req.params.id , (err, rows, field) => {
        if (err) {
            return res.status(500).json({status_code: 500, msg: 'Failed to read data', err: err});
        }
        res.status(200).json({status_code:200, success: true , msg: 'Success reading data', row: rows});
    })
})