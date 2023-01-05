import {
  getLists,
  getSingleList,
  createList,
  deleteList,
  updateList,
} from "@/prisma/lists";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = req.query;
    try {
      const lists = await getLists(data);
      return res.status(200).json(lists);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { list, error } = await createList(data);
      if (error) throw new Error(error);
      return res.status(200).json( list );
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const data = req.query;
      const { list, error } = await deleteList(data);
      if (error) throw new Error(error);
      return res.status(200).json({ list });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const data = req.body;
      const { list, error } = await updateList(data);
      if (error) throw new Error(error);
      return res.status(200).json(list);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE", "PATCH"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
