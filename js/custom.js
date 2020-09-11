
document.addEventListener('DOMContentLoaded', e => {



    const header = document.querySelector('.navbar'); 
    const btnUp = document.createElement('div')
    btnUp.setAttribute('class', 'btn-up');
    btnUp.id = 'btn-up'
    btnUp.style.fontSize = '2em'
    btnUp.style.opacity = '0'
    btnUp.style.transform = 'scale(0)'
    btnUp.classList.add('colorPrincipal')
    btnUp.classList.add('d-flex')
    btnUp.classList.add('justify-content-center')
    btnUp.classList.add('align-items-center')
    btnUp.innerHTML = '<i class="fas fa-arrow-up"></i>'
    document.body.appendChild(btnUp)

    let posicionScroll = 0

    //Control de botón up
    let controlBtnUp = () => {

        intervalo = setInterval(function() {

            posicionScroll -= 50; 

            if(posicionScroll === header.offsetTop || posicionScroll < 0) {
                posicionScroll = 0; 
                clearInterval(intervalo)
            }

            window.scrollTo(0, posicionScroll);

        }, 20)

    }

    window.addEventListener('scroll', (e) => {
        //Control de botón up
        posicionScroll = window.pageYOffset;

        console.log(posicionScroll);
        
        //Control del header
        
        if(scrollY > 150) {
            // header.style.backgroundColor = 'rgba(255, 255, 255, .5)'
            
            btnUp.style.cursor = 'pointer'
            btnUp.style.transform = 'scale(1)'
            btnUp.style.opacity = '1'
            btnUp.addEventListener('click', controlBtnUp)
        }else { 
            // header.style.backgroundColor = 'rgba(255, 255, 255, 1)'
            
            
            btnUp.style.opacity = '0'
            btnUp.style.cursor = 'default'
            btnUp.style.transform = 'scale(0)'
            btnUp.removeEventListener('click', controlBtnUp)
        }

        

    })
    

}); 

