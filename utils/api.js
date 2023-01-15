const getLists = async (data) => {
  try {
    const res = await fetch(`/api/lists?email=${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const getList = async (data) => {
  try {
    const res = await fetch(`/api/lists?id=${data.id}&email=${data.email}`);
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const deleteList = async (data) => {
  try {
    const res = await fetch(`/api/lists?id=${data.id}&email=${data.email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const updateList = async (data) => {
  try {
    const res = await fetch("/api/lists", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const list = await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const createList = async (data) => {
  try {
    const res = await fetch("/api/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: data.title, email: data.author }),
    });
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const addItem = async (data) => {
  try {
    const res = await fetch("/api/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const deleteItem = async (data) => {
  try {
    const res = await fetch(`/api/item?id=${data.id}&email=${data.email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const updateItem = async (data) => {
  try {
    const res = await fetch("/api/item", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  getLists,
  getList,
  deleteList,
  updateList,
  addItem,
  createList,
  deleteItem,
  updateItem,
};
