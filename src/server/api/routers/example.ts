import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input, ctx }) => {
      const id = ctx.session?.user.id ?? ''
      console.log(id, "olha o id");
      return {
        greeting: `Hello ${input.text} user ${id}`,
      };
    }),
  getLists: publicProcedure
    .query(({ ctx }) => {
      const userId = ctx.session?.user.id as string;
      const result = ctx.prisma.lists.findMany({
        where: {
          lst_usr_id: userId
        }
      })
      return result;
    }),
  getVideosWithListId: publicProcedure
    .input(
      z.string()
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.videos.findMany({
        where: {
          vid_lst_id: input
        }
      })
      return result;
    }),
  addVideoWithListId: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        youtubeId: z.string(),
        listId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, description, youtubeId, listId } = input;
      const result = await ctx.prisma.videos.create({
        data: {
          vid_title: title,
          vid_description: description,
          vid_youtube_id: youtubeId,
          vid_lst_id: listId
        }
      })
      return result;
    }),
  addList: publicProcedure
    .input(
      z.object({
        description: z.string(),
        title: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { description, title } = input;
      const userId = ctx.session?.user.id as string;
      const result = await ctx.prisma.lists.create({
        data: {
          lst_description: description,
          lst_title: title,
          lst_usr_id: userId,
          lst_youtube_id: '',
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
