'use strict';


let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};
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
let buttonCancel = document.querySelector('#cancel');
let allInputs = document.querySelectorAll('input');




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
        if(inputSalaryAmount.value.trim() !== '') {
            this.budget = +inputSalaryAmount.value;

            this.getExpenses();
            this.getIncome();
            // appData.getInfoDeposit();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();
            this.showResult();
            buttonCancel.style.display = 'block';
            buttonCount.style.display = 'none';
            allInputs = document.querySelectorAll('input');
            allInputs.forEach(function(item, i, allInputs) {
                item.disabled = true;
            });
            for (let i = 1; i < incomeItems.length; i++) {
                incomeItems[i].disabled = true;
            }
    
              for (let i = 1; i < expensesItems.length; i++) {
                expensesItems[i].disabled = true;
              }

        } else {
            return;
        }
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();


        incomePeriodValue.value = this.calcSavedMoney();
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
                this.expenses[itemExpenses] = cashExpenses;
            }   
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expensesMonth += +this.expenses[itemExpenses];
            } 
            
        }, this);
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
                this.income[itemIncome] = cashIncome;
            }
            if (itemIncome !== '' && cashIncome !== '') {
                this.incomeMonth += +this.income[itemIncome];
            }
        }, this);
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    },
    getAddIncome: function() {
        inputAdditionalIncome.forEach(function(item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    changePeriod: function() {
        periodAmount.innerHTML = inputRangePeriodSelect.value + ' мес.';  
        incomePeriodValue.innerHTML = inputRangePeriodSelect.value * appData.budgetMonth;
    },
    getBudget: function() {
        this.budgetMonth = +inputSalaryAmount.value + +this.incomeMonth - +this.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30 , 0);
    },
    getTargetMonth: function() {
        return Math.ceil(inputTargetAmount.value / this.budgetMonth);
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
        return this.budgetMonth * inputRangePeriodSelect.value;

    },
    reset: function() {
        buttonCount.style.display = 'block';
        buttonCancel.style.display = 'none';
        inputRangePeriodSelect.value = '1';
        periodAmount.textContent = inputRangePeriodSelect.value;
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
          }
          incomeItems = document.querySelectorAll('.income-items');

          for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].remove();
          }
          expensesItems = document.querySelectorAll('.expenses-items');

        allInputs.forEach(function(item, i, allInputs) {
            allInputs = document.querySelectorAll('input');
            item.value = '';
            item.disabled = false;
        });
        if (buttonPlusIncomeAdd.style.display === 'none') {
            buttonPlusIncomeAdd.style.display = 'block';
          }
          if (buttonPlusExpensesAdd.style.display === 'none') {
            buttonPlusExpensesAdd.style.display = 'block';
          }
          if (depositCheckBox.checked === true) {
            depositCheckBox.checked = false;
          }
    }
};

buttonCount.addEventListener('click', appData.start.bind(appData));
buttonPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock.bind(appData)); 
buttonPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock.bind(appData));
inputRangePeriodSelect.addEventListener('input', appData.changePeriod.bind(appData));

buttonCancel.addEventListener('click', appData.reset.bind(appData));




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









