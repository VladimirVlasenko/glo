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
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function() {
        let addExpenses = prompt('Перечислите через запятую названия ' +  
            'дополнительных статей расходов в этом месяце' +
            '!','вода, газ, свет, инет, телефон');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
                appData.expenses[prompt('Введите название обязатальной статьи расходов в этом месяце' + (i), 'Адвокааааат!'+ (i) )] = +prompt('Во сколько это обойдется?', 3000);
        }
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
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

if (appData.getTargetMonth() < 0) {
    console.log('Цель не будет достигнута')
} else {
    console.log('Цель будет достигнута за ' + (Math.ceil(appData.mission / appData.budgetMonth)) + ' месяцев');
};

console.log(appData.getStatusIncome());

for(let key in appData) {
    console.log('Наша программа включает в себя следующие данные: ' + key + " : " + appData[key]);
}
