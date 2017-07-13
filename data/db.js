var Sequelize = require("sequelize");
var sequelize = new Sequelize("d9m253htprsfdd", "nmfbjytoecuyvd", "43517f5cfc92eb60958766f89afbd4f234c444aedd0ba88106cb9c061081cf76", {
	host: "ec2-23-21-158-253.compute-1.amazonaws.com",
	dialect: "postgres"
});

var user = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	userId: Sequelize.INTEGER,
	ip: Sequelize.STRING,
	state: {
		type: Sequelize.BOOLEAN,
	    defaultValue: true
	},
	branch: {
		type: Sequelize.INTEGER,
	    defaultValue: 6
	},
	subscribed:{
		type:Sequelize.BOOLEAN,
			defaultValue:true
	}
})

user.sync().then(function() {});



module.exports = user;
