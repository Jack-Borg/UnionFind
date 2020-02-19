const fs = require("fs");

class QuickFind {
	constructor(n) {
		this.count = n;
		//Ceates new array of n size
		//fills array with undefined so map can be used
		//map fills array with index numbers
		this.points_sets = new Array(n).fill().map((x, i) => i);
	}

	union(points) {
		//gets set number of P1
		let setOfP1 = this.find(points[0]);
		//gets set number of P2
		let setOfP2 = this.find(points[1]);
		//map sets all of p2 set to p1 else keeps original value
		this.points_sets = this.points_sets.map((x) => (x == setOfP1 ? setOfP2 : x));
		this.count--;
	}

	find(p) {
		return this.points_sets[p];
	}

	connected(p, q) {
		return this.find(p) == this.find(q);
	}

	count() {
		return this.count;
	}
}

function getUnionsFromFile(file) {
	let arr = fs
		.readFileSync("dataSets/" + file)
		.toString()
		.split("\n");

	arr.forEach((e, i) => {
		arr[i] = e.split(" ").map((x) => parseInt(x));
	});

	return arr;
}
console.time("union");
let unions = getUnionsFromFile("tinyUF.txt");

let qf = new QuickFind(unions.shift()[0]);

unions.forEach((unionSet) => {
	console.log(qf.points_sets);
	qf.union(unionSet);
});
console.timeEnd("union");
console.log(qf.points_sets);
