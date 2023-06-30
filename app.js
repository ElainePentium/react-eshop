require("dotenv").config();

var path = require('path');

const express = require("express");
const connection = require('./database/connection');
const serverPort = process.env.APP_PORT; // || 8000;

// init the express app
const app = express();
app.use(express.json());
const pathToFile = path.join(__dirname, 'client/build')
app.use(express.static(pathToFile))

// define the index route
app.get('/', (req, res) => {
    res.sendFile(path.join(pathToFile, 'index.html'))
    console.log('A new request just hit the API !');
    res.send('Hello dear API client :)');
});

app.get('/cart', (req, res) => {
    console.log('get cart')
    connection.query(`SELECT productList FROM cart;`, (err, results, fields) => {
        if(!err){
            res.status(200).send(results[0].productList)
            console.log('prodList', results[0].productList)
        }
        else {
            res.status(500).send('Error getting cart from db.');
        }
    });

    // connection.promise()
    //     .query('SELECT productList FROM cart;')
    //     .then(([results]) => {
    //         res.json(results);
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //         res.status(500).send('Error retrieving products from db.');
    //     });
})

app.post('/cart', (req, res) => {
    console.log('post cart')
    const { productList } = req.body;
    console.log('productList', productList)
    console.log('productList type', typeof(productList))
    connection.query(`TRUNCATE cart;`, (err, results, fields) => {
        if(!err){
            console.log("truncate ✅");
        }
        else {
            res.status(500).send('Error truncating cart.');
        }
    });
    connection.query(`
        INSERT INTO cart (productList) VALUES (?);`,
         [productList], (err, results, fields) => {
        if(!err){
            console.log("insert into ✅");
        }
        else {
            res.status(500).send('Error creating cart into db.');
        }
    });
})




app.listen(serverPort, (err) => {
    if (err) {
      console.error('Something bad happened');
    } else {
      console.log(`Server is listening on ${serverPort}`);
    }
  });

