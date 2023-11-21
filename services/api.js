import db from '../public/db.json'; // Assuming db.json is in the root or appropriate path

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(db.users);
      break;

    case 'PUT':
      const { id, updates } = req.body;
      const userIndex = db.users.findIndex(user => user.id === id);

      if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
      } else {
        db.users[userIndex] = { ...db.users[userIndex], ...updates };
        res.status(200).json(db.users[userIndex]);
      }
      break;

    case 'DELETE':
      const userId = req.query.id;
      const userToDeleteIndex = db.users.findIndex(user => user.id === parseInt(userId));

      if (userToDeleteIndex === -1) {
        res.status(404).json({ message: 'User not found' });
      } else {
        const deletedUser = db.users[userToDeleteIndex];
        db.users.splice(userToDeleteIndex, 1);
        res.status(200).json(deletedUser);
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
