import { t } from "elysia";

const paramsSchema = t.Object({
  id: t.Number(),
});

export default paramsSchema;
