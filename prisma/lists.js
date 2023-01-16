import { prisma } from "@/prisma/client";

const getLists = async (data) => {
  try {
    const lists = await prisma.list.findMany({
      where: {
        author: data.email,
        id: data?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true,
      },
      include: {
        items: {
          orderBy: {
            isDone: "asc",
          },
        },
      },
    });
    return { lists };
  } catch (error) {
    console.log(error.message);
  }
};

const createList = async (data) => {
  try {
    const list = await prisma.list.create({
      data: {
        title: data.title,
        author: data.email,
      },
    });
    return { list };
  } catch (error) {
    console.log(error.message);
  }
};

const deleteList = async (id) => {
  try {
    const deletedList = await prisma.list.delete({
      where: { id: id },
    });
    return deletedList;
  } catch (error) {
    console.log(error.message);
  }
};

const updateList = async (data) => {
  try {
    const updateList = await prisma.list.update({
      where: {
        id: data.id,
      },
      data: {
        title: data?.title,
      },
    });
    return { list: updateList };
  } catch (error) {
    console.log(error.message);
  }
};


export { getLists, createList, deleteList, updateList };
