module.exports = {
	product: {
		insert:'INSERT INTO product SET ?',
		update:'UPDATE product SET ? WHERE id = ?',
		delete: 'DELETE FROM product WHERE id = ?',
		queryById: 'SELECT * FROM product WHERE id = ?',
		queryAll: 'SELECT * FROM product'
	}
};

