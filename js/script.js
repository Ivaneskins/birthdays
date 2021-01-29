'use strict';

window.addEventListener('DOMContentLoaded', () => { 
    
    let birthdays = {
        'Ivan Vas':'1987-10-20'
    };

    let unoYear = Date.parse('2020-01-01') - Date.parse('2019-01-01'); // 31536000000 milSec per Year

    let my = new Date(birthdays['Ivan Vas']); // My birthday 
    

    let form = document.querySelector('form'),
        formBirthday = form.querySelector("input[type='date']"),
        formBtnSend = form.querySelector("input[type='submit']"),
        formText = form.querySelector("input[type='text']");
    
        formBtnSend.addEventListener('click', evt => {
            evt.preventDefault();           
            
            my = new Date(formBirthday.value);
            console.log(my);            
            setCloak('.timer', my);
            
    });  

    function leftUntilBirthday(birthday) {
        let today = new Date();
        
        let remain = Date.parse(birthday) + (today.getFullYear() - birthday.getFullYear()) * unoYear  - Date.parse(today);
        if (today.getMonth() > birthday.getMonth()) { 
            remain += unoYear;                                          
        }
        // console.log(today);         
        let days = Math.floor((remain / 1000 / 60 / 60 / 24)),
            hours = Math.floor((remain / 1000 / 60 / 60) % 24),
            minutes = Math.floor((remain / 1000 / 60) % 60),
            seconds = Math.floor((remain / 1000) % 60);
        return {
            'total': remain,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
            };  
        }    
    function setCloak(selector, birthday) {        
            
        const timer = document.querySelector(selector),
              days = timer.querySelector('.card__timer_days'),
              hours = timer.querySelector('.card__timer_hours'),
              minutes = timer.querySelector('.card__timer_minutes'),
              seconds = timer.querySelector('.card__timer_seconds'), 
              timerInterval = setInterval(updateCloak, 1000); 
              updateCloak();             
              
        function updateCloak() {
            const t = leftUntilBirthday(birthday);
            days.innerHTML = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;                              
        }
    }      

    setCloak('.timer', my);



     

    



});