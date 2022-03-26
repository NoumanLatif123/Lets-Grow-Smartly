/*export const filterFoods=(searchkey , category)=>async dispatch=>{

    var filteredFoods ;

    dispatch({type: 'GET_FOODS_REQUEST'})
    
    try {
        const response = await axios.get('/api/foods/getallfoods')
        filteredFoods = response.data.filter(pizza=>pizza.name.toLowerCase().includes(searchkey.toLowerCase()))
        
        if(category !== 'all')
        {
        filteredFoods = response.data.filter(pizza=>pizza.category.toLowerCase()===category)
        }

        dispatch({type: 'GET_FOODS_SUCCESS' , payload : filteredFoods})
    } catch (error) {
        dispatch({type: 'GET_FOODS_FAILED' , payload : error})
    }

}

*/