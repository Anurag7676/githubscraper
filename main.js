const cheerio= require("cheerio");
const { link } = require("fs");
const request = require("request");
const alllinksrequest = require("./alllinksrequest");
const url ="https://github.com/topics";

request(url, cb);

function cb(err, response,html)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        getalllink(html);
    }
}
function getalllink(html)
{
    let $= cheerio.load(html);
    let listarr= $(".col-12.col-sm-6.col-md-4.mb-4")
    
    for(let i=0;i<listarr.length;i++)
    {
        let links= $(listarr[i]).find("a").attr("href");
        
        let final_link= "https://github.com"+links;
         let topic= links.split("/");
          topic= topic[2];
       alllinksrequest.processlink(final_link,topic);
    }  
    
}

