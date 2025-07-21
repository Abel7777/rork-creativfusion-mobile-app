import { createTRPCRouter } from "./create-context";
import loginRoute from "./routes/auth/login/route";
import signupRoute from "./routes/auth/signup/route";
import logoutRoute from "./routes/auth/logout/route";
import productsListRoute from "./routes/products/list/route";
import productDetailRoute from "./routes/products/detail/route";
import vaultItemsRoute from "./routes/vault/items/route";
import vaultCategoriesRoute from "./routes/vault/categories/route";

export const appRouter = createTRPCRouter({
  auth: createTRPCRouter({
    login: loginRoute,
    signup: signupRoute,
    logout: logoutRoute,
  }),
  products: createTRPCRouter({
    list: productsListRoute,
    detail: productDetailRoute,
  }),
  vault: createTRPCRouter({
    items: vaultItemsRoute,
    categories: vaultCategoriesRoute,
  }),
});

export type AppRouter = typeof appRouter;