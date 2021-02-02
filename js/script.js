'use strict';

window.addEventListener('DOMContentLoaded', () => { 
    
    let birthdays = {
        'Ivan Vas':'1987-10-20'
    };

    let unoYear = Date.parse('2020-01-01') - Date.parse('2019-01-01'); // 31536000000 milSec per Year
    
    let form = document.querySelector('form'),
        formBirthday = form.querySelector("input[type='date']"),
        formBtnSend = form.querySelector("input[type='submit']"),
        formText = form.querySelector("input[type='text']");
    
    
    formBtnSend.addEventListener('click', evt => {
        evt.preventDefault();
        let items = document.querySelectorAll('.birthday');

        if (items.length >= 3) {
            alert('Превышен лимит ввода дат');
        }
        else if (formText.value === '') {
            alert('введите корректное значение');
        }                                
        else {
            new AddEvent(`${formText.value}`, `${formBirthday.value}`).render();            
            birthdays[formText.value] = formBirthday.value;                
            form.reset();                
            }             
        });
    
    

    class AddEvent {
        constructor(name, birthday){
            this.name = name;
            this.birthday = new Date(birthday);              
            
            let today = new Date();        
            let remain = Date.parse(this.birthday) + (today.getFullYear() - this.birthday.getFullYear()) * unoYear  - Date.parse(today);
            if (today.getMonth() > this.birthday.getMonth()) { 
                remain += unoYear;                                          
            }                
            this.days = Math.floor((remain / 1000 / 60 / 60 / 24));
            this.hours = Math.floor((remain / 1000 / 60 / 60) % 24);
            this.minutes = Math.floor((remain / 1000 / 60) % 60);
            this.seconds = Math.floor((remain / 1000) % 60);            
        }

        render() {
            const parent = document.querySelector('.wrapper.main');
            const newBirthday = document.createElement('div');
            newBirthday.classList.add('birthday');            
            newBirthday.innerHTML = `
                <div class="birthday__person">
                    <p>${this.name}</p>
                </div>
                <div class="timer">
                    <div class="card__timer"> 
                        <div class="card__timer_days">${this.days}</div>
                        <div class="wrap__string"></div>
                        <p>days</p>
                    </div>
                    <div class="card__timer"> 
                        <div class="card__timer_hours">${this.hours}</div>
                        <div class="wrap__string"></div>
                        <p>hours</p>
                    </div>
                    <div class="card__timer">
                        <div class="card__timer_minutes">${this.minutes}</div>
                        <div class="wrap__string"></div>
                        <p>minutes</p>
                    </div>
                    <div class="card__timer">
                        <div class="card__timer_seconds">${this.seconds}</div>
                        <div class="wrap__string"></div>
                        <p>seconds</p>
                    </div>
                </div>
            `;
            parent.insertAdjacentElement("beforeend", newBirthday);            
        } 
    }
    new AddEvent('Ivan Vas', '1987-10-20').render();
    // new AddEvent('Ivan Vas', '1987-10-20');






     

    



});