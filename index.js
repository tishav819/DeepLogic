const https = require('https');
const http = require('http');

function gettimeStories(datacall)
{
    https.get('https://time.com/', (res) => {
        data = ""
        
        res.on('data', (data_) => {
            data+=data_;
        });

        var items =[]

        res.on('end', ()=>{
            var AllItemsoftimes = data.split('<div class="partial latest-stories" data-module_name="Latest Stories">')[1];
            var itemsRawdata = AllItemsoftimes.split('<li class="latest-stories__item">')  // getting the data from times now

                        
            itemsRawdata.splice(0,1)
            
            itemsRawdata.forEach(element => {
                link = 'https://time.com/'+element.split('<a href="')[1].split('/">')[0] // getting link
                title = element.split('<h3 class="latest-stories__item-headline">')[1].split('</h3>')[0]   // getting the title by splitting from h3
                items.push({title,link})  // making a list for title and link
                
            }); // practice
        
            datacall(items);
            
        });

    }).on('error', (err) => {
        console.error(err);
    });

    
}


http.createServer(function (req, res) {
    
  
    

    if(req.url.toLowerCase()=="/gettimestories") // setting URL
    {
        res.writeHead(200, {'Content-Type': 'application/json'});
        gettimeStories((items)=>{
        
                
            res.write(JSON.stringify(items))
            res.end();
            console.log(items)
        })
    }
    else{
        res.write('This is home. Please go to http://localhost:8000/getTimeStories');
        res.end();
    }
}).listen(8000);  // creating server


