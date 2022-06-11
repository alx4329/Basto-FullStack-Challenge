const router = require('express').Router();
const Cow = require('../models/cow');
router.get('/',async (req, res) => {
    try{
        const cows = await Cow.find({});
        res.send(cows);
    }catch(e){
        console.log(e);
    }
    
});

router.post('/', async(req,res)=>{
    try{
        const {id_senasa, type, weight, paddockName, deviceType, deviceNumber} = req.body;
        const alreadyExists = await Cow.findOne({id_senasa});
        if(alreadyExists){
            res.status(400).send({error: 'Cow already exists'});
        }else if(!id_senasa || !type || !weight || !paddockName || !deviceType || !deviceNumber){
            res.status(400).send({error:'Bad Request'});
        }else{
            const cow = await Cow.create({
                id_senasa,
                type,
                weight,
                paddockName,
                deviceType,
                deviceNumber
            });
            res.send(cow);

        }
    }catch(e){
        console.log(e);
        res.status(500).send({error:e});
    }
})

router.put('/', async(req,res)=>{
    try{
        const {id_senasa, type, weight, paddockName, deviceType, deviceNumber} = req.body;
        const alreadyExists = await Cow.findOne({id_senasa});
        if(alreadyExists){
            const updatedCow = await Cow.findOneAndUpdate({id_senasa}, {
                $set:{
                    id_senasa,
                    type,
                    weight,
                    paddockName,
                    deviceType,
                    deviceNumber
                }
            }, {new:true});
            res.send(updatedCow);
        } else {
            res.status(400).send({error:'Cow not found'});
        }
    }catch(e){
        console.log(e);
        res.status(500).send({error:e});
    }
})
router.delete('/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const deletedCow = await Cow.findOneAndDelete({id_senasa:id});
        if(deletedCow){
            res.send(deletedCow);
        }else{
            res.status(400).send({error:'Cow not found'});
        }
    }catch(e){
        console.log(e);
        res.status(500).send({error:e});
    }
})


module.exports = router;