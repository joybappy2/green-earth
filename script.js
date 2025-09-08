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
                  class="hover:bg-[#15803d] hover:text-white rounded-lg text-lg/4"
                >
                  <a>${category}</a>
                </li>
        `
        allCategoriesContainer.appendChild(treeCategory)
    });
}

getAllCategories()