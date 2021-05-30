// P(1 + R/100)n -p

const calculate = document.querySelector(".calculate");

const totalLoan = document.querySelector("#total-loan");
const interestRate = document.querySelector("#interest-rate");
const payingAmount = document.querySelector("#paying-amount");
const resultDiv = document.querySelector(".results ul");


let p,x,r, remainingLoan,  montlhyLoanPayment;

calculate.addEventListener("click", calculateData);


function calculateData(){
	resultDiv.innerHTML = `<h5>Calculating Data. Please Wait...</h5>`

	p = parseFloat(totalLoan.value);
	remainingLoan = parseFloat(totalLoan.value);

	r = parseFloat(interestRate.value);
	x = parseFloat(payingAmount.value);

	resultDiv.innerHTML = `<li><h5> Your monthly interest of this month is: ${calculateInterest(true)} </h5></li>`;
const g = timeToClearLoan();
	resultDiv.innerHTML +=  `<li><h5>Time to clear loan is: ${g.year} years and ${g.month} months</h5></li>`;
	resultDiv.innerHTML += `<li><h5> Your monthly interest of upcoming month is: ${calculateInterest(true)} </h5></li>`
	resultDiv.innerHTML += `<li><h5> You have to pay total price ${(g.year * 12 + g.month) * x } to clear the debt </h5></li>`


}

function calculateInterest(main){
	console.log(remainingLoan)
	const interest = main ? [remainingLoan * (1 + r/100)] - remainingLoan : [p * (1 + r/100)] - p;
	const monthlyInterest = interest / 12;

	return monthlyInterest > 0 ? monthlyInterest : 0 ;
}


function loanAfterMonth(){
	montlhyLoanPayment = x - calculateInterest(false);
	p = p - montlhyLoanPayment;
	return p;
}


function timeToClearLoan(){
	let monthCount = 0;
	let totalTime = { year:0, month:0};

	while(p > 0){
		p = loanAfterMonth()
		monthCount++;

	}
	remainingLoan = remainingLoan - montlhyLoanPayment;

	if(monthCount >= 12){
		totalTime.year = parseInt(monthCount / 12)
		totalTime.month = parseInt(monthCount % 12);
	}else{
		totalTime.month = monthCount;
	}


	return totalTime;
}




