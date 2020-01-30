
    let isNumber = function(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
     
     let money;


    let start = function() {
        do {money = prompt('Ваш месячный доход?', 50000)}
        while(!isNumber(money));
        return +money;
    };

    start();

    let income = +10000;
    let addExpenses = prompt('Перечислите через запятую названия дополнительных статей расходов в этом месяце', 'вода, газ, свет, инет, телефон');


   

    let deposit = confirm('Есть ли у вас депозит в банке?');
    let mission = +100000;
    let period = 6;

   

    let showTypeOf = function(data) {
        console.log(data, typeof(data));
    }
    showTypeOf(money);
    showTypeOf(income);
    showTypeOf(deposit);

    let expenses1,
        expenses2;


    
    let getExpensesMonth = function() {
        
        let sum;
        let sum1 = 0;
        for (let i = 0; i < 2; i++) {

            if (i === 0) {
                expenses1 = prompt('Введите название обязатальной статьи расходов в этом месяце', 'Адвокааааат!');
            } else if(i === 1) {
                expenses2 = prompt('Введите название обязатальной статьи расходов в этом месяце', 'Шиномонтаж!');
            }

            do {
                sum = prompt('Во сколько это обойдется?', 3000);
            }
            while (!isNumber(sum));
            sum1 += +sum;
        }
        return sum1;
    }

    let expensesMonth = getExpensesMonth();

    console.log(expensesMonth + ' - сумма всех обязательных расходов за месяц');

    let getAccumulatedMonth = function() {
        return +money + income - +expensesMonth;
    }

    let accumulatedMonth = getAccumulatedMonth();
    console.log(accumulatedMonth + ' - накопления за месяц');

    let budgetDay = accumulatedMonth / 30;

    let getTargetMonth = function() {
        return Math.ceil(mission / accumulatedMonth);
    }



    console.log('Период равен ' + period + ' месяцев');
    console.log('Цель заработать ' + mission + ' рублей');

    if (getTargetMonth() < 0) {
        console.log('Цель не будет достигнута')
    } else {
        console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев');
    }

    console.log('Бюджет на день составит ' + budgetDay + ' рублей');

    let getStatusIncome = function() {
        if(budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (budgetDay < 1200 && budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (budgetDay < 600) {
            return ('Ваш уровень дохода ниже среднего');
        } else if (budgetDay <= 0) {
            return ('Что-то пошло не так');
        }
    };

    console.log(getStatusIncome());

    console.log(addExpenses.toLowerCase().split(','));
