const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const writeStream  =  fs.createWriteStream('movie.csv');

writeStream.write('Title,Year,Rating\n');

request('https://www.imdb.com/search/title?groups=top_250&sort=user_rating',(error, response, html)=>{
    if(!error && response.statusCode == 200){
      const $ =   cheerio.load(html);
        $('.lister-item').each((i,el)=>{
            const movieTitle = $(el).find('.lister-item-header').find('a').text().trim();
            const movieYear = $(el).find('.lister-item-header').find('.lister-item-year').text().replace( /[()]/g, '' ); 
            const movieRating = $(el).find('.ratings-bar').find('.ratings-imdb-rating').text().trim();  

            writeStream.write(`${movieTitle},${movieYear},${movieRating} \n`);
            

        });
        console.log('scraping completed');
    }
});
