const url_api = 'http://127.0.0.1:3000/api/customer';

export const getCustomers = async () => {
    try {
        const data = await fetch(url_api);
        const result = await data.json();
        console.log(result)
        return result
    }
    catch (error){
        console.log(error)
    }
};

export const findCustomer = async (id) => {
  try {
      const data = await fetch(`${url_api}/${id}`);
      const result = await data.json();
      return result
  }
  catch (error){
      console.log(error)
  }
};

export const addCustomer = async({firstname, lastname, email, phone, address}) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address,
        email,
        firstname,
        lastname,
        phone
      })
    };
    const data = await fetch(url_api, requestOptions)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateCustomer = async({firstname, lastname, email, phone, address, id}) => {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address,
        email,
        firstname,
        lastname,
        phone,
        id
      })
    };
    const data = await fetch(url_api, requestOptions)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteCustomer = async(id) => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const data = await fetch(`${url_api}/${id}`, requestOptions)
    return data
  } catch (error) {
    console.log(error)
  }

}