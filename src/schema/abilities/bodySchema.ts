import { t } from "elysia";

const bodySchema = t.Object({
  name: t.String(),
  description: t.String(),
  duration: t.Number(),
  cooldown: t.Number(),
  characterId: t.Number(),
});

export default bodySchema;
