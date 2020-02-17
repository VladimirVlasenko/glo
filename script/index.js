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

};

AppData.prototype.start = function() {
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
AppData.prototype.budgetDay = 0;
AppData.prototype.budgetMonth = 0;
AppData.prototype.expensesMonth = 0;
AppData.prototype.changePeriod = function() {
    const _this = this;
    periodAmount.innerHTML = inputRangePeriodSelect.value + ' мес.';  
    incomePeriodValue.innerHTML = inputRangePeriodSelect.value * _this.budgetMonth;
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = +inputSalaryAmount.value + +this.incomeMonth - +this.expensesMonth;
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
    if(_this.deposit) {
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
    inputRangePeriodSelect.value = 1;
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

const appData = new AppData();
AppData.prototype.eventListeners();




AppData.prototype.eventListeners = function() {

    buttonCount.addEventListener('click', this.start.bind(appData));
    buttonPlusExpensesAdd.addEventListener('click', this.addExpensesBlock.bind(appData)); 
    buttonPlusIncomeAdd.addEventListener('click', this.addIncomeBlock.bind(appData));
    inputRangePeriodSelect.addEventListener('input', this.changePeriod.bind(appData));

    buttonCancel.addEventListener('click', this.reset.bind(appData));
};






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









