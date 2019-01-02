const Processing = require('../models/processing.model');

/* READ *****************************/

module.exports.getProcessing = (req, res, next) => {
    Processing.fetchAll()
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('MMM D, YYYY');
            }
            console.log(JSON.stringify(rows, ["id", "title", "date"]));
            //res.send(JSON.stringify(rows));
            res.render('processing', {
                data: rows,
                title: 'Processing List',
            });
        })
        .catch(err => console.log(err));
};

