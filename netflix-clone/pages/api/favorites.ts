import { NextApiRequest, NextApiResponse } from "next";
// import { without } from "lodash";
import prismadb from '@/libs/Prismadb';
import serverAuth from "@/libs/ServerAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'GET') {
        return res.status(405).end();
      }
  
      const { currentUser } = await serverAuth(req, res);
  
      const favoritedMovies = await prismadb.movie.findMany({
        where: {
          id: {
            in: currentUser?.favoriteIds,
          }
        }
      });
      return res.status(200).json(favoritedMovies);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }