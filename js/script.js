'use strict';

window.addEventListener('DOMContentLoaded', () => { 
    
    // let birthdays = {
    //     'Ivan Vas':'1987-10-20'
    // };
        let birthdays = []; 

    let unoYear = Date.parse('2020-01-01') - Date.parse('2019-01-01'); // 31536000000 milSec per Year
    
    let form = document.querySelector('form'),
        formBirthday = form.querySelector("input[type='date']"),
        formBtnSend = form.querySelector("input[type='submit']"),
        formText = form.querySelector("input[type='text']");
        


    function getTimeRemaining(birthday) {        
        birthday = new Date(birthday);                    
        let today = new Date();        
        let remain = Date.parse(birthday) + (today.getFullYear() - birthday.getFullYear()) * unoYear  - Date.parse(today);
        if (today.getMonth() > birthday.getMonth()) { 
            remain += unoYear;                                          
        }        
        let days = Math.floor((remain / 1000 / 60 / 60 / 24)),
            hours = Math.floor((remain / 1000 / 60 / 60) % 24),
            minutes = Math.floor((remain / 1000 / 60) % 60),
            seconds = Math.floor((remain / 1000) % 60);
        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    } 
    function setClock(dateOfBirthday) {
        let birthday = document.querySelector('.birthday:last-child'),
            days = birthday.querySelector('.card__timer_days'),
            hours = birthday.querySelector('.card__timer_hours'),
            minutes = birthday.querySelector('.card__timer_minutes'),
            seconds = birthday.querySelector('.card__timer_seconds'),
            timeInterval = setInterval(upDateClock, 1000);

        function upDateClock() {
           let t = getTimeRemaining(dateOfBirthday);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
        }
    }
    
    
    
    formBtnSend.addEventListener('click', evt => {
        evt.preventDefault();
        let items = document.querySelectorAll('.birthday');
        // upDate('1987-10-20');
        if (items.length >= 3) {
            alert('Превышен лимит ввода дат');
        }
        else if (formText.value === '') {
            alert('введите корректное значение');
        }                                
        else {            
            new AddBirthday(`${formText.value}`, `${formBirthday.value}`).render();            
            birthdays.push(formBirthday.value);                
            form.reset();                
            }
        console.log(birthdays.slice(-1));
        // upDate('1987-10-20');
        setClock(birthdays.slice(-1));

        

        });
    
    class AddBirthday { //class for create a BirthDay with some metods
        constructor(name, birthday){
            this.name = name;
            this.birthday = new Date(birthday);                            
        }        
        render() { //metod for create a Birthday at HTML
            let t = getTimeRemaining(this.birthday);
            const parent = document.querySelector('.wrapper.main');
            const newBirthday = document.createElement('div');
            newBirthday.classList.add('birthday');                        
            newBirthday.innerHTML = `
                <div class="birthday__person">
                    <p>${this.name}</p>
                </div>
                <div class="timer">
                    <div class="card__timer"> 
                        <div class="card__timer_days">${t.days}</div>
                        <div class="wrap__string"></div>
                        <p>days</p>
                    </div>
                    <div class="card__timer"> 
                        <div class="card__timer_hours">${t.hours}</div>
                        <div class="wrap__string"></div>
                        <p>hours</p>
                    </div>
                    <div class="card__timer">
                        <div class="card__timer_minutes">${t.minutes}</div>
                        <div class="wrap__string"></div>
                        <p>minutes</p>
                    </div>
                    <div class="card__timer">
                        <div class="card__timer_seconds">${t.seconds}</div>
                        <div class="wrap__string"></div>
                        <p>seconds</p>
                    </div>
                </div>
            `;            
            parent.insertAdjacentElement("beforeend", newBirthday);                                                          
        } 
    }
    new AddBirthday('Ivan Vas', '1987-10-20').render();
    
    
    // new AddEvent('Ivan Vas', '1987-10-20');
    





     

    



});