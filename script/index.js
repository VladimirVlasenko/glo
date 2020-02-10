'use strict';


let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let start = document.getElementById('start');
let inputSalaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
let inputIncomeTitle = document.querySelectorAll('.income-title');
let inputIncomeAmount = document.querySelectorAll('.income-amount');
let buttonPlusIncomeAdd = document.querySelector('.income_add');
let inputAdditionalIncome = document.querySelectorAll('.additional_income-item');
let expensesItems = document.querySelectorAll('.expenses-items');
let inputExpensesTitle = document.querySelector('.expenses-title');
let inputExpensesAmount = document.querySelector('.expenses-amount');
let buttonPlusExpensesAdd = document.querySelector('.expenses_add');
let depositCheckBox = document.querySelector('#deposit-check');
let inputTargetAmount = document.querySelector('.target-amount');
let inputRangePeriodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.querySelector('.budget_day-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let targetMonthValue = document.querySelector('.target_month-value');
let buttonCount = document.querySelector('#start');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');



let appData = {
    budget: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: true,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        if(inputSalaryAmount.value !== '') {
        
        appData.budget = +inputSalaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        // appData.getInfoDeposit();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
        } else {
            return;
        }
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();


        incomePeriodValue.value = appData.calcSavedMoney();
        inputRangePeriodSelect.addEventListener('input', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
        
        
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            buttonPlusExpensesAdd.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }   
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expensesMonth += +appData.expenses[itemExpenses];
            } 
            
        });
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonPlusIncomeAdd.style.display = 'none';
        }
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
            if (itemIncome !== '' && cashIncome !== '') {
                appData.incomeMonth += +appData.income[itemIncome];
            }
            console.log(appData.incomeMonth);
            console.log(appData.income);
        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        inputAdditionalIncome.forEach(function(item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    changePeriod: function() {
        periodAmount.innerHTML = inputRangePeriodSelect.value + ' мес.';  
        incomePeriodValue.innerHTML = inputRangePeriodSelect.value * appData.budgetMonth;
    },
    getBudget: function() {
        appData.budgetMonth = +inputSalaryAmount.value + +appData.incomeMonth - +appData.expensesMonth;
        appData.budgetDay = Math.round(appData.budgetMonth / 30 , 0);
        console.log(inputSalaryAmount.value + 'a');
        console.log(appData.incomeMonth + 'b');
        console.log(appData.expensesMonth + 'c');
    },
    getTargetMonth: function() {
        return Math.ceil(inputTargetAmount.value / appData.budgetMonth);
    },
    getStatusIncome: function() {
        if(appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600) {
            return ('Ваш уровень дохода ниже среднего');
        } else if (appData.budgetDay <= 0) {
            return ('Что-то пошло не так');
        }
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while(isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * inputRangePeriodSelect.value;

    }
};

start.addEventListener('click', appData.start);

buttonPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock); 
buttonPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
inputRangePeriodSelect.addEventListener('input', appData.changePeriod);




// if (appData.getTargetMonth() < 0) {
//     console.log('Цель не будет достигнута')
// } else {
//     console.log('Цель будет достигнута за ' + (Math.ceil(appData.mission / appData.budgetMonth)) + ' месяцев');
// }


// let arr = appData.addExpenses;
// let arr1 = [];
// arr.forEach(function(item, i, arr) {
//     if(i === 0) {
//         arr1[i] = item.charAt(0).toUpperCase() + item.substr(1);
//     } else {
//         arr1[i] = ' ' + item.charAt(1).toUpperCase() + item.substr(2);
//     }
//   });
//   console.log(arr1.toString(''));









