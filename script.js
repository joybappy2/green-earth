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
                    class="btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild( tree )
            }
              // end
            )
            const cardTitle = document.querySelectorAll('.card-title')
              cardTitle.forEach( title => {
                title.addEventListener( 'click', () => {
                  // modal events start here
                  
                  const treeId = title.getAttribute( 'id' )
                  console.log(treeId)
                  if ( title.innerText == 'Mango Tree' ) {
                    const modalContainer = document.getElementById( 'my_modal_3' )
                    modalContainer.innerHTML = ''
                    const modals = document.createElement( 'div' )
                    console.log(treeId)
                    modals.innerHTML = `
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 class="text-xl font-bold mb-3 cursor-pointer">Mango Tree</h3>
                      
                      <p>id=${treeId}</p>

                      <img src="https://i.ibb.co.com/cSQdg7tf/mango-min.jpg" class="h-[300px] w-full object-cover rounded-lg">

                      <p class="py-1 cursor-pointer"><span class="font-bold">Category:</span> tree</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Price:</span> 5000</p>
                      <p class="py-1 cursor-pointer"><span class="font-bold">Description:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odio mollitia nisi repellat, enim impedit consequatur molestias veritatis quod corporis, ipsum quia ea? Sint, libero? Quis quidem totam repellat debitis.</p>
                    </div>
                    
                    `
                    modalContainer.appendChild( modals )
                    my_modal_3.showModal()
                  }
                }
              )
            })
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
                <h2 class="card-title mt-3">${fruitTree.name}</h2>
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
                    class="btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

            } )
            // end
            // const cardTitle = document.querySelectorAll( '.card-title' )
            // const cardImg = document.querySelectorAll('.card-img')
            //   cardTitle.forEach( title => {
            //     title.addEventListener( 'click', () => {
            //       // modal events start here
            //       // my_modal_3.showModal()
            //       console.log(title, 'click')

            //     }
            //   )
            // })


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
                <h2 class="card-title mt-3">${fruitTree.name}</h2>
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
                    class="btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

          })
        })
      }
      // if Shade Tree ends


      // if category is Shade Tree
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
                <h2 class="card-title mt-3">${fruitTree.name}</h2>
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
                    class="btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

          })
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
                <h2 class="card-title mt-3">${fruitTree.name}</h2>
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
                    class="btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

          })
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
                <h2 class="card-title mt-3">${fruitTree.name}</h2>
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
                    class="btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

          })
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
                <h2 class="card-title mt-3">${fruitTree.name}</h2>
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
                    class="btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

          })
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
                <h2 class="card-title mt-3">${fruitTree.name}</h2>
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
                    class="btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

          })
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
                <h2 class="card-title mt-3">${fruitTree.name}</h2>
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
                    class="btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

          })
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
                <h2 class="card-title mt-3">${fruitTree.name}</h2>
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
                    class="btn btn-primary w-full bg-[#15803d] border-none shadow-none rounded-3xl"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
              
              
              `
              cardContainer.appendChild(tree)

          })
        })
      }
      // if Aquatic Plant ends



      
      treesClasses.forEach( el => {
        el.classList.remove('active')
      } )
      categoryName.classList.add('active')
    })
  })
}
getAllCategories()
