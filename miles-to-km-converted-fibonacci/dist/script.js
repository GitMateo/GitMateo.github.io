//Calc section

function getValue()
{
var id = document.getElementsByTagName("input")[0];
var a = parseInt(id.value)
//console.log(a);
return a
}

//fib function for calculus in html ,that based on current value of fib(n) outputs value for *1.6 conversion aswell

function fib() {
let loop = [0, 1];
let number = document.getElementById('nmbloop').value;
for (let i = 2; i < number; i++)
 loop[i] = loop[i-1]+ loop[i-2];
  document.getElementById('output').innerHTML = loop[number-2];
  document.getElementById('output2').innerHTML = loop[number-1];
  document.getElementById('output3').innerHTML = loop[number-2];
  
  // below formula rounds up the output and leaves two numbers after decimal point
  
  document.getElementById('output4').innerHTML = Math.round((loop[number-2]*1.6)*100)/100;
  
  //below formula calculates % of difference between two calculations
  
  document.getElementById('output5').innerHTML = Math.round((((loop[number-1])-(loop[number-2]*1.6))/(loop[number-1]))*100);
  
  //console.log(Math.floor((((loop[number-1])-(loop[number-2]*1.6))/(loop[number-1]))*100))
}
//Plotting section

//fib func for plotting

function fibonacci(n) {
   return n < 1 ? 0
        : n <= 2 ? 1
        : fibonacci(n - 1) + fibonacci(n - 2)
}

//console.log(fibonacci(4))
const FibonacciData = n => fibonacci(n);
const Multiply = n => fibonacci(n - 1)*1.6;


let Ar = [...Array(17).keys()]
let Arr = Ar.slice(3)
//console.log(Arr)

const FibonacciArray = Arr.map(FibonacciData);
const Multiplied = Arr.map(Multiply);
//console.log(Multiplied)
//console.log(FibonacciArray);

let labelss = [...Array(17).keys()]
let labels = labelss.slice(3)
const labelsArray = labels.map(FibonacciData);
//console.log(labelsArray);

let data = {
  labels: labelsArray,
  datasets: [{
    label: 'Miles to km using fibonacci',
    data: FibonacciArray,
    fill: false,
    borderColor: 'rgb(75, 192, 60)',
    tension: 0.1
  },
  {
    label: 'Miles to km using 1.6 ratio',
    data: Multiplied,
    fill: false,
    borderColor: 'rgb(0, 60, 192)',
    tension: 0.1
  }]
};

  const config = {
    type: 'line',
    data: data,
  };


  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );