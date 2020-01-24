let money = 30000;
let income = 10000;
let addExpenses = '1500, 400, 2000, 800, 2500';
let deposit = false;
let mission = 100000;
let period = 6;
let budgetDay = (money+income) / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(','));

console.log(budgetDay);