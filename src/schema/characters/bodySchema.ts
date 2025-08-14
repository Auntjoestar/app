import { t } from "elysia";

const bodySchema = t.Object({
  name: t.String(),
  alias: t.String(),
  category: t.String(),
  weapon: t.String(),
});

export default bodySchema;
