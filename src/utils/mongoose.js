import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function connectDB() {
  if (conn.isConnected) return;

  const db = await connect(
    `mongodb+srv://alditomiralles3:alditomongoDB008@aldo.l3up4qv.mongodb.net/tasks?retryWrites=true&w=majority`
  );
  console.log(db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log("Mongoose is connected");
});

connection.on("error", (err) => {
  console.log("Mongoose connected error", err);
});
