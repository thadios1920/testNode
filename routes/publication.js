const express = require('express')
const router = express.Router()
const fs = require('fs')


const posts = []


router.get('/', (req, res)=> {    
    res.render('posts',{"posts":posts,"date":new Date().toISOString()});
});
router.get('/ajouter',(req,res)=>{
    res.render('add');
})


router.get('/getAll',(req,res)=>{

    if (posts.length>0) {
        res.send(posts).status(200)
    }else
    {
        res.send(404)
    }
})


router.get('/exportAll',(req,res)=>{


    data = ''
    for (let index = 0; index < posts.length; index++) {
        data = data + "titre:"+ posts[index].titre+"- contenue:"+ posts[index].continue+"- auteur:"+ posts[index].nomAuteur+"\n"
    }

    fs.writeFileSync('file.txt',data)
    res.send(200)
})


router.post('/add',(req,res)=>{

    let post = {
        id:posts.length,
        titre:req.body.titre,
        continue:req.body.continue,
        nomAuteur:req.body.nomAuteur,
        prenomAuteur:req.body.prenomAuteur,
        date:new Date().getMonth()+"/"+new Date().getDay()+"/"+new Date().getFullYear()
    }
console.log(post);

    try {
        posts.push(post)
        res.send(post).status(200)
    } catch (error) {
        console.log(error);
    }
})

router.put('/edit/:id',(req,res)=>{

    // let post = posts.find(id=> id == req.params.id)
    let post = {
        titre:req.body.titre,
        continue:req.body.continue,
        date:new Date().getFullYear(),
    }

    for (let index = 0; index < posts.length; index++) {
        if (posts[index].id == req.params.id ) {

            posts[index].titre = post.titre
            posts[index].continue = post.continue

            res.send(posts[index]).status(200)
        }
        
    }
    return res.status(404)
    
})

router.delete('/delete/:id',(req,res)=>{
    for (let index = 0; index < posts.length; index++) {
        if (posts[index].id == req.params.id ) {

            posts[index] = null

            res.send(posts[index]).status(200)
        }
    }
})




module.exports = router