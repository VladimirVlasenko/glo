document.addEventListener('DOMContentLoaded', () => {

    let money = +prompt('Ваш месячный доход?');
    let income = +10000;
    let expensesName1 = prompt('Введите название обязатальной статьи расходов в этом месяце');
    let expenses1 = +prompt('Введите расходуемую на ' + expensesName1 + ' сумму');
    let expensesName2 = prompt('Введите название обязатальной статьи расходов в этом месяце');
    let expenses2 = +prompt('Введите расходуемую на ' + expensesName2 + ' сумму');
    let addExpenses = prompt('Перечислите через запятую названия дополнительных статей расходов в этом месяце');
    // function arraySum(addExpenses) {
    //     addExpenses = prompt('Перечислите через запятую ваши возможные расходы за рассчитываемый период').split(',');
    //     var sum = 0;
    //     for(let i = 0; i < addExpenses.length; i++){
    //         sum += addExpenses[i]*1;
    //         }
    //     return sum;
    //     }

   

    let deposit = confirm('Есть ли у вас депоозит в банке?');
    let mission = +100000;
    let period = 6;



    let showTypeOf = function(data) {
        console.log(data, typeof(data));
    }
    showTypeOf(money);
    showTypeOf(income);
    showTypeOf(deposit);

    let getExpensesMonth = function() {
        return expenses1 + expenses2;
    }
    console.log(getExpensesMonth() + ' - сумма всех обязательных расходов за месяц');

    let getAccumulatedMonth = function() {
        return money + income - expenses1 - expenses2;
    }

    let accumulatedMonth = getAccumulatedMonth();
    console.log(accumulatedMonth + ' - накопления за месяц');

    let budgetDay = accumulatedMonth / 30;

    let getTargetMonth = function() {
        return Math.ceil(mission / accumulatedMonth);
    }



    console.log('Период равен ' + period + ' месяцев');
    console.log('Цель заработать ' + mission + ' рублей');
    console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев');
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

});