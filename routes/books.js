var express = require('express');
var router = express.Router();

const { readRecord, updateRecord, createRecord } = require('../operations/crudOperations')

//to createRecord

router.post('/create-Record', async (req, res, next) => {
    try {
        const data = req.body

        const result = await createRecord(data)
        
   
        res.json({
            "sucess": true,
            "message": "Record Created Sucessfully",
            "data": result 
        })
    } catch (e) {
        res.status(400).json({
            "sucess": false,
            "message": "failed to created book entry"
        })
        console.log(e)
    }

})

//readRecord

router.post('/read-Record', async (req, res, next) => {

    try {

        const data = req.body

        const result = await readRecord(data)

        res.json({
            "sucess": true,
            "message": " Record read sucessfull",
            
            "data": result
        }
        )
    } catch (e) {
        console.log(e)
        res.status(400).json({
            "sucess": false,
            "message": "Record not found",
        })
    }

})




//updateRecord
router.post('/update-Record', async (req, res, next) => {

    try {

        const data = req.body
        const result = await updateRecord(data)
        res.json({
            "sucess": true,
            "message": " Record read sucessfull",
            "data": {result}
        })
    } catch (e) {
        
        res.status(400).json({
            "sucess": false,
            "message": " Record read unsucessfull"

        })
    }

})


//deleteRecord

router.post('/delete-Record', async (req, res, next) => {
    try {

        const data = req.body
        // or data['status']=0
        const result = await updateRecord(data)

        res.json({
            "sucess": true,
            "message": "deleted successfully",//json formatting

            "data": { result }
        })
    } catch (e) {
        res.status(400).json({
            "sucess": false,
            "message": "delete unsuccessfully"
        })
    }
})

module.exports = router;
