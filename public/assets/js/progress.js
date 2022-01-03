const  Btnprevious  =  document.getElementById('Previous');
const  Btnnext  =  document.getElementById('Next');
const  Btnsubmit  =  document.getElementById('Submit');
const  bullets  =  [...document.querySelectorAll('.bullets')]; 
const  final = document.getElementById('last')

let current = 0;
const max = 7;


Btnprevious.style.display  =  'none';
Btnsubmit.style.display  =  'none'; 

Btnnext.addEventListener('click',  ()  =>  {
    
    Btnprevious.style.display  =  'inline';
    if  (current  ===  max)  {
        final.style =" color: white; background-color: #0011ff;"
        Btnnext.style.display  =  'none';
        Btnsubmit.style.display  =  'inline';
    }
    else{
        bullets[current].classList.add('completed');
        current  +=  1;

    }
}); 

Btnprevious.addEventListener('click',  ()  =>  {
    bullets[current  -  1].classList.remove('completed');
    current  -=  1;
    Btnsubmit.style.display  =  'none';
    Btnnext.style.display  =  'inline';
    if  (current  ===  0)  {
        Btnprevious.style.display  =  'none';
    }
}); 

Btnsubmit.addEventListener('click',  ()  =>  {
    location.reload();
}); 