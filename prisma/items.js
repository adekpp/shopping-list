import { prisma } from "@/prisma/client"
const addItem = async (data) => {
  try {
    const list = await prisma.list.update({
      where: {
        id: data.id,
      },
      data: {
        items: {
          create: [{ name: data.name }],
        },
      },
      include: {
        items: true,
      },
    });
    return list;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteItem = async (data) => {
  try {
    const deletedItem = await prisma.item.delete({
      where: { id: data.id },
    });
    return deletedItem;
  } catch (error) {
    console.log(error.message);
  }
};

const updateItem = async (data) => {
  try {
    const updateItem = await prisma.item.update({
      where: {
        id: data.id,
      },
      data: {
        name: data?.name,
        isDone: data?.isDone,
      },
    });
    return updateItem;
  } catch (error) {
    console.log(error.message);
  }
};

export { addItem, deleteItem, updateItem };
