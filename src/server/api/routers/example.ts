import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input, ctx }) => {
      const id = ctx.session?.user.id;
      console.log(id, "olha o id");
      return {
        greeting: `Hello ${input.text} user ${id}`,
      };
    }),
  addList: publicProcedure
    .input(
      z.object({
        description: z.string(),
        title: z.string(),
        youtube_id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { description, title, youtube_id } = input;
      const userId = ctx.session?.user.id as string;
      const result = ctx.prisma.lists.create({
        data: {
          lst_description: description,
          lst_title: title,
          lst_usr_id: userId,
          lst_youtube_id: youtube_id,
        },
      });
      return result;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
