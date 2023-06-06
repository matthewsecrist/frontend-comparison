import type { ActionArgs} from "@remix-run/node";
import { redirect} from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";

export async function action ({ params, request }: ActionArgs) {
  switch (request.method) {
    case 'DELETE':
      try {
        await db.post.delete({
          where: {
            id: params.id
          }
        })
        return redirect('/posts')
      } catch (err) {
        return json({ message: 'Not found' }, 404)
      }

    default:
      return json({ message: "Method not allowed" }, 405);
  }
}
