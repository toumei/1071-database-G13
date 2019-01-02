const Malfuntion = require('../models/malfuntion.model');

/* READ *****************************/

module.exports.getMalfuntion = (req, res, next) => {
    Malfuntion.fetchAll()
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('MMM D, YYYY');
            }
            console.log(JSON.stringify(rows, ["id", "title", "date"]));
            //res.send(JSON.stringify(rows));
            res.render('malfuntion', {
                data: rows,
                title: 'Malfuntion List',
            });
        })
        .catch(err => console.log(err));
};

