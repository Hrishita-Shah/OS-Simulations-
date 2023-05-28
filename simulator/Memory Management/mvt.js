var memory = [];
var filled = [];
var row = {
	start: "",
	end: "",
	size: ""
};
var totalsize;
var numblocks=0;

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
						//dcdcdc
                        numblocks++;
						console.log('Welcome'+numblocks);
						var template = "<label class='col-form-label' style='color:white;font-size:20px;font-weight:20px;'>Enter Block Sizes</label>"
						var i;
						for (i = 0; i < numblocks; i++) {
							template = template + "<div class='' style='display:block; margin:20px;border:10px solid black' type='text' class='blockInput' id='blockSize" + i + "'>Block</div>";
						}
						template += "<div id='submitBlockBtn' class='mt-9 px-4 py-2 bg-green-500 text-white rounded-md' style='margin-bottom:20px;'>Submit</div>";
						if(numblocks > 0)
							render(template, document.querySelector('#blockContainer'));
						else
							render('Please enter the number of blocks', document.querySelector('#requestMsg'));


						//sdscs
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
				numblocks++;
				// console.log('Welcome'+numblocks);
				var template = "<label class='col-form-label' style='color:white;font-size:20px;font-weight:20px;'>Enter Block Sizes</label>"
				var i;
				for (i = 0; i < numblocks; i++) {
					template = template + "<div class='' style='display:block; background-color:white; margin:20px;border:10px solid black' type='number' class='blockInput' id='blockSize' > Block"+i+"</div>";
				}

				if(numblocks > 0)
					render(template, document.querySelector('#blockContainer'));
				else
					render('Please enter the number of blocks', document.querySelector('#requestMsg'));

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

				numblocks++;
				console.log('Welcome'+numblocks);
				var template = "<label class='col-form-label' style='color:white;font-size:20px;font-weight:20px;'>Enter Block Sizes</label>"
				var i;
				for (i = 0; i < numblocks; i++) {
					template = template + "<div class='' style='display:block; margin:20px;border:10px solid black' type='text' class='blockInput' id='blockSize" + i + "'>Block</div>";
				}
				template += "<div id='submitBlockBtn' class='mt-9 px-4 py-2 bg-green-500 text-white rounded-md' style='margin-bottom:20px;'>Submit</div>";
				if(numblocks > 0)
					render(template, document.querySelector('#blockContainer'));
				else
					render('Please enter the number of blocks', document.querySelector('#requestMsg'));



				render('Allocated from ' + row["start"] + ' to ' + row["end"] + ' to request', document.querySelector('#requestMsg'));
			}
		}
		if (alloc == 0)
			render("Couldn't allocate request", document.querySelector('#requestMsg'));
		// console.log(filled);
	}
	function removeBlock() {
		var remove = document.querySelector('#removeNum').value;
		var removedBlockIndex = -1;

		// Find the index of the block to remove
		for (var i = 0; i < filled.length; i++) {
		  if (filled[i].id === remove) {
			removedBlockIndex = i;
			break;
		  }
		}

		if (removedBlockIndex !== -1) {
		  var removedBlock = filled.splice(removedBlockIndex, 1)[0];
		  var start = parseInt(removedBlock.start);
		  var end = parseInt(removedBlock.end);

		  // Update the memory array
		  for (var i = start; i < end; i++) {
			memory[i] = -1;
		  }

		  // Remove the block input from the DOM
		  var blockSizeElement = document.querySelector('#blockSize' + removedBlockIndex);
			console.log(blockSizeElement);
			console.log(removedBlockIndex);
		  if (blockSizeElement) {
			blockSizeElement.remove();
		  }

		  // Update the numblocks variable
		  numblocks--;

		  render("Freed " + start + " to " + end, document.querySelector('#requestMsg'));
		} else {
		  render("Cannot remove what does not exist", document.querySelector('#requestMsg'));
		}
	  }



}

function render(template, node) {
	if (!node)
		return;
	node.innerHTML = template;
}
