// fetching all categories
const getAllCategories = () => {
    fetch( "https://openapi.programming-hero.com/api/categories#" )
        .then( response => response.json() )
        .then( allCategoriesData => {
            displayAll(allCategoriesData)
        })
}


// displaying all categories
const displayAll = data => {
  const categoriesArr = data.categories
  
    const allCategoriesContainer = document.getElementById( 'all-categories-container' )
    categoriesArr.forEach(categoryItem => {
        const category = categoryItem.category_name
        const treeCategory = document.createElement( 'li' )
        treeCategory.innerHTML = `
               
                <li
                  
                  class="trees hover:bg-[#15803d] hover:text-white rounded-lg text-lg/4 pl-0"
                >
                  <a>${category}</a>
                </li>
        `
      allCategoriesContainer.appendChild( treeCategory )
    } );
  const treesClasses = document.querySelectorAll( '.trees' )
  treesClasses.forEach( ( categoryName ) => {


    categoryName.addEventListener( 'click', () => {
      
      // if category is Fruit Tree
      if ( categoryName.innerText == 'Fruit Tree' ) {
        const cardContainer = document.getElementById( "card-container" )
        cardContainer.innerHTML = ''
        fetch( 'https://openapi.programming-hero.com/api/category/1' )
          .then( res => res.json() )
          .then( plants => {
            const fruitPlantsArr = plants.plants


            fruitPlantsArr.forEach( fruitTree => {

              const tree = document.createElement( 'div' )
              tree.innerHTML = `
              
              <div class="card bg-base-100 shadow-sm rounded-xl p-5">
              <figure class="rounded-xl h-[300px]">
                <img
                  src="${fruitTree.image}"
                  alt=""
                  class="rounded-xl block"
                />
              </figure>
              <div class="card-body p-0">
                <h2 id="${fruitTree.id}" class="card-title mt-3 cursor-pointer">${fruitTree.name}</h2>
                <p>
                  ${fruitTree.description}
                </p>

                <div class="flex justify-between my-2">
                  <p
                    class="category bg-[#dcfce7] text-center font-medium text-lg rounded-3xl text-[#15803d] w-5 py-1"
                  >
                    ${fruitTree.category}
                  </p>
                  <p class="price text-right font-bold text-lg">
                    $ <span>${fruitTree.price}</span>
                  </p>
                </div>

                <div class="card-actions justify-end">
                  <button
                    id="${fruitTree.id}"
                    class="cart-btn btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              `
              cardContainer.appendChild( tree )
            }
          )
            // card append end
            


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
                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end

            // card title click event
            const cardTitle = document.querySelectorAll('.card-title')
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  const treeId = title.getAttribute( 'id' )

                  // fetching tree data by id after clickig title
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        displayTree(data)
                      })
                  }

                  getTree( treeId )
                  const displayTree = (data) => {
                    const treeDt = data.plants
                    
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">${treeDt.name}</h3>
                      <img src="${treeDt.image}" class="h-[300px] w-full object-cover rounded-lg">
                      <p class="py-1 cursor-pointer"><span class="font-bold">Category: </span>${treeDt.category}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price: </span>${treeDt.price}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description: </span>${treeDt.description}</p>
                    </div>
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                    
                  }

                }
              )
              } )
            
            
          } )
      } 
      // if fruits ends

      // if category is Flowering Tree
      if ( categoryName.innerText == 'Flowering Tree' ) {
        const cardContainer = document.getElementById( "card-container" )
        cardContainer.innerHTML = ''
        fetch( 'https://openapi.programming-hero.com/api/category/2' )
          .then( res => res.json() )
          .then( plants => {
            const fruitPlantsArr = plants.plants
            fruitPlantsArr.forEach( fruitTree => {
              const tree = document.createElement( 'div' )
              tree.innerHTML = `
              
              <div class="card bg-base-100 shadow-sm rounded-xl p-5">
              <figure class="rounded-xl h-[250px]">
                <img
                  src="${fruitTree.image}"
                  alt=""
                  class="rounded-xl block card-img"
                />
              </figure>
              <div class="card-body p-0">
                <h2 id="${fruitTree.id}" class="card-title mt-3 cursor-pointer">${fruitTree.name}</h2>
                <p>
                  ${fruitTree.description}
                </p>

                <div class="flex justify-between my-2">
                  <p
                    class="category bg-[#dcfce7] text-center font-medium text-lg rounded-3xl text-[#15803d] w-5 py-1"
                  >
                    ${fruitTree.category}
                  </p>
                  <p class="price text-right font-bold text-lg">
                    $ <span>${fruitTree.price}</span>
                  </p>
                </div>

                <div class="card-actions justify-end">
                  <button
                    id="${fruitTree.id}"
                    class="cart-btn btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

            } )
            // card append end




            // newwwwwwwwwwwwwwww flower
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
                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end
            
            
            // card title click event
            const cardTitle = document.querySelectorAll( '.card-title' )
            // console.log(cardTitle)
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  const treeId = title.getAttribute( 'id' )
                  
                  // fetching tree data after clickig title by id
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        displayTree(data)
                      })
                  }

                  getTree( treeId )
                  const displayTree = (data) => {
                    const treeDt = data.plants
                    
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">${treeDt.name}</h3>
                      <img src="${treeDt.image}" class="h-[300px] w-full object-cover rounded-lg">
                      <p class="py-1 cursor-pointer"><span class="font-bold">Category: </span>${treeDt.category}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price: </span>${treeDt.price}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description: </span>${treeDt.description}</p>
                    </div>
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                    
                  }

                }
              )
              } )
            // end card title event
            

        })
      }
      // if Flowering Tree ends


      // if category is Shade Tree
      if ( categoryName.innerText == 'Shade Tree' ) {
        const cardContainer = document.getElementById( "card-container" )
        cardContainer.innerHTML = ''
        fetch( 'https://openapi.programming-hero.com/api/category/3' )
          .then( res => res.json() )
          .then( plants => {
            const fruitPlantsArr = plants.plants
            fruitPlantsArr.forEach( fruitTree => {
              const tree = document.createElement( 'div' )
              tree.innerHTML = `
              
              <div class="card bg-base-100 shadow-sm rounded-xl p-5">
              <figure class="rounded-xl h-[250px]">
                <img
                  src="${fruitTree.image}"
                  alt=""
                  class="rounded-xl block"
                />
              </figure>
              <div class="card-body p-0">
                <h2 id="${fruitTree.id}" class="card-title mt-3 cursor-pointer">${fruitTree.name}</h2>
                <p>
                  ${fruitTree.description}
                </p>

                <div class="flex justify-between my-2">
                  <p
                    class="category bg-[#dcfce7] text-center font-medium text-lg rounded-3xl text-[#15803d] w-5 py-1"
                  >
                    ${fruitTree.category}
                  </p>
                  <p class="price text-right font-bold text-lg">
                    $ <span>${fruitTree.price}</span>
                  </p>
                </div>

                <div class="card-actions justify-end">
                  <button
                    id="${fruitTree.id}"
                    class="cart-btn btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

            } )
            // card append end


            // newwwwwwwwwwwwwwwwwwwwwwww shade
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
                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end

            // card title click event
            const cardTitle = document.querySelectorAll( '.card-title' )
            // console.log(cardTitle)
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  const treeId = title.getAttribute( 'id' )
                  
                  // fetching tree data after clickig title by id
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        displayTree(data)
                      })
                  }

                  getTree( treeId )
                  const displayTree = (data) => {
                    const treeDt = data.plants
                    
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">${treeDt.name}</h3>
                      <img src="${treeDt.image}" class="h-[300px] w-full object-cover rounded-lg">
                      <p class="py-1 cursor-pointer"><span class="font-bold">Category: </span>${treeDt.category}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price: </span>${treeDt.price}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description: </span>${treeDt.description}</p>
                    </div>
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                    
                  }

                }
              )
              } )
            // end card title event

        })
      }
      // if Shade Tree ends


      // if category is Meidcinal Tree
      if ( categoryName.innerText == 'Medicinal Tree' ) {
        const cardContainer = document.getElementById( "card-container" )
        cardContainer.innerHTML = ''
        fetch( 'https://openapi.programming-hero.com/api/category/4' )
          .then( res => res.json() )
          .then( plants => {
            const fruitPlantsArr = plants.plants
            fruitPlantsArr.forEach( fruitTree => {
              const tree = document.createElement( 'div' )
              tree.innerHTML = `
              
              <div class="card bg-base-100 shadow-sm rounded-xl p-5">
              <figure class="rounded-xl h-[250px]">
                <img
                  src="${fruitTree.image}"
                  alt=""
                  class="rounded-xl block"
                />
              </figure>
              <div class="card-body p-0">
                <h2 id="${fruitTree.id}" class="card-title mt-3 cursor-pointer">${fruitTree.name}</h2>
                <p>
                  ${fruitTree.description}
                </p>

                <div class="flex justify-between my-2">
                  <p
                    class="category bg-[#dcfce7] text-center font-medium text-lg rounded-3xl text-[#15803d] w-5 py-1"
                  >
                    ${fruitTree.category}
                  </p>
                  <p class="price text-right font-bold text-lg">
                    $ <span>${fruitTree.price}</span>
                  </p>
                </div>

                <div class="card-actions justify-end">
                  <button
                    id="${fruitTree.id}"
                    class="cart-btn btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)
            } )
            // card append end


            // newwwwwwwwwwwwwwwwwwww medicinal
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
                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end

            // card title click event
            const cardTitle = document.querySelectorAll( '.card-title' )
            // console.log(cardTitle)
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  const treeId = title.getAttribute( 'id' )
                  
                  // fetching tree data after clickig title by id
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        displayTree(data)
                      })
                  }

                  getTree( treeId )
                  const displayTree = (data) => {
                    const treeDt = data.plants
                    
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">${treeDt.name}</h3>
                      <img src="${treeDt.image}" class="h-[300px] w-full object-cover rounded-lg">
                      <p class="py-1 cursor-pointer"><span class="font-bold">Category: </span>${treeDt.category}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price: </span>${treeDt.price}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description: </span>${treeDt.description}</p>
                    </div>
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                    
                  }

                }
              )
              } )
            // end card title event
        })
      }
      // if Medicinal Tree ends


      // if category is Timber Tree
      if ( categoryName.innerText == 'Timber Tree' ) {
        const cardContainer = document.getElementById( "card-container" )
        cardContainer.innerHTML = ''
        fetch( 'https://openapi.programming-hero.com/api/category/5' )
          .then( res => res.json() )
          .then( plants => {
            const fruitPlantsArr = plants.plants
            fruitPlantsArr.forEach( fruitTree => {
              const tree = document.createElement( 'div' )
              tree.innerHTML = `
              
              <div class="card bg-base-100 shadow-sm rounded-xl p-5">
              <figure class="rounded-xl h-[250px]">
                <img
                  src="${fruitTree.image}"
                  alt=""
                  class="rounded-xl block"
                />
              </figure>
              <div class="card-body p-0">
                <h2 id="${fruitTree.id}" class="card-title mt-3 cursor-pointer">${fruitTree.name}</h2>
                <p>
                  ${fruitTree.description}
                </p>

                <div class="flex justify-between my-2">
                  <p
                    class="category bg-[#dcfce7] text-center font-medium text-lg rounded-3xl text-[#15803d] w-5 py-1"
                  >
                    ${fruitTree.category}
                  </p>
                  <p class="price text-right font-bold text-lg">
                    $ <span>${fruitTree.price}</span>
                  </p>
                </div>

                <div class="card-actions justify-end">
                  <button
                    id="${fruitTree.id}"
                    class="cart-btn btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)
            } )
            // card append end


            // newwwwwwwwwwwwwwwwww  Timber 
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
                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end




            // card title click event
            const cardTitle = document.querySelectorAll( '.card-title' )
            // console.log(cardTitle)
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  const treeId = title.getAttribute( 'id' )
                  
                  // fetching tree data after clickig title by id
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        displayTree(data)
                      })
                  }

                  getTree( treeId )
                  const displayTree = (data) => {
                    const treeDt = data.plants
                    
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">${treeDt.name}</h3>
                      <img src="${treeDt.image}" class="h-[300px] w-full object-cover rounded-lg">
                      <p class="py-1 cursor-pointer"><span class="font-bold">Category: </span>${treeDt.category}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price: </span>${treeDt.price}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description: </span>${treeDt.description}</p>
                    </div>
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                    
                  }

                }
              )
              } )
            // end card title event
        })
      }
      // if Timber Tree ends


      // if category is Evergreen Tree
      if ( categoryName.innerText == 'Evergreen Tree' ) {
        const cardContainer = document.getElementById( "card-container" )
        cardContainer.innerHTML = ''
        fetch( 'https://openapi.programming-hero.com/api/category/6' )
          .then( res => res.json() )
          .then( plants => {
            const fruitPlantsArr = plants.plants
            fruitPlantsArr.forEach( fruitTree => {
             
              const tree = document.createElement( 'div' )
              tree.innerHTML = `
              
              <div class="card bg-base-100 shadow-sm rounded-xl p-5">
              <figure class="rounded-xl h-[250px]">
                <img
                  src="${fruitTree.image}"
                  alt=""
                  class="rounded-xl block"
                />
              </figure>
              <div class="card-body p-0">
                <h2 id="${fruitTree.id}" class="card-title mt-3 cursor-pointer">${fruitTree.name}</h2>
                <p>
                  ${fruitTree.description}
                </p>

                <div class="flex justify-between my-2">
                  <p
                    class="category bg-[#dcfce7] text-center font-medium text-lg rounded-3xl text-[#15803d] w-5 py-1"
                  >
                    ${fruitTree.category}
                  </p>
                  <p class="price text-right font-bold text-lg">
                    $ <span>${fruitTree.price}</span>
                  </p>
                </div>

                <div class="card-actions justify-end">
                  <button
                    id="${fruitTree.id}"
                    class="cart-btn btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)
            } )
            // card append end



            // newwwwwwwwwwwwwwwwwwwwwwwww evergreen
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
                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end



            // card title click event
            const cardTitle = document.querySelectorAll( '.card-title' )
            // console.log(cardTitle)
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  const treeId = title.getAttribute( 'id' )
                  
                  // fetching tree data after clickig title by id
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        displayTree(data)
                      })
                  }

                  getTree( treeId )
                  const displayTree = (data) => {
                    const treeDt = data.plants
                    
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">${treeDt.name}</h3>
                      <img src="${treeDt.image}" class="h-[300px] w-full object-cover rounded-lg">
                      <p class="py-1 cursor-pointer"><span class="font-bold">Category: </span>${treeDt.category}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price: </span>${treeDt.price}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description: </span>${treeDt.description}</p>
                    </div>
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                    
                  }

                }
              )
              } )
            // end card title event
        })
      }
      // if Evergreen Tree ends


      // if category is Ornamental Plant
      if ( categoryName.innerText == 'Ornamental Plant' ) {
        const cardContainer = document.getElementById( "card-container" )
        cardContainer.innerHTML = ''
        fetch( 'https://openapi.programming-hero.com/api/category/7' )
          .then( res => res.json() )
          .then( plants => {
            const fruitPlantsArr = plants.plants
            fruitPlantsArr.forEach( fruitTree => {
              
              const tree = document.createElement( 'div' )
              tree.innerHTML = `
              
              <div class="card bg-base-100 shadow-sm rounded-xl p-5">
              <figure class="rounded-xl h-[250px]">
                <img
                  src="${fruitTree.image}"
                  alt=""
                  class="rounded-xl block"
                />
              </figure>
              <div class="card-body p-0">
                <h2 id="${fruitTree.id}" class="card-title mt-3 cursor-pointer">${fruitTree.name}</h2>
                <p>
                  ${fruitTree.description}
                </p>

                <div class="flex justify-between my-2">
                  <p
                    class="category bg-[#dcfce7] text-center font-medium text-lg rounded-3xl text-[#15803d] w-5 py-1"
                  >
                    ${fruitTree.category}
                  </p>
                  <p class="price text-right font-bold text-lg">
                    $ <span>${fruitTree.price}</span>
                  </p>
                </div>

                <div class="card-actions justify-end">
                  <button
                    id="${fruitTree.id}"
                    class="cart-btn btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)
            } )
            // card append end




            // newwwwwwwwwwwwww ornamenteal
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
                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end




            // card title click event
            const cardTitle = document.querySelectorAll( '.card-title' )
            // console.log(cardTitle)
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  const treeId = title.getAttribute( 'id' )
                  
                  // fetching tree data after clickig title by id
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        displayTree(data)
                      })
                  }

                  getTree( treeId )
                  const displayTree = (data) => {
                    const treeDt = data.plants
                    
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">${treeDt.name}</h3>
                      <img src="${treeDt.image}" class="h-[300px] w-full object-cover rounded-lg">
                      <p class="py-1 cursor-pointer"><span class="font-bold">Category: </span>${treeDt.category}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price: </span>${treeDt.price}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description: </span>${treeDt.description}</p>
                    </div>
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                    
                  }

                }
              )
              } )
            // end card title event
        })
      }
      // if Ornamental Plant ends


      // if category is Bamboo
      if ( categoryName.innerText == 'Bamboo' ) {
        const cardContainer = document.getElementById( "card-container" )
        cardContainer.innerHTML = ''
        fetch( 'https://openapi.programming-hero.com/api/category/8' )
          .then( res => res.json() )
          .then( plants => {
            const fruitPlantsArr = plants.plants
            fruitPlantsArr.forEach( fruitTree => {
              const tree = document.createElement( 'div' )
              tree.innerHTML = `
              
              <div class="card bg-base-100 shadow-sm rounded-xl p-5">
              <figure class="rounded-xl h-[250px]">
                <img
                  src="${fruitTree.image}"
                  alt=""
                  class="rounded-xl block"
                />
              </figure>
              <div class="card-body p-0">
                <h2 id="${fruitTree.id}" class="card-title mt-3 cursor-pointer">${fruitTree.name}</h2>
                <p>
                  ${fruitTree.description}
                </p>

                <div class="flex justify-between my-2">
                  <p
                    class="category bg-[#dcfce7] text-center font-medium text-lg rounded-3xl text-[#15803d] w-5 py-1"
                  >
                    ${fruitTree.category}
                  </p>
                  <p class="price text-right font-bold text-lg">
                    $ <span>${fruitTree.price}</span>
                  </p>
                </div>

                <div class="card-actions justify-end">
                  <button
                    id="${fruitTree.id}"
                    class="cart-btn btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

            } )
            // card append end


            // newwwwwwwwwwwww bamboo
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
                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end


            // card title click event
            const cardTitle = document.querySelectorAll( '.card-title' )
            // console.log(cardTitle)
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  const treeId = title.getAttribute( 'id' )
                  
                  // fetching tree data after clickig title by id
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        displayTree(data)
                      })
                  }

                  getTree( treeId )
                  const displayTree = (data) => {
                    const treeDt = data.plants
                    
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">${treeDt.name}</h3>
                      <img src="${treeDt.image}" class="h-[300px] w-full object-cover rounded-lg">
                      <p class="py-1 cursor-pointer"><span class="font-bold">Category: </span>${treeDt.category}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price: </span>${treeDt.price}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description: </span>${treeDt.description}</p>
                    </div>
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                    
                  }

                }
              )
              } )
            // end card title event
        })
      }
      // if Bamboo ends


      // if category is Climber Tree
      if ( categoryName.innerText == 'Climber' ) {
        const cardContainer = document.getElementById( "card-container" )
        cardContainer.innerHTML = ''
        fetch( 'https://openapi.programming-hero.com/api/category/9' )
          .then( res => res.json() )
          .then( plants => {
            const fruitPlantsArr = plants.plants
            fruitPlantsArr.forEach( fruitTree => {
              
              const tree = document.createElement( 'div' )
              tree.innerHTML = `
              
              <div class="card bg-base-100 shadow-sm rounded-xl p-5">
              <figure class="rounded-xl h-[250px]">
                <img
                  src="${fruitTree.image}"
                  alt=""
                  class="rounded-xl block"
                />
              </figure>
              <div class="card-body p-0">
                <h2 id="${fruitTree.id}" class="card-title mt-3 cursor-pointer">${fruitTree.name}</h2>
                <p>
                  ${fruitTree.description}
                </p>

                <div class="flex justify-between my-2">
                  <p
                    class="category bg-[#dcfce7] text-center font-medium text-lg rounded-3xl text-[#15803d] w-5 py-1"
                  >
                    ${fruitTree.category}
                  </p>
                  <p class="price text-right font-bold text-lg">
                    $ <span>${fruitTree.price}</span>
                  </p>
                </div>

                <div class="card-actions justify-end">
                  <button
                    id="${fruitTree.id}"
                    class="cart-btn btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

            } )
            
            // card append end


            // newwwwwwwwww climber
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
                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end



            // card title click event
            const cardTitle = document.querySelectorAll( '.card-title' )
            // console.log(cardTitle)
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  const treeId = title.getAttribute( 'id' )
                  
                  // fetching tree data after clickig title by id
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        displayTree(data)
                      })
                  }

                  getTree( treeId )
                  const displayTree = (data) => {
                    const treeDt = data.plants
                    
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">${treeDt.name}</h3>
                      <img src="${treeDt.image}" class="h-[300px] w-full object-cover rounded-lg">
                      <p class="py-1 cursor-pointer"><span class="font-bold">Category: </span>${treeDt.category}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price: </span>${treeDt.price}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description: </span>${treeDt.description}</p>
                    </div>
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                    
                  }

                }
              )
              } )
            // end card title event
        })
      }
      // if Climber ends


      // if category is Aquatic Plant
      if ( categoryName.innerText == 'Aquatic Plant' ) {
        const cardContainer = document.getElementById( "card-container" )
        cardContainer.innerHTML = ''
        fetch( 'https://openapi.programming-hero.com/api/category/10' )
          .then( res => res.json() )
          .then( plants => {
            const fruitPlantsArr = plants.plants
            fruitPlantsArr.forEach( fruitTree => {
              const tree = document.createElement( 'div' )
              tree.innerHTML = `
              
              <div class="card bg-base-100 shadow-sm rounded-xl p-5">
              <figure class="rounded-xl h-[250px]">
                <img
                  src="${fruitTree.image}"
                  alt=""
                  class="rounded-xl block"
                />
              </figure>
              <div class="card-body p-0">
                <h2 id="${fruitTree.id}" class="card-title mt-3 cursor-pointer">${fruitTree.name}</h2>
                <p>
                  ${fruitTree.description}
                </p>

                <div class="flex justify-between my-2">
                  <p
                    class="category bg-[#dcfce7] text-center font-medium text-lg rounded-3xl text-[#15803d] w-5 py-1"
                  >
                    ${fruitTree.category}
                  </p>
                  <p class="price text-right font-bold text-lg">
                    $ <span>${fruitTree.price}</span>
                  </p>
                </div>

                <div class="card-actions justify-end">
                  <button
                    id="${fruitTree.id}"
                    class="cart-btn btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

            } )
            // card append end



            // nnewwwwwwwwwwwwwww  aquatic
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
                      })
                }
                // get tree fn end
                getTree(treeId)
              })
            })
            // cart btns click event end




            // card title click event
            const cardTitle = document.querySelectorAll( '.card-title' )
            // console.log(cardTitle)
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  const treeId = title.getAttribute( 'id' )
                  
                  // fetching tree data after clickig title by id
                  const getTree = ( id ) => {
                    fetch( `https://openapi.programming-hero.com/api/plant/${ treeId }` )
                      .then( res => res.json() )
                      .then( data => {
                        displayTree(data)
                      })
                  }

                  getTree( treeId )
                  const displayTree = (data) => {
                    const treeDt = data.plants
                    
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">${treeDt.name}</h3>
                      <img src="${treeDt.image}" class="h-[300px] w-full object-cover rounded-lg">
                      <p class="py-1 cursor-pointer"><span class="font-bold">Category: </span>${treeDt.category}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price: </span>${treeDt.price}</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description: </span>${treeDt.description}</p>
                    </div>
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                    
                  }

                }
              )
              } )
            // end card title event
        })
      }
      // if Aquatic Plant ends




      // category selecting effect
      treesClasses.forEach( el => {
        el.classList.remove('active')
      } )
      categoryName.classList.add('active')
    })
  })
}
getAllCategories()
