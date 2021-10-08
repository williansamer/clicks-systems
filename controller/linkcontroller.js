const Link = require("../model/Link");



const redirect = async (req, res, next)=>{
    let name = req.params.name;
    if(!name){
        name = req.body.name;}

    try {
        let user = await Link.findOneAndUpdate({name}, {$inc: {clicks: 1}});
        if(user){
            res.redirect(user.url)
        } else{
            next();
        }
    } 
    catch (error) {
        res.send(error);
    }
}

const main = async(req,res)=>{
    let docs = await Link.find({});
    try {
        res.render("index", {error: false, docs})
    } 
    catch (error) {
        res.send(error);
    }
}

const loadAdd = (req, res)=>{
    try {
        res.render("add", {error: false, body: {}})
    } 
    catch (error) {
        res.send(error);
    }
}

const addLink = async (req, res)=>{
    let users = new Link(req.body);

    try {
        let doc = await users.save();
        res.redirect("/");
    } 
    catch (error) {
        res.render("add", {error, body: req.body});
    }
}

const loadEditLink = async (req, res)=>{
    let id = req.params.id;
    if(!id){
        id = req.body.id;
    }

    try {
        let doc = await Link.findById(id);
        res.render("edit", {error: false, body: doc});
    } 
    catch (error) {
        res.send(error);
    }
}

const editingLink = async (req, res)=>{
    const users = {};
    users.name = req.body.name;
    users.sn = req.body.sn;
    users.url = req.body.url;

    let id = req.params.id;

    try {
        let doc = await Link.findByIdAndUpdate(id, users); //PRESTAR ATENÇÃO DO >>>>AWAIT<<<<<
        res.redirect("/");
    } 
    catch (error) {
        res.render("edit", {error: true, body: req.body});
    }
}

const deleteLink = async (req, res)=>{
    let id = req.params.id;
    if(!id){
        id = req.body.id;
    }

    try {
        await Link.findByIdAndDelete(id);
        res.redirect("/");
    } 
    catch (error) {
        res.status(404).send(error);
    }
}

module.exports = {redirect, main, loadAdd, loadEditLink, addLink, editingLink, deleteLink};