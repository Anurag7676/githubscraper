const cheerio= require("cheerio");
const fs= require("fs");
const request = require("request");
const getissuesobj= require("./issue");

function processlink(url,topic)
{
    request(url, cb);

 function cb(err, response,linkhtml)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        openlink(linkhtml,topic);
    }
}
}

function openlink(linkhtml,topic)
{  //topic page opened extract the reposs
    let $= cheerio.load(linkhtml);
   
     let headarr= $(".f3.color-fg-muted.text-normal.lh-condensed");

     for(let i=0;i<8;i++)
     {
        // console.log($(headarr[i]).html())
    let twanchor= $(headarr[i]).find("a");
    let link= $(twanchor[1]).attr("href");
    let topicrepolink= `https://github.com${link}/issues`;
    let reponame= link.split("/").pop();
    getissuesobj.getissues(topicrepolink,topic,reponame);

     }
    
}

module.exports={
    processlink:processlink
}