let processes = [];
let selectedAlgorithm = '';

function addProcess() {
  const processName = document.getElementById('process-name').value;
  const burstTime = parseInt(document.getElementById('burst-time').value);
  const priority = parseInt(document.getElementById('priority').value || 0);

  const process = { name: processName, burstTime: burstTime, priority: priority };
  processes.push(process);

  document.getElementById('process-name').value = '';
  document.getElementById('burst-time').value = '';
  document.getElementById('priority').value = '';

  displayOutput();
}

function displayOutput() {
  const outputTable = document.getElementById('output-table');
  outputTable.innerHTML = ''; // Clear previous table

  let output = '';
  switch (selectedAlgorithm) {
    case 'fcfs':
      output = `FCFS:\n${getFCFS()}`;
      break;
    case 'sjf':
      output = `SJF:\n${getSJF()}`;
      break;
    case 'round-robin':
      output = `Round Robin:\n${getRoundRobin()}`;
      break;
    case 'priority':
      output = `Priority:\n${getPriority()}`;
      break;
    default:
      output = 'Please select a scheduling algorithm.';
      break;
  }

  if (output !== '') {
    outputTable.innerHTML = output;
  }
}

function selectAlgorithm() {
  selectedAlgorithm = document.getElementById('scheduling-type').value;
  displayOutput();
}

function getFCFS() {
  let table = '<table border=3 cellpadding=15>';
  table += '<tr><th>Process</th><th>Burst Time</th><th>Waiting Time</th></tr>';

  let waitingTime = 0;
  for (let i = 0; i < processes.length; i++) {
    const process = processes[i];
    const waitingTimeText = waitingTime > 0 ? waitingTime.toString() : '0';

    table += `<tr><td>${process.name}</td><td>${process.burstTime}</td><td>${waitingTimeText}</td></tr>`;
    waitingTime += process.burstTime;
  }

  table += '</table>';
  return table;
}

function getSJF() {
  let table = '<table border=3 cellpadding=15>';
  table += '<tr><th>Process</th><th>Burst Time</th><th>Waiting Time</th></tr>';

  let sortedProcesses = processes.slice().sort((a, b) => a.burstTime - b.burstTime);
  let waitingTime = 0;

  for (let i = 0; i < sortedProcesses.length; i++) {
    const process = sortedProcesses[i];
    const waitingTimeText = waitingTime > 0 ? waitingTime.toString() : '0';

    table += `<tr><td>${process.name}</td><td>${process.burstTime}</td><td>${waitingTimeText}</td></tr>`;
    waitingTime += process.burstTime;
  }

  table += '</table>';
  return table;
}

function getRoundRobin() {
  const timeQuantum = 2;
  let table = '<table border=3 cellpadding=15>';
  table += '<tr><th>Process</th><th>Burst Time</th><th>Waiting Time</th></tr>';

  let remainingTimes = processes.map((process) => process.burstTime);
  let done = false;
  let time = 0;

  while (!done) {
    done = true;

    for (let i = 0; i < processes.length; i++) {
      const process = processes[i];

      if (remainingTimes[i] > 0) {
        done = false;

        const executionTime = Math.min(remainingTimes[i], timeQuantum);
        const waitingTime = time;
        remainingTimes[i] -= executionTime;
        time += executionTime;

        table += `<tr><td>${process.name}</td><td>${process.burstTime}</td><td>${waitingTime}</td></tr>`;
      }
    }
  }

  table += '</table>';
  return table;
}

function getPriority() {
  let table = '<table border=3 cellpadding=15>';
  table += '<tr><th>Process</th><th>Burst Time</th><th>Waiting Time</th></tr>';

  let sortedProcesses = processes.slice().sort((a, b) => a.priority - b.priority);
  let waitingTime = 0;

  for (let i = 0; i < sortedProcesses.length; i++) {
    const process = sortedProcesses[i];
    const waitingTimeText = waitingTime > 0 ? waitingTime.toString() : '0';

    table += `<tr><td>${process.name}</td><td>${process.burstTime}</td><td>${waitingTimeText}</td></tr>`;
    waitingTime += process.burstTime;
  }

  table += '</table>';
  return table;
}

function reset() {
  processes = [];
  selectedAlgorithm = '';
  displayOutput();
}
