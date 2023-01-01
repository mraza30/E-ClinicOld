import cors, { CorsOptions } from "cors";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import Express from "express";
import { GraphQLSchema } from "graphql";
import http from "http";

const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000", "https://studio.apollographql.com"],
  credentials: true,
  exposedHeaders: "X-AUTH-TOKEN",
};

export async function StartServer(schema: GraphQLSchema, port: number = 3000) {
  const app = Express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  await server.start();

  app.use(cors(corsOptions));

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(
    `🚀 Server ready at http://localhost:${port + server.graphqlPath}`
  );
}
