db.createUser({
  user: 'root',
  pwd: 'root',
  roles: [
    {
      role: 'dbOwner',
      db: 'hello',
    },
  ],
});