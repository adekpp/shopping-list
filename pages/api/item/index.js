import { addItem, deleteItem, updateItem } from "@/prisma/items";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { list, error } = await addItem(data);
      if (error) throw new Error(error);
      return res.status(200).json({ list });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const data = req.query;
      const { list, error } = await deleteItem(data);
      if (error) throw new Error(error);
      return res.status(200).json({ list });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const data = req.body;
      const { list, error } = await updateItem(data);
      if (error) throw new Error(error);
      return res.status(200).json({ list });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE", "PATCH"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
