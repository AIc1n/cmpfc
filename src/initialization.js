async function fetchData()
{
    try
    {
        const response = await fetch('json/test1.json');
        const data = await response.json();
    
    	const idToFind = 2;
        const result = getDataById(data, idToFind);
    
        console.log(result);
    }
    
    catch (error)
    {
        console.error('Ошибка при загрузке данных:', error);
    }
}

function getDataById(data, id)
{
    return data.find(item => item.nameId === nameId);
	console.log(data.find)
}
        
fetchData();