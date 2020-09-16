

/*Funcionalidad pare el overlay de cargas de paginas */

document.body.style.overflow ='hidden'

window.onload = function() {
    
    document.body.style.overflowY ='scroll'
    document.querySelector('.overlay-load').style.opacity = 0
    document.querySelector('.overlay-load').style.display = 'none'
};


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

    let active = true;

    document.querySelectorAll('.el').forEach( function(el){
        el.style.opacity = 0
    });

    window.addEventListener('scroll', (e) => {
        //Control de botón up
        posicionScroll = window.pageYOffset;

        if(document.querySelector('.list-all') != null || document.querySelector('.list-all') != undefined) {

            /*Animar las cards en el index*/

            if(scrollY >= (document.querySelector('.list-all').offsetTop - 400 ) ) {
                
                if(active) {
    
                    active = false
                    anime({
                        targets: '.cards-content .el',
                        translateY: 25,
                        direction: 'alternate',
                        // delay: anime.stagger(100) // increase delay by 100ms for each elements.
                        duration: 500,
                        delay: anime.stagger(100)
                        // loop: true
                    });
                    anime({
                        targets: '.cards-content .el',
                        opacity: 1,
                        // delay: anime.stagger(100) // increase delay by 100ms for each elements.
                        duration: 300,
                        delay: anime.stagger(100)
                        // loop: true
                    });
    
                }
    
            }
        }
        

        //Control del boton para asignar el comportamiento 
        
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

    /*Scroll a la sección de contacto*/
    document.querySelector('.contact-link').addEventListener('click', function() {
    
        window.scrollBy({ 
            top: document.querySelector('.contact').offsetTop, // could be negative value
            left: 0, 
            behavior: 'smooth' 
        });

    })
    

    /*Animaciones para los links en el menú */

    // ** FADE OUT FUNCTION **
    function fadeOut(el) {
        el.style.opacity = 1;
        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    };

    fadeOut(document.querySelector('.dropdown-menu'))
 

    // ** FADE IN FUNCTION **
    function fadeIn(el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";
        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    };

    function scaleIn(el) {
        let scale = 0;
        (function fade() {
            
            if ( !((scale += .1) > 1) ) {
                
                document.querySelector(el).style.transform = 'scale('+ parseFloat(scale) +')'
                requestAnimationFrame(fade);
                
            } 

        })(); 
    }

    function scaleOut(el) {
        let scale = 1;
        (function fade() {
            console.log( scale -= .1 );

            if ( !((scale -= .1) < 0) ) {
                
                document.querySelector(el).style.transform = 'scale('+ parseFloat(scale) +')'
                requestAnimationFrame(fade);

            } 

        })(); 
    }

    
    
    
    $('.dropdown').on('show.bs.dropdown', function () {
        
        scaleIn('.dropdown-menu')
        fadeIn(document.querySelector('.dropdown-menu'), 'block')
        // do something...
    })
    
    $('.dropdown').on('hide.bs.dropdown', function () {
        scaleOut('.dropdown-menu')
        fadeOut(document.querySelector('.dropdown-menu'))
        // do something...
    })

    /*Animaciones y funcionalidades para el catálogo individual de un producto */

    const btnRight = document.querySelector('.glide__arrow--right');
    const btnLeft = document.querySelector('.glide__arrow--left');
    const divisionBar = document.querySelector('.division-selector'); 
    let selectImg = document.getElementById('img-select'); 
    let imgOnModal = document.getElementById('imgOnModal');

    /*Control del carousel del producto */
    if(btnRight != null || btnRight != undefined) {

        let actualImg = document.querySelector('.glide__slide--active').children; 

        btnRight.addEventListener('click', function(e) {
    
        //    console.log( document.querySelector('.glide__slide--active').style.width ); 
           fadeIn(selectImg, 'block')
           selectImg.src = actualImg[0].src
           
        })
        
        btnLeft.addEventListener('click', function(e) {
            
            fadeIn(selectImg, 'block')
            selectImg.src = actualImg[0].src
            
        })

        /* Ancho de la barra que va sobre la lista de imagenes en el catologo del producto */
        divisionBar.style.width = document.querySelector('.glide__slide--active').style.width

        function resizeDivison() {
            // heightOutput.textContent = window.innerHeight;
            // widthOutput.textContent = window.innerWidth;        
    
            divisionBar.style.width = document.querySelector('.glide__slide--active').style.width
        }
    
        window.addEventListener('resize', resizeDivison);
    }





    /*Abrir el modal para la descripcion del artículo */

    if(document.querySelector('.image-description') != null || document.querySelector('.image-description') != undefined ) {

        document.querySelector('.image-description').addEventListener('click', function() {
    
            imgOnModal.src = selectImg.src
            imgOnModal.style.width = '100%'
           
            $('#imageModal').modal('show')
        })
    }



}); 

