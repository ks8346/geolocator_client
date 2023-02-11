const Nominatim = require('nominatim-geocoder');
const geocoder = new Nominatim();
const xml2js = require('xml2js');
const fs = require('fs');
const pointInPolygon = require('geo-point-in-polygon');
const  tj  = require('togeojson');
const express = require('express');
DOMParser = require('xmldom').DOMParser;
 
let kml = new DOMParser().parseFromString(fs.readFileSync('./asset.kml', 'utf8'));


let point=[];
let kmlContent;
kmlContent=tj.kml(kml);



const router=express.Router();
router.get('/', async (req,res)=>{
    data = await geocoder.search({ q: req.query.location });
    // console.log(data[0]);
    if(!data[0]){
        return res.status(404).json(`${req.query.location} not found`);
    }
    
    const lat = data[0].lat;
    const lon = data[0].lon;
    point=[lon,lat];
    
    let Placemark=kmlContent.features;
    let name;
    for(i in Placemark){
        if(Placemark[i].geometry.type==="Polygon"){
            if(pointInPolygon(point,Placemark[i].geometry.coordinates[0])===true){
                return res.json({"name":name});
            }
        }
        else{
            name = Placemark[i].properties.name;
        }
    }
    return res.status(404).json(`${req.query.location} not found`);
});

module.exports=router;