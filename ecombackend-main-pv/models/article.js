const mongoose =require("mongoose")
const articleSchema=mongoose.Schema({
reference:{ type: String, required: true,unique:true },
designation:{ type: String, required: true,unique:true },
prix:{ type: Number, required: false },
marque:{ type: String, required: true },
qtestock:{ type: Number, required: false },
imageart:{ type: String, required: false },
scategorieID: {type:mongoose.Schema.Types.ObjectId,
ref:'Scategorie'},
depotID: [{
    pointsvente: { type: mongoose.Schema.Types.ObjectId, ref: 'Pointsvente' },
    qtes: { type: Number, required: false }
}]
})
module.exports=mongoose.model('Article',articleSchema)