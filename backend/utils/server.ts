import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import Express from "express";
import { GraphQLSchema } from "graphql";
import cors from "cors";
import http from "http";

export async function StartServer(schema: GraphQLSchema, port: number = 3000) {
  const app = Express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  app.use(cors);

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(
    `🚀 Server ready at http://localhost:${port + server.graphqlPath}`
  );
}
