const fs = require("fs");

class QuickFind {
	constructor(n) {
		this.count = n;
		//Ceates new array of n size
		//fills array with undefined so map can be used
		//map fills array with index numbers
		this.points_sets = new Array(n).fill().map((x, i) => i);
	}

	union(p, q) {
		if (!this.connected(p, q) && this.count > 1) {
			//find root parent of both points
			let parentOfP1 = this.find(p);
			let parentOfP2 = this.find(q);

			//sets new root parent
			this.points_sets[parentOfP1] = parentOfP2;

			this.count--;
		}
	}

	//finds root parent of point
	find(p) {
		while (p != this.points_sets[p]) {
			p = this.points_sets[p];
		}
		return p;
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
console.time("quick union");
let unions = getUnionsFromFile("tinyUF.txt");

let qf = new QuickFind(unions.shift()[0]);

unions.forEach((unionSet) => {
	qf.union(unionSet[0], unionSet[1]);
});
console.timeEnd("quick union");
console.log(qf.points_sets);
