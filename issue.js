const cheerio= require("cheerio");
const fs= require("fs");
const path = require("path");
const request = require("request");
const pdfkit= require("pdfkit");

function getissues(topicrepolink,topic,reponame)
{
      request(topicrepolink, cb);

 function cb(err, response,repohtml)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        issuefeeder(repohtml,topic,reponame);
    }
}
}

function issuefeeder(repohtml,topic,reponame)
{
    let $= cheerio.load(repohtml);
    let issueelearray= $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let issue= [];
    console.log(`-----${topic}---------------->>>>>>${reponame}------------------------`);
    for(let i=0;i<issueelearray.length;i++)
    {
        let issuelink= $(issueelearray[i]).attr("href");
       
        issue.push(issuelink)
    }
    
    let folderpath=path.join(__dirname,topic);

    dircreater(folderpath)
    let filepath= path.join(folderpath,reponame+".pdf");
    let text= JSON.stringify(issue);
    let pdfDoc= new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filepath));
    pdfDoc.text(text);
    pdfDoc.end();


    // fs.writeFileSync(filepath,JSON.stringify(issue));
}

function dircreater(folderpath)
{
    if(fs.existsSync(folderpath)==false)
    {
        fs.mkdirSync(folderpath);
    }
}

module.exports={
    getissues:getissues
}