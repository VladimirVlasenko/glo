'use strict';


let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const inputSalaryAmount = document.querySelector('.salary-amount');
const buttonPlusIncomeAdd = document.querySelector('.income_add');
const inputAdditionalIncome = document.querySelectorAll('.additional_income-item');
const buttonPlusExpensesAdd = document.querySelector('.expenses_add');
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
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

let inputExpensesTitle = document.querySelector('.expenses-title');
let inputExpensesAmount = document.querySelector('.expenses-amount');
let inputIncomeTitle = document.querySelectorAll('.income-title');
let inputIncomeAmount = document.querySelectorAll('.income-amount');
let depositCheckBox = document.querySelector('#deposit-check');
let inputTargetAmount = document.querySelector('.target-amount');
let inputRangePeriodSelect = document.querySelector('.period-select');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let allInputs = document.querySelectorAll('input');
let body = document.querySelector('body');


class AppData {
    constructor() {
        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }


    start() {
        if(inputSalaryAmount.value.trim() !== '') {
            this.budget = +inputSalaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getInfoDeposit(); 
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
            inputRangePeriodSelect.disabled = false;
            for (let i = 1; i < incomeItems.length; i++) {
                incomeItems[i].disabled = true;
            }

            for (let i = 1; i < expensesItems.length; i++) {
                expensesItems[i].disabled = true;
            }

        } else {
            return;
        }
    }

    showResult() {
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
    }

    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        
        

        if (expensesItems.length === 3) {
            buttonPlusExpensesAdd.style.display = 'none';
        }
    }

    getExpenses() {
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
    }

    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonPlusIncomeAdd.style.display = 'none';
        }
    }

    getIncome() {
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
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    }

    getAddIncome() {
        inputAdditionalIncome.forEach(function(item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    }

    changePeriod() {
        periodAmount.innerHTML = inputRangePeriodSelect.value + ' мес.';  
        incomePeriodValue.innerHTML = inputRangePeriodSelect.value * this.budgetMonth;
        console.log('inputRangePeriodSelect.value: ', inputRangePeriodSelect.value);
        console.log(this.budgetMonth);

    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = +inputSalaryAmount.value + this.incomeMonth - +this.expensesMonth + monthDeposit;
        this.budgetDay = Math.round(this.budgetMonth / 30 , 0);
    }

    getTargetMonth() {
        return(Math.ceil(inputTargetAmount.value / this.budgetMonth));
    }

    // getStatusIncome() {
    //     const _this = this;
    //     if(_this.budgetDay >= 1200) {
    //         return ('У вас высокий уровень дохода');
    //     } else if (_this.budgetDay < 1200 && _this.budgetDay >= 600) {
    //         return ('У вас средний уровень дохода');
    //     } else if (_this.budgetDay < 600) {
    //         return ('Ваш уровень дохода ниже среднего');
    //     } else if (_this.budgetDay <= 0) {
    //         return ('Что-то пошло не так');
    //     }
    // }

    getInfoDeposit() {
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    calcSavedMoney() {
        return (this.budgetMonth * inputRangePeriodSelect.value);
    }

    reset() {
        const _this = this;
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

        for (let i = 0; i < allInputs.length; i++) {
            allInputs[i].value = '';
        }

        _this.budget = 0;
        _this.income = {};
        _this.incomeMonth = 0;
        _this.addIncome = [];
        _this.expenses = {};
        _this.addExpenses = [];
        _this.deposit = true;
        _this.percentDeposit = 0;
        _this.moneyDeposit = 0;
        _this.budgetDay = 0;
        _this.budgetMonth = 0;
        _this.expensesMonth = 0;

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

    changePercent() {
        const valueSelect = this.value;
        if(valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
            depositPercent.addEventListener('input', () => {
                if(!isNumber(depositPercent.value) || depositPercent.value < 0 || depositPercent.value > 100) {
                    buttonCount.disabled = true;
                    alert('В графу "Процент" введите число от 0 до 100');
                    depositPercent.value = '';
                } else {
                    buttonCount.disabled = false;
                }
            });
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
    }
    depositHandler() {
        if (depositCheckBox.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = 'true';
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = 'false';
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListeners() {
        buttonCount.addEventListener('click', this.start.bind(this));
        buttonPlusExpensesAdd.addEventListener('click', this.addExpensesBlock); 
        buttonPlusIncomeAdd.addEventListener('click', this.addIncomeBlock);
        inputRangePeriodSelect.addEventListener('input', this.changePeriod);

        buttonCancel.addEventListener('click', this.reset);
        depositCheckBox.addEventListener('change', this.depositHandler.bind(this));

        body.addEventListener('input', (event) => {
            let target = event.target;
            if (target.matches('input[placeholder="Наименование"]')) {
                target.value = target.value.replace(/[^а-яА-Я,. ]/, '');
            }
        });
        body.addEventListener('input', (event) => {
            let target = event.target;
            if (target.matches('input[placeholder="Сумма"]')) {
                target.value = target.value.replace(/[^0-9]/, '');
            }
        });
    }
}

const appData = new AppData();
appData.eventListeners();




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









