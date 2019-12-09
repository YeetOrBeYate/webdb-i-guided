const express = require('express');

// database access using knex
const knex = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    //select * from posts
    knex.select('*').from('posts')
    .then((posts)=>{
       
        res.status(201).json({posts})
    })
    .catch((err)=>{
        
        res.status(500).json({err})
    })
});

router.get('/:id', (req, res) => {
    const yeet = req.params.id;
    //select * from posts where id = req.params.id
    knex
    .select('*')
    .from('posts')
    .where('id', yeet)
    // without .first it returns an array
    .first()
    .then((post)=>{
        res.status(200).json({post})
    })
    .catch((err)=>{
        res.status(500).json({err})
    })

});

router.post('/', (req, res) => {

    //second argument id will show a warning on console. All it does is just returns the last ID added to the db

    const postData = req.body;

    knex('posts')
    .insert(postData, "id")
    .then((ids)=>{

       const yeet = ids[0]
       //need the return since its another database call
       return knex('posts')
        .select("*")
        .where("id",yeet)
        .first()
        .then((post)=>{
            res.status(200).json({post})
        })
    })
    .catch((err)=>{
        res.status(500).json({err})
    })

});

router.put('/:id', (req, res) => {

    const id = req.params.id;
    const changes = req.body;

    knex('posts')
    .where("id", id)
    .update(changes)
    .then(count=>{
        if(count > 0){
            res.status(200).json({count})
        }else{
            res.status(404).json({message: "couldn't fine that record by id"})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({err})
    })

});

router.delete('/:id', (req, res) => {

});

module.exports = router;