import { addItem, deleteItem, updateItem } from "@/prisma/items";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "POST") {
      const data = req.body;
      try {
        if (data.email !== session.user.email) throw new Error("Unauthorized");
        const { list, error } = await addItem(data);
        if (error) throw new Error(error);
        return res.status(200).json({ list });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    if (req.method === "DELETE") {
      const data = req.query;
      try {
        if (data.email !== session.user.email) throw new Error("Unauthorized");
        const { list, error } = await deleteItem(data);
        if (error) throw new Error(error);
        return res.status(200).json({ list });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    if (req.method === "PATCH") {
      const data = req.body;
      try {
        if (data.email !== session.user.email) throw new Error("Unauthorized");
        const { list, error } = await updateItem(data);
        if (error) throw new Error(error);
        return res.status(200).json({ list });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    res.setHeader("Allow", ["GET", "POST", "DELETE", "PATCH"]);
    res.status(425).end(`Method ${req.method} is not allowed.`);
  }
};

export default handler;
