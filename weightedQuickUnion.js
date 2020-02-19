const fs = require("fs");

class QuickFind {
	constructor(n) {
		this.count = n;
		//Ceates new array of n size
		//fills array with undefined so map can be used
		//map fills array with index numbers
		this.p_sets = new Array(n).fill().map((x, i) => i);
		this.p_weights = new Array(n).fill(1);
	}

	union(p, q) {
		//finds root parent of points
		let p1 = this.find(p);
		let p2 = this.find(q);
		if (p1 != p2 && this.count > 1) {
			//sets new root parent
			if (this.p_weights[p1] >= this.p_weights[p2]) {
				this.p_sets[p2] = p1;
				this.p_weights[p1] += this.p_weights[p2];
			} else {
				this.p_sets[p1] = p2;
				this.p_weights[p2] += this.p_weights[p1];
			}
			this.count--;
		}
	}

	//finds root parent of point
	find(p) {
		while (p != this.p_sets[p]) {
			p = this.p_sets[p];
		}
		//returns weight and root parent
		return p;
	}

	connected(p, q) {
		return this.find(p) == this.find(q);
	}

	count() {
		return this.count;
	}
}

function getFromFile(file) {
	let arr = [];

	fs.readFileSync("dataSets/" + file)
		.toString()
		.split("\n")
		.forEach((e) => {
			arr.push(e.split(" ").map((x) => parseInt(x)));
		});

	return arr;
}

console.time("weighted find");

let unions = getFromFile("tinyUF.txt");
let qf = new QuickFind(unions.shift()[0]);

unions.forEach((unionSet) => {
	qf.union(unionSet[0], unionSet[1]);
});

console.timeEnd("weighted find");
console.log(qf.p_sets);
