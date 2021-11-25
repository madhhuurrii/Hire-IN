	// let slider = tns({
			// 	container: '.my-slider',
			// 	items: 1,

			// 	slideBy: 'page',
			// 	autoplay: true,
			// 	nav: false,

			// 	responsive: {
			// 		640: {
			// 			items: 2
			// 		},
			// 		1000: {
			// 			items: 3
			// 		},
			// 		1400: {
			// 			items: 4
			// 		}
			// 	},
			// 	autoplayButtonOutput: false,
			// 	controlsContainer: '#controls',
			// 	prevButton: '.previous',
			// 	nextButton: '.next'
			// });
            
            function myFunction(){
                var input, filter, cards, cardContainer,  titile,i;
                input= document.getElementById("hire-explore");
                filter = input.value.toUpperCase();
                cardContainer = document.getElementById("explore-card");
                cards = cardContainer.getElementsByClassName("card");
                for(i=0;i<cards.length;i++){
                  title = cards[i].querySelector(".card-title");
                  if(title.innerText.toUpperCase().indexOf(filter)>-1){
                    cards[i].style.display="";
                  }
                  else{
                    cards[i].style.display ="none";
                  }
                }
              }
          