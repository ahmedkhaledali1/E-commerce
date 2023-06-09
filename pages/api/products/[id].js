import Product from '@/models/Product';
import db from '@/store/db';

const handler = async (req, res) => {
  db.connect();
  const product = await Product.findById(req.query.id);
  db.disconnect();
  res.send(product);
};

export default handler;
