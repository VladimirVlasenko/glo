'use strict';


const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};
const inputSalaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
const inputIncomeTitle = document.querySelectorAll('.income-title');
const inputIncomeAmount = document.querySelectorAll('.income-amount');
const buttonPlusIncomeAdd = document.querySelector('.income_add');
const inputAdditionalIncome = document.querySelectorAll('.additional_income-item');
let expensesItems = document.querySelectorAll('.expenses-items');
const inputExpensesTitle = document.querySelector('.expenses-title');
const inputExpensesAmount = document.querySelector('.expenses-amount');
const buttonPlusExpensesAdd = document.querySelector('.expenses_add');
const depositCheckBox = document.querySelector('#deposit-check');
const inputTargetAmount = document.querySelector('.target-amount');
const inputRangePeriodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const buttonCount = document.querySelector('#start');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const buttonCancel = document.querySelector('#cancel');
let allInputs = document.querySelectorAll('input');




const AppData = function() {
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = true;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};
    AppData.prototype.start = function() {
        if(inputSalaryAmount.value.trim() !== '') {
            this.budget = +inputSalaryAmount.value;

            this.getExpenses();
            this.getIncome();
            // AppData.getInfoDeposit();
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
    };

    AppData.prototype.showResult = function() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        inputRangePeriodSelect.addEventListener('input', function() {
            incomePeriodValue.value = _this.calcSavedMoney();
        });
    };

    AppData.prototype.addExpensesBlock = function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            buttonPlusExpensesAdd.style.display = 'none';
        }
    };

    AppData.prototype.getExpenses = function() {
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
    };

    AppData.prototype.addIncomeBlock = function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonPlusIncomeAdd.style.display = 'none';
        }
    };

    AppData.prototype.getIncome = function() {
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
    };

    AppData.prototype.getAddExpenses = function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    };

    AppData.prototype.getAddIncome = function() {
        inputAdditionalIncome.forEach(function(item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    };

    AppData.prototype.changePeriod = function() {
        const _this = this;
        periodAmount.innerHTML = inputRangePeriodSelect.value + ' мес.';  
        incomePeriodValue.innerHTML = inputRangePeriodSelect.value * _this.budgetMonth;
    };

    AppData.prototype.getBudget = function() {
        this.budgetMonth = +inputSalaryAmount.value + this.incomeMonth - +this.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30 , 0);
    };

    AppData.prototype.getTargetMonth = function() {
        return Math.ceil(inputTargetAmount.value / this.budgetMonth);
    };

    AppData.prototype.getStatusIncome = function() {
        const _this = this;
        if(_this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (_this.budgetDay < 1200 && _this.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (_this.budgetDay < 600) {
            return ('Ваш уровень дохода ниже среднего');
        } else if (_this.budgetDay <= 0) {
            return ('Что-то пошло не так');
        }
    };

    AppData.prototype.getInfoDeposit = function() {
        const _this = this;
        if(AppData.deposit) {
            do {
                _this.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(isNaN(_this.percentDeposit) || _this.percentDeposit === '' || _this.percentDeposit === null);
            do {
                _this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while(isNaN(_this.moneyDeposit) || _this.moneyDeposit === '' || _this.moneyDeposit === null);
        }
    };

    AppData.prototype.calcSavedMoney = function() {
        return this.budgetMonth * inputRangePeriodSelect.value;
    };

    AppData.prototype.reset = function() {
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
    };


    buttonCount.addEventListener('click', AppData.start.bind(AppData));
    buttonPlusExpensesAdd.addEventListener('click', AppData.addExpensesBlock.bind(AppData)); 
    buttonPlusIncomeAdd.addEventListener('click', AppData.addIncomeBlock.bind(AppData));
    inputRangePeriodSelect.addEventListener('input', AppData.changePeriod.bind(AppData));
    buttonCancel.addEventListener('click', AppData.reset.bind(AppData));




// if (AppData.getTargetMonth() < 0) {
//     console.log('Цель не будет достигнута')
// } else {
//     console.log('Цель будет достигнута за ' + (Math.ceil(AppData.mission / AppData.budgetMonth)) + ' месяцев');
// }


// let arr = AppData.addExpenses;
// let arr1 = [];
// arr.forEach(function(item, i, arr) {
//     if(i === 0) {
//         arr1[i] = item.charAt(0).toUpperCase() + item.substr(1);
//     } else {
//         arr1[i] = ' ' + item.charAt(1).toUpperCase() + item.substr(2);
//     }
//   });
//   console.log(arr1.toString(''));









