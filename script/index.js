let money;

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
    do {money = prompt('Ваш месячный доход?', 50000)}
    while(!isNumber(money));
    return +money;
};

start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: true,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function() {
        
        if(confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
            let cashIncome;
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабытываете?', 10000);
            } 
            while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null);

            appData.income[itemIncome] = cashIncome;
        }

        for (let i = 0; i < 2; i++) {
                let itemExpenses;
                do {
                    itemExpenses = prompt('Введите название обязатальной статьи расходов в этом месяце' + (i), 'Адвокааааат!'+ (i));
                } 
                while(isNumber(itemExpenses) || itemExpenses === '' || itemExpenses === null);
                let cashExpenses;
        
                do {
                    cashExpenses = prompt('Во сколько это обойдется?', 2500);
                }
                while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);

                appData.expenses[itemExpenses] = cashExpenses;
        }
        let addExpenses;
            do {
                addExpenses = prompt('Перечислите через запятую названия ' +  
                'дополнительных статей расходов в этом месяце' +
                '!','вода, газ, свет, инет, телефон');
             }
             while (isNumber(addExpenses) || addExpenses === '' || addExpenses === null);

            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        let sum = 0;
        for(key in appData.expenses) {
            sum += +appData.expenses[key];
            }    
        console.log(sum + 'р - расходы за месяц');
        appData.expensesMonth = +sum;
    },
    getBudget: function() {
        appData.budgetMonth = +money - +appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
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
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();


if (appData.getTargetMonth() < 0) {
    console.log('Цель не будет достигнута')
} else {
    console.log('Цель будет достигнута за ' + (Math.ceil(appData.mission / appData.budgetMonth)) + ' месяцев');
};

console.log(appData.getStatusIncome());

console.log(appData);
console.log(appData.calcSavedMoney(), appData.percentDeposit, appData.moneyDeposit);

let arr = appData.addExpenses;
let arr1 = [];
arr.forEach(function(item, i, arr) {
    if(i === 0) {
        arr1[i] = item.charAt(0).toUpperCase() + item.substr(1);
    } else {
        arr1[i] = ' ' + item.charAt(1).toUpperCase() + item.substr(2);
    }
  });
  console.log(arr1.toString(''));

