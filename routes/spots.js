var express = require('express');
var mysql = require('mysql');
var fs = require("fs"); // fs - file system

var router = express.Router();

/* DB: "parking" connection settings. */
const pool = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'parking',
  timezone: '+00:00'  //set to "neutral".
});

/* JSON: GET spots listing. */
router.get('/', function(req, res, next) {
  res.send('Respond with a resource of JSON data.');
});

// DB: POST (GET /READ) entire "spots" listed.  http://localhost:3000/get
// Takes into consideration the search inputs too.
router.post('/', function(req, res, next) {  // Route '/' changed to '/s' as a hack to make demo JSON GET to work.
  const city = req.body.city;
  const area = req.body.area;
  const address = req.body.address;
  const personId = req.body.personId;
  // internal queries, for sql.
  const cityQ = city ? ` AND city LIKE "${city}%"` : ``;
  const areaQ = area ? ` AND area LIKE "${area}%"` : ``;
  const addressQ = address ? ` AND address LIKE "%${address}%"` : ``;
  
  pool.getConnection((err, connection) => {
    /* Select those records from the "spots" table whose "id" value
     * has no reference records in the "reservations" table 
     * where those records' "ending" variable IS NULL (has no value),
     * and --^^--IF either a "city" or "area" column is asked 
     * include those records that have the asked values in them--^^--,
     * AND arrange the result of all this so that the 
     * "address" values will be in alphanumerical ASCending order.
     */

    const sql = `SELECT spots.*, reservations.person_id, reservations.start, reservations.ending 
    FROM spots LEFT JOIN reservations ON (spots.id = reservations.spot_id) 
    WHERE ending IS NULL AND ((person_id IS NULL ${cityQ} ${areaQ} ${addressQ}) OR person_id = ${personId}) 
    ORDER BY person_id DESC, address ASC`;

    connection.query(sql, (err, results) => {
      if(!!err){  console.log(err);   } else {
        console.log("DB \"parking\" Connected! :)");
        res.json(results);
        connection.release();
      }
    });
  });
});
 
// http://localhost:3000/booking/add
router.post('/book', function(req, res, next) {
  const personId = req.body.personId;
  const spotId = req.body.spotId;
  
  console.warn("Update: ", personId, spotId);

  pool.getConnection((err, connection) => {
    const sql = `INSERT INTO reservations (person_id, spot_id) VALUES (${personId}, ${spotId})`;

    console.log(sql);
    connection.query(sql, (err, results) => {
      res.json({
        success: true,
        message: "Done!"
      });
        
      connection.release();
    });
  });
});

module.exports = router;
