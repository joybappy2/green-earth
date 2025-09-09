// cart btns click event starts
            const cartButtons = document.querySelectorAll('.cart-btn')
            cartButtons.forEach( button => {
              button.addEventListener( 'click', () => {
                // console.log( button )
                const treeId = button.getAttribute( 'id' )


                // fetching tree data by id after clickig title
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        const treePrice = data.plants.price
                        const treeName = data.plants.name
                        // console.log( treePrice, treeName )
                        
                        // gettin cart container
                        const cartContainer = document.getElementById( 'cart-card-container' )
                        // cartContainer.innerHTML = ''

                        // creating card
                        const cartCard = document.createElement( 'div' )
                        cartCard.setAttribute('id', "pawa-geche")
                        cartCard.innerHTML = `
                        
                        <div class="flex justify-between items-center p-3 bg-[#f0fdf4] rounded-xl">
                          <div>
                            <h2 class="font-medium text-lg">${treeName}</h2>
                            <p class="text-xl text-gray-500">
                              $ <span class="tree-price">${treePrice}</span> x <span>1</span>
                            </p>
                          </div>
                         <p class="text-gray-500 text-2xl remove-item cursor-pointer">x</p>
                        </div>
                        
                        `

                        // append cart card
                        cartContainer.appendChild( cartCard )

                        // accessing all price in container
                        let totalPrice = 0
                        const priceList = document.querySelectorAll( '.tree-price' )
                        priceList.forEach( price => {
                          const priceN = parseInt( price.innerText )
                          // console.log(priceN)
                          totalPrice += priceN
                        } )
                        
                        const totalDefaultPrice = document.getElementById( 'total-default-price' )
                        totalDefaultPrice.innerText = totalPrice
                        
                        // console.log(cartContainer)
                        // end



                        // const removeItem = document.querySelectorAll('.remove-item')
                        // removeItem.forEach( item => {
                        //   item.addEventListener( 'click', ( e ) => {
                        //     const removeItemParent = item.parentNode
                        //     // console.log( removeItemParent )
                        //     const removedPriceItem = removeItemParent.querySelector( ".tree-price" )
                        //     const removedPriceN = parseInt(removedPriceItem.innerText)

                        //     const totalDefaultPrice = document.getElementById( 'total-default-price' )
                        //     let totalDefaultPriceN = parseInt( totalDefaultPrice.innerText )
                        
                        //     if ( totalDefaultPriceN > 0 ) {
                              
                        //       totalDefaultPriceN -= removedPriceN
                        //     }
                        //     totalDefaultPrice.innerText = totalDefaultPriceN
                            
                            
                        //     const cartoParent = document.getElementById('cart-card-container')
                        //     const cartoCart = item.parentNode.parentNode
                        //     // console.log( cartoCart )
                        //     // console.log(cartoParent)
                        //     cartoParent.removeChild(cartoCart)
                            
                        //   })
                        // } )
                        


                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end