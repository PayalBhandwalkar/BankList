'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements, sort = false) {
 containerMovements.innerHTML = '';


 const movs = sort ? movements.slice()
 .sort((a, b) => a - b) : movements;


 movs.forEach(function(mov, i) {
   const type = mov > 0 ? 'deposit' : 'withdrawal';

   const html = `
   <div class="movements__row">
          <div class="movements__type
           movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov} EUR</div>
        </div>
   `;
 //atach html file to js
   containerMovements.insertAdjacentHTML
   ('afterbegin', html);

 });
};


const calcDisplayBalance = function(acc) 
{
  acc.balance = acc.movements.reduce(
    (acc,mov)=> acc + mov,0);
    labelBalance.textContent= `${acc.balance} EUR`;
};


const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc,mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} EUR`;

const out = acc.movements
.filter(mov => mov < 0)
.reduce((acc, mov)=> acc + mov, 0);
labelSumOut.textContent = `${Math.abs(out)} EUR`;

const interest = acc.movements
.filter(mov => mov > 0)
.map(deposit => (deposit * acc.interestRate) / 100)
.filter((int , i , arr) => {
  console.log(arr);
  return int >= 1;
})
.reduce((acc, int) => acc + int, 0);
labelSumInterest.textContent = `${interest} EUR`;
};


const createUsernames = function (accs) {
accs.forEach(function (acc) {
acc.username = acc.owner
.toLowerCase()
.split(' ')
.map(name =>name[0])
.join('');
});
};
createUsernames(accounts);
console.log(accounts);

const updateUI = function(acc) {
  //display movements
  displayMovements(acc.movements);

    //display balance
    calcDisplayBalance(acc);

    //summary
    calcDisplaySummary(acc);
}


//event handeler

let currrentAccount;

btnLogin.addEventListener('click', function (e) {
  console.log('LOGIN');

  e.preventDefault();

  currrentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currrentAccount);

  if(currrentAccount ?.pin === Number (inputLoginPin.
    value)) {
      
    //display UI mgs
    labelWelcome.textContent = `Welcome back, 
    ${currrentAccount.owner.split(' ')[0]
  }`;
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    
    //update ui
   updateUI(currrentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
);

inputTransferAmount.value = inputTransferTo.value = '';
console.log(amount, receiverAcc);

if (amount > 0 &&
 receiverAcc && 
 currrentAccount.balance >= amount &&
 receiverAcc.username !== currrentAccount.username
 
 ) {
   currrentAccount.movements.push(-amount);
   receiverAcc.movements.push(amount);
   console.log('Transfer valid');
 //update UI
   updateUI(currrentAccount);
 }
});

btnLoan.addEventListener('click',function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currrentAccount.movements
    .some(mov => mov >= amount*0.1)) {

      //add the movement
      currrentAccount.movements.push(amount);

      //upadte UI
      updateUI(currrentAccount);
}
      inputLoanAmount.value = '';
});


btnClose.addEventListener('click',function(e) {
  e.preventDefault();
  console.log('Delete');
  

  if(
    inputCloseUsername.value === currrentAccount.username 
    && Number(inputClosePin.value)===currrentAccount.pin)
{
  const index = accounts.findIndex(
    acc => acc.username === currrentAccount.username);

  console.log(index);

//delete account
  accounts.splice(index, 1);

  //hide UI
  containerApp.style.opacity = 0;
}

inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currrentAccount.movements, !sorted);
  sorted = !sorted;
});
/*const calcPrintBalance = function(movements) 
{
  const balance = movements.reduce((
    acc,mov)=> acc+mov,0);
    labelBalance.textContent= `${balance} EUR`;
};*/

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//for (const movement of movements) {
  /*for (const [i, movements] of movements.entries()) {
  if(movement > 0 ) {
    console.log(`Movement ${i+1}: You deposited $
    {movement}`);

  }else {
    console.log(`Movement ${i+1}: Youb withdrew $
    {Math.abs(movement)}`);
  }
}

console.log('---FOREACH---');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  }else {
    console.log(`You withdraw ${Math.abs(movement)}`);
  }
})*/

currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP',
'USD', 'EUR', 'EUR'])


const eurToUsd = 1.1;
//const movementsUSD = movements.map(function (mov) {
 // return mov * eurToUsd;
//});

const movementsUSD = movements.map(
  mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements)
movementsUSDfor.push(mov*eurToUsd);

console.log(movementsUSDfor);

const movementsDescription = movements.map(
  (mov, i , arr) => {

    `Movements ${i+1}: You ${mov>0 ? 'deposited' :
  'withdrew'} ${Math.abs(mov)}`
 
   /* if(mov>0) {
     return `Movements $(i+1): You deposited
      ${mov}`;
    }
    else {
      return(`Movements ${i+1}: You withdrew
      ${Math.abs(mov)}`);
    }*/

});
console.log(movementsDescription);

const deposits = movements.filter
(function (mov) {
  return mov>0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter
(mov => mov<0);
console.log(movements);
console.log(withdrawals);


const balance = movements.reduce((
  acc,cur)=> acc + cur, 0);
  console.log(balance);

  //with for loop

  let balance2 = 0;
  for(const mov of movements) balance2 +=mov;
  console.log(balance2);

  //Mximum value 

  const max = movements.reduce((
    acc,mov) => {
      if (acc> mov) return acc;
      else return mov;},
      movements[0]);
      console.log(max);
      

    //EUR TO USD  
     //const eurToUsd = 1.1;

     //
     const totalDepositsUSD = movements
     .filter(mov => mov > 0)
     .map(mov => mov* eurToUsd)
     .reduce((acc,mov) => acc + mov, 0);
     console.log(totalDepositsUSD);



     const firstWithdrawal = movements.find(mov => mov < 0);
     console.log(movements);
     console.log(firstWithdrawal);

     console.log(accounts);

     const account = accounts.find(
     acc => acc.owner === 'Hessica Davis');
     console.log(account);



     /////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

     //points to remember

     /*
     1- Number can be replaced by + in my code.
     2- cubic root formula = (25 ** (1/2))
     */
    // every

     /*const accountMovements = accounts.map(
      acc => acc.movements);
      console.log(accountMovements);

      const allMovements = accountMovements.flat();
      console.log(allMovements);

      const overallBalance = allMovements.reduce((acc,mov)
      => acc+mov, 0);
      console.log(overallBalance);*/
    /*
    //short //flat
    const overallBalance = accounts
    .map(acc=>acc.movements)
    .flat()
    .reduce((acc, mov) => acc+mov, 0);
    console.log(overallBalance);
    
    //flat map
    const overallBalance = accounts
    .flatmap(acc=>acc.movements)
    .reduce((acc, mov) => acc+mov, 0);
    console.log(overallBalance);
    */
   /* //sorting with strings
    const owners = ['Jonas','Zach','Adam','Martha'];
    console.log(owners.sort());
    console.log(owners);

    //sorting with numbers
    console.log(movements);
    //ascending
    movements.sort((a, b) => {
    if(a > b) return 1;
    if(a < b) return -1;
    });
    console.log(movements);

    //desending
    movements.sort((a, b) => {
      if(a > b) return -1;
      if(a < b) return 1;
      });
      console.log(movements);*/







      //Challenge 1

/*const checkDogs = function(dogsJulia, dogsKate){
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0,1);
  dogsJuliaCorrected.splice(-2);
  console.log(dogsJuliaCorrected);

  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);


  dogs.forEach(function(dog,i) {
    if (dog >= 3) {
    console.log(`Dog Number ${i+1} is an 
    adult, and is ${dog} years old`);
     }
     else {
       console.log(`Dog number ${i+1} is
       still a puppy 🐶`)
     }
  });
};
checkDogs([3,5,2,12,7], [4,1,15,8,3]);*/

//challenge 2

/*const calcAverageHumanAge = function(ages) {
  const humanAges = ages.map(
  age => age <= 2 ? 2 * age: 16 + age * 4);
  
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);

  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

  return average;

};
const avg1 = calcAverageHumanAge([5,2,4,1,15,8,3]);
const avg2 = calcAverageHumanAge([16,6,10,5,6,1,4]);
console.log(avg1, avg2);*/


