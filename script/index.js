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
    let mission = 100000;
    let period = 6;
    let budgetMonth = money + income - expenses1 - expenses2;
    let budgetDay = budgetMonth / 30;
    console.log(budgetMonth);
    console.log(budgetDay);
    let numMonth = Math.ceil(100000 / budgetMonth);
    console.log(numMonth);


    console.log(typeof money);
    console.log(typeof income);
    console.log(typeof deposit);


    console.log('Период равен ' + period + ' месяцев');
    console.log('Цель заработать ' + mission + ' рублей');
    console.log('Цель будет достигнута за ' + numMonth + ' месяцев');
    console.log('Бюджет на день составит ' + budgetDay + ' рублей');


    if(budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay < 1200 && budgetDay >= 600) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay < 600) {
        console.log('Ваш уровень дохода ниже среднего');
    } else if (budgetDay <= 0) {
        console.log('Что-то пошло не так');
    }

    console.log(addExpenses.toLowerCase().split(','))

});