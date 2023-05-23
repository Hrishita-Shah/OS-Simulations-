var memory = [];
var filled = [];
var row = {
	start: "",
	end: "",
	size: ""
};
var totalsize;
var numblocks;

var submitBtn = document.querySelector('#submitBtn');
//console.log('Welcome!');
submitBtn.onclick = getInitValues;

function getInitValues() {
	totalsize = document.querySelector('#totalMemSize').value;

	var message = 'Set total memory =' + totalsize;
	render(message, document.querySelector('#requestMsg'));
	var submitBlockBtn = document.querySelector('#submitBlockBtn');

	var blocksize0 = document.querySelector('#blockSize0');

	var i = 0;
	//initialize memory
	for (i = 0; i < totalsize; i++)
		memory[i] = -1;

	var requestBtn = document.querySelector('#submitRequestBtn');
	requestBtn.onclick = findHole;


	var removeBtn = document.querySelector('#removeBtn');
	removeBtn.onclick = removeBlock;
	function findHole() {
		var requestsize = document.querySelector('#requestSize').value;
		var requestid = document.querySelector('#requestId').value;
		var algo = document.getElementById('sel1');
		var i;
		var alloc = 0;
		/* first fit */
		if (algo.value === 'First Fit') {
			for (i = 0; i < totalsize; i++) {
				if (memory[i] != -1) {
					continue;
				}
				else {
					flag = 0;
					for (j = i; j < parseInt(requestsize) + parseInt(i); j++) {
						if (memory[j] != -1) {
							//console.log(j);
							flag++;
							i = j;
							break;
						}
					}
					if (!flag) {
						//allocate from i onwards
						limit = parseInt(i) + parseInt(requestsize);
						for (j = i; j < limit; j++)
							memory[j] = requestid;
						//update table
						var row = {
							id: requestid,
							start: i,
							end: limit,
							size: requestsize,
						};
						filled.push(row);
						alloc = 1;
						render('Allocated from ' + row["start"] + ' to ' + row["end"] + ' to request', document.querySelector('#requestMsg'));
					}
				}
				if (alloc)
					break;
			}
		} else if (algo.value === 'Best Fit') {
			/* Best fit */
			var holes = [];
			var temp = 0;
			for (i = 0; i < totalsize; i++) {
				if (memory[i] == -1) {
					temp = i;
					while (memory[i] == -1) {
						i++;
					}
					holes.push({ start: temp, end: i, size: i - temp });
				}
			}
			var bestIndex = -1;
			for (i = 0; i < holes.length; i++) {
				if (holes[i].size >= parseInt(requestsize)) {
					if (bestIndex == -1) {
						bestIndex = i;
					} else if (holes[bestIndex].size > holes[i].size) {
						bestIndex = i;
					}
				}
			}
			if (bestIndex != -1) {
				i = holes[bestIndex].start;
				//allocate from i onwards
				limit = i + parseInt(requestsize);
				for (j = i; j < limit; j++)
					memory[j] = requestid;
				//update table
				var row = {
					id: requestid,
					start: i,
					end: limit,
					size: requestsize,
				};
				filled.push(row);
				alloc = 1;
				render('Allocated from ' + row["start"] + ' to ' + row["end"] + ' to request', document.querySelector('#requestMsg'));
			}
		} else if (algo.value === 'Worst Fit') {
			/* Worst fit */
			var holes = [];
			var temp = 0;
			for (i = 0; i < totalsize; i++) {
				if (memory[i] == -1) {
					temp = i;
					while (memory[i] == -1) {
						i++;
					}
					holes.push({ start: temp, end: i, size: i - temp });
				}
			}
			var worstIndex = -1;
			for (i = 0; i < holes.length; i++) {
				if (holes[i].size >= parseInt(requestsize)) {
					if (worstIndex == -1) {
						worstIndex = i;
					} else if (holes[worstIndex].size < holes[i].size) {
						worstIndex = i;
					}
				}
			}
			if (worstIndex != -1) {
				i = holes[worstIndex].start;
				//allocate from i onwards
				limit = i + parseInt(requestsize);
				for (j = i; j < limit; j++)
					memory[j] = requestid;
				//update table
				var row = {
					id: requestid,
					start: i,
					end: limit,
					size: requestsize,
				};
				filled.push(row);
				alloc = 1;
				render('Allocated from ' + row["start"] + ' to ' + row["end"] + ' to request', document.querySelector('#requestMsg'));
			}
		}
		if (alloc == 0)
			render("Couldn't allocate request", document.querySelector('#requestMsg'));
		// console.log(filled);
	}

	function removeBlock() {
		var remove = document.querySelector('#removeNum').value;
		//console.log(filled.length);
		var found = 0;
		for (var i = filled.length - 1; i >= 0; i--) {
			if (filled[i]["id"] == remove) {
				found++;
				var start = parseInt(filled[i]["start"]);
				var end = parseInt(filled[i]["end"]);
				//console.log(start);
				//console.log(end);
				filled.splice(i, 1);
				break;
			}
		}
		if (found)
			render("Freed " + start + " to " + end, document.querySelector('#requestMsg'));
		else
			render("Cannot remove what does not exist", document.querySelector('#requestMsg'));
		for (var i = start; i < end; i++)
			memory[i] = -1;
	}
}

function render(template, node) {
	if (!node)
		return;
	node.innerHTML = template;
}
